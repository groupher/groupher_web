# Profile ViewTracker

> 状态：historical implementation record。当前运行时合同见
> [Profile View 计数写链路](../feature/view-tracker/profile-view-counting.md)；产品页面 consumer 仍待接入。
>
> 范围：定义 Profile view 的最终触发、actor identity、计数幂等、事务、保留与清理合同，并替换
> `Accounts.Profiles.Effects.record_visit` / `Jobs.ProfileVisit` 过渡链路。实现已完成硬切换，不保留旧
> facade、Job、builder 或计数 primitive。

参照实现：[`CMS.ViewTracker`](../feature/interaction/v4.md#43-article-viewtracker)。Profile ViewTracker
复用同一类合同，但由 Accounts 独立拥有，不直接调用 CMS 内部模块。

这里的 `implemented` 只覆盖后端 tracking contract、migration、GraphQL mutation、cleanup job 与前端
`trackProfileView` adapter。当前仓库没有活跃 Profile 产品页面，因此还没有页面级 consumer；在页面接入
并验证“成功可见后触发、返回 views reconciliation”以前，不把这项能力描述为产品端到端完成。

## 1. 为什么单独迁移

Owner 命名迁移已经把 Profile 查询和访问统计拆开：`Accounts.Profiles.user/1,2` 是纯读，resolver
成功读取后再 best-effort enqueue `Jobs.ProfileVisit`。这解决了 Query 写库问题，但过渡链路仍没有
完整的 view 业务合同：

- resolver 为每次调用生成随机 `visit_id`，worker 却没有用它约束计数；Job retry 可能重复递增；
- Oban uniqueness 不能替代业务幂等，且无限 uniqueness 若没有对应 pruning 会让完成记录无界增长；
- enqueue 失败被忽略，当前文档却容易让人误读为 durable delivery；
- GraphQL 测试没有固定“成功显示后触发一次跟踪”的协议；
- server-side Profile 查询本身无法判断页面是否真的对用户可见。

因此不继续给旧 Job 叠加局部补丁。最终设计从触发入口到清理策略一起迁移，并在完成后删除旧链路，
不保留兼容入口。

## 2. 目标合同

### 2.1 读取与跟踪分离

```text
Profile query
  -> Accounts.profiles_user/1,2
  -> pure Profile response

Profile visible in client
  -> trackProfileView mutation
  -> RequestActor classification
  -> Accounts.ProfileViewTracker.track(
       profile,
       viewer,
       classification,
       read_purpose: :public_read
     )
  -> one synchronous transaction
  -> {tracked, views}
```

Profile query 不 enqueue、不计数。客户端只在 Profile 已成功显示后调用显式 mutation；mutation 可安全
重试，并以服务端返回的 committed `views` reconciliation 本地缓存。服务端、预览、管理和内部探测读取
通过明确 `read_purpose` fail closed，不借普通 Profile query 隐式产生 view。`read_purpose` 由 resolver
作为 `track/4` 的 keyword opts 传入；缺失或不在固定 vocabulary 中时返回 `ErrorCat` 稳定错误，且不进入
transaction 或写库。

实际递增成功后，`ProfileViewTracker.Record` 在事务提交后调用
`Accounts.Profiles.Effects.revalidate_user/1`，使公开 Profile 缓存观察到 committed `views`。窗口内
duplicate 和 policy-excluded 请求没有改变 counter，不重复失效缓存。revalidate 失败只记录 telemetry
和 error log，不回滚已经提交的 dedupe state 与计数，也不把成功的 tracking mutation 改成失败。

### 2.2 Identity 与 admission

Request boundary 只分类一次 actor。Profile ViewTracker 从可信身份生成 HMAC tracking key，不保存原始
account、anonymous session、service credential 或 delegation identifier：

```text
RequestActor.Classification + trusted identity handle
  -> stable viewer_tracking_key
  -> ProfileViewTracker.Policy
```

V1 默认只允许 public read 中 verified/probable human 与 verified agent 进入计数；crawler、unknown、
preview、moderation、operations 和 probe 流量不计数。是否计算本人访问必须在实施前作为产品决策冻结，
不能由 resolver 偶然行为决定。

Accounts 可以复用抽取到 RequestActor 边界的通用 identity primitive，但不得依赖
`CMS.ViewTracker.Identity`、CMS schema 或 CMS facade。Profile target 的 policy、表、事务和清理仍由
Accounts 拥有。

### 2.3 原子计数与滑动窗口

`tracked` 描述 admission，`counted` 描述本次调用是否实际递增：policy-excluded 是
`tracked: false`；第一次进入窗口是 `tracked: true, counted: true`；窗口内 duplicate 是
`tracked: true, counted: false`。

新增 Accounts-owned dedupe state，以 `(profile_id, viewer_tracking_key)` 唯一：

```text
policy-allowed mutation
  -> conditional UPSERT profile_view_dedupe_states
  -> counted: User.views + 1
  -> duplicate in window: keep current User.views
```

conditional UPSERT、`User.views` 更新和结果读取必须位于同一数据库事务。并发请求与客户端 retry 对同一
identity/window 最多计数一次；窗口到期后下一次可重新计数。业务幂等由 dedupe state 决定，不使用随机
request UUID 或 Oban uniqueness 代替。`ProfileViewTracker.ViewCounter` 直接拥有 conditional UPSERT 与
原子 `User.views` 递增，不复用旧 `Profiles.Persist.increment_views/1`；旧 primitive 随 ProfileVisit
链路删除，避免存在绕过 dedupe 的第二计数入口。

返回协议固定为：

```text
{:ok, %{tracked: boolean(), views: non_neg_integer()}}
```

GraphQL V1 不暴露内部 `counted` outcome：`tracked: true` 表示请求通过 policy，它可能是窗口内
duplicate；`views` 始终是 committed counter。若产品需要让客户端区分 counted/duplicate，必须在 schema
中显式增加字段，而不是改变 `tracked` 含义。

### 2.4 保留与清理

dedupe state 保存 `last_counted_at` 与 `expires_at`。`last_counted_at` 决定业务窗口；`expires_at` 只用于
窗口加 safety margin 后的物理清理。定时 cleanup job 必须：

- 按最早过期记录分批删除；
- 同时受 row budget 和 time budget 限制；
- 删除时重新检查 `expires_at`，避免删除并发推进后的状态；
- 上报 deleted rows、batch count、duration、remaining rows 与 budget exhausted；
- 配置明确的 Oban cron 与完成记录 pruning，不允许无限保留 Job row。

## 3. 目标目录与边界

```text
accounts/profile_view_tracker.ex
accounts/profile_view_tracker/
  config.ex
  error_cat.ex
  identity.ex
  policy.ex
  record.ex
  view_counter.ex
  dedupe_cleanup.ex
  model/profile_view_dedupe_state.ex

jobs/profile_view_dedupe_cleanup.ex
groupher_server_web/resolvers/accounts/profile_view_tracker.ex
```

根 Facade 只暴露产品调用与运行入口，例如：

```text
Accounts.profile_view_tracker_track(
  profile,
  viewer,
  classification,
  read_purpose: :public_read
)
Accounts.profile_view_tracker_cleanup_expired()
```

不得从 Accounts 根 Facade 暴露 Identity、Policy、Config 或底层 model。

`ProfileViewTracker.ErrorCat` 拥有缺失/非法 `read_purpose`、非法 actor identity、目标不存在与计数读取失败
等稳定 domain error。policy 正常排除不是错误，返回 `tracked: false`；不得为此返回异常或 GraphQL error。

## 4. 已执行迁移顺序

1. 冻结 dedupe window、本人访问、verified agent 三项产品决策；
2. 建表并实现 identity、policy、conditional UPSERT、事务计数和 cleanup；
3. 增加 `trackProfileView` GraphQL mutation 及 `{tracked, views}` schema；
4. 增加 frontend `trackProfileView` helper，并使用返回值 reconciliation；当前仓库没有活跃 Profile 页面
   consumer，未来页面接入时必须在成功可见后调用该 helper，不得恢复 query-side tracking；
5. 覆盖 authenticated、anonymous、agent、excluded traffic、retry、并发与窗口到期测试；
6. 启用有界 cleanup cron 与 Oban pruning，验证 telemetry；
7. 删除 resolver 中的过渡 enqueue 与随机 `visit_id`，并硬删除以下旧链路：
   - `Accounts.profiles_record_visit/2`、`Accounts.Profiles.record_visit/2`、
     `Accounts.Profiles.Effects.record_visit/2`；
   - `Accounts.profiles_deliver_visit/1`、`Accounts.Profiles.deliver_visit/1`、
     `Accounts.Profiles.Effects.deliver_visit/1`；
   - `Jobs.profile_visit/2`、`Jobs.Workflow.profile_visit/2` 与 `Jobs.ProfileVisit`；
   - `Accounts.Profiles.Persist.increment_views/1`；
8. 全仓扫描旧调用并硬切换，不保留 compatibility shim。

### 4.1 当前测试覆盖

- 已覆盖 authenticated、anonymous、verified service agent、delegated agent、owner view、excluded
  traffic、transport retry、同 identity 并发、窗口到期、缺失/非法 `read_purpose`、目标已删除、GraphQL
  结构化错误、cleanup 过期删除与 row budget 恢复；
- 前端 adapter 已覆盖 committed counter reconciliation、一次 transport retry、确定性错误不重试和 SSR
  no-op；
- revalidation failure-after-commit、cleanup 在选取后并发续期，以及 cleanup time budget 仍需独立的确定性
  故障注入/同步测试 seam，不能用依赖机器速度的测试冒充覆盖；
- 真实 Profile 页面 consumer 尚未接入，页面级“可见后只触发一次”测试随产品页面一起补充。

## 5. 完成标准

- Profile query 在所有路径均为纯读，且不负责 view delivery；
- 页面可见后只有一个显式 `trackProfileView` 入口；
- retry 与并发在同一 identity/window 内最多递增一次；
- policy-excluded traffic 不写 counter、dedupe state 或 analytics event；
- 计数、dedupe state 和返回值来自同一事务；
- counted commit 后由 Profile ViewTracker 执行 post-commit Profile cache revalidation；duplicate 与
  policy-excluded 不重复失效缓存；
- cleanup 有 row/time budget、并发保护、telemetry 和定时调度；
- GraphQL 测试验证 mutation 写入、重复调用、失败回滚与返回 reconciliation；
- `ProfileVisit` Job、`visit_id`、record/deliver facade、Job/Workflow builder、旧 `Persist.increment_views`
  和相关测试全部删除；
- 不存在 Accounts 到 CMS ViewTracker 内部模块的依赖。

## 6. 已冻结实施参数

1. human 与 verified agent 的 dedupe window 均为 600 秒；
2. Profile owner 查看本人页面计入 views，并受相同 identity/window 去重；
3. verified agent 进入公开 views；crawler、unknown 和 self-reported automation 不进入；
4. cleanup safety margin 为 86,400 秒，batch size 为 500，单次 row budget 为 50,000，time budget
   为 25,000ms；
5. V1 不写 Accounts-owned analytics event；若未来增加，必须与计数同事务并另行定义 retention；
6. Oban 完成记录统一由 `Oban.Pruner` 保留 7 天，Profile dedupe cleanup 每小时第 5 分钟运行。
