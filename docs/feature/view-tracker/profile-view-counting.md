# Profile View 计数写链路

> 状态：current
>
> 后端 tracking contract、GraphQL mutation、cleanup job 和前端 adapter 已实现；当前仓库没有活跃的
> Profile 产品页面，页面 consumer 与真实浏览器验收仍待完成。

本文是 Profile `views` 的唯一当前运行时合同。迁移过程、旧 `ProfileVisit` Job 的问题和删改清单见
[Profile ViewTracker 迁移记录](../../migrations/profile-view-tracker.md)。

## 1. 入口

Profile 查询保持纯读，不能隐式计数。只有客户端确认 Profile 已成功展示后，才调用显式 mutation：

```text
Profile query
  -> Accounts.profiles_user
  -> pure Profile response

Profile visible in client
  -> trackProfileView(login)
  -> RequestActor classification
  -> Accounts.profile_view_tracker_track(..., read_purpose: :public_read)
  -> one database transaction
  -> {tracked, counted, views}
```

服务端渲染、preview、moderation、operations 和 probe 读取不能借普通 Profile query 产生 view。

## 2. Identity 与准入

ViewTracker 从 RequestActor 提供的可信身份生成 HMAC tracking key，不保存原始 account、anonymous
session、service credential 或 delegation identifier。

- public read 中 verified/probable human 和 verified agent 可以计数；
- crawler、unknown 和 self-reported automation 不计数；
- Profile owner 查看本人页面可以计数；
- 缺失或非法 `read_purpose` 必须返回稳定 ErrorCat，不能进入事务。

Accounts 拥有 Profile policy、dedupe 表、计数事务和 cleanup；它不能调用 CMS ViewTracker 内部模块。
共享请求分类以 [RequestActor](../../architecture/request-actor.md) 为准。

## 3. 原子性与幂等

`account.profile_view_dedupe_states` 以 `(profile_id, viewer_tracking_key)` 唯一。conditional UPSERT、
`User.views` 递增和结果读取位于同一个事务：

```text
first admitted view in window
  -> advance dedupe state
  -> User.views + 1
  -> counted: true

duplicate in window
  -> keep dedupe state and User.views
  -> counted: false
```

human 与 verified agent 的窗口均为 600 秒。业务幂等不能由随机 request UUID、Oban uniqueness 或客户端
单次调用状态代替。

计数提交后允许执行 Profile cache revalidation。revalidation 失败只能记录日志和 telemetry，不能回滚已经
提交的计数，也不能把成功 mutation 改成失败。

## 4. 清理

`last_counted_at` 决定业务窗口，`expires_at` 只决定物理清理。`Jobs.ProfileViewDedupeCleanup` 每小时第
5 分钟通过 Accounts 根 Facade 进入 cleanup：

- batch size 500；
- 单次 row budget 50,000；
- time budget 25 秒；
- safety margin 86,400 秒；
- 删除前重新检查 `expires_at`，避免删除并发续期记录；
- Oban 完成记录由 Pruner 保留 7 天。

## 5. 对外结果

GraphQL mutation 返回 committed `views`，供客户端直接 reconciliation。客户端 transport failure 可以安全
重试，因为服务端 dedupe 由稳定 actor identity 和时间窗口决定。

```text
tracked: false                 # policy excluded，没有写入
tracked: true, counted: true   # 本窗口首次计数
tracked: true, counted: false  # 本窗口重复调用
```

Resolver 只负责 transport 参数、RequestActor context 和 ErrorCat 格式化，不拥有计数、幂等或清理规则。

## 6. 验收边界

当前自动测试覆盖 authenticated、anonymous、service、delegation、verified agent、excluded traffic、非法
参数、目标删除、并发去重、窗口续期、cleanup budget 和 SSR 不隐式计数。

产品端到端完成还要求未来 Profile 页面做到：

1. 只在内容成功可见后调用一次 adapter；
2. transport retry 不造成重复计数；
3. 使用服务端返回的 committed `views` 更新页面；
4. SSR、预取和后台探测不触发 mutation。
