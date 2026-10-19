# Backend 非 Commands 写入口审计

> 状态：planned（A0 清单待实施，2026-10-19）
>
> 范围：审计 `Commands/` 之外的 job/worker、maintenance、workflow、public facade 和现有 transaction
> owner，识别其中与业务 Command 等价的顶层写入口。本文不把候选项视为违规，也不把审计清单视为迁移完成。

相关合同：

- [CMS Command Pipeline Contract](../architecture/cms-write-boundary-contract.md)：三种 pipeline、internal
  entry、transaction owner 与 Backend 第一阶段边界；
- [CMS Command、Gate、Lifecycle 与 Persistence 边界](./cms-command-gate-lifecycle-persist-boundary.md)：
  已完成的 CMS concrete Command 和 Accounts/Messaging 21 个显式 Command 迁移历史；
- [Backend Direct Repo Boundary](./backend-direct-repo-boundary.md)：direct Repo finding 的既有分类，不等同于
  本文的顶层业务写入口清单。

## 1. 背景与边界

Backend 第一阶段已经把 Accounts 16 个、Messaging 5 个显式 `Commands/` 模块迁入通用
`GroupherServer.CommandPipeline`。这 21 个 Command 的完成不证明下列入口已经被覆盖：

```text
scheduler / Oban / operator / internal caller
  -> job / maintenance / workflow / facade
  -> domain state / projection / cleanup / external effect
```

当前 CMS contracts、coverage 和 graph 仍是 CMS concrete Command 范围，也不能作为全 Backend 写入口
inventory。本文建立独立审计批次，不回填或扩大“21 个 Command 已完成”的含义。

本轮只审计顶层执行协议和 owner，不把以下模块机械包装为 pipeline：

- leaf Persist、row primitive、query、codec 和纯 helper；
- Activity recorder、Outbox producer 及其 delivery worker；
- 只重建 projection/cache/search index 的 worker；
- 有明确 owner、幂等边界和有界批处理语义的 retention/cleanup；
- framework callback 或 Oban enqueue infrastructure。

出现 `Repo`、`Ecto.Multi` 或 Persist 调用只是发现候选的信号，不是违规结论。

## 2. 审计问题

每个候选入口必须回答以下问题，不能只按目录名或函数名分类：

| 字段                                    | 必须记录的事实                                                            |
| --------------------------------------- | ------------------------------------------------------------------------- |
| public/internal root                    | 调用者是用户、scheduler、Oban、operator、migration 还是其他领域流程       |
| business action                         | 是否推进 canonical domain state，还是仅投影、投递、清理或修复             |
| stable identity                         | command ID、operation ref、job ref、resource ref 或天然幂等键分别是什么   |
| retry/recovery                          | 重试是否需要恢复首次结果；部分成功后如何继续                              |
| authorization                           | 是否需要 actor/Gate；internal maintenance 为什么可以没有用户授权          |
| canonical load/lock                     | 资源在哪里加载，是否加 row/advisory lock，重试是否复用同一资源            |
| transaction owner                       | 谁开启主事务；是否跨 Context；Persist 是否错误地拥有嵌套事务              |
| post-commit effect                      | Oban、Outbox、通知、对象存储和 cache invalidation 在何时发生              |
| failure compensation                    | 重试耗尽、外部 effect 失败或部分删除后的状态如何记录和恢复                |
| target protocol                         | 保留 maintenance/workflow，或使用 `receipt_pipeline`、`direct_pipeline`、 |
| `workflow_pipeline`；不允许预设必须迁移 |
| evidence                                | 调用图、行为测试、静态门禁和仍未解决的问题                                |

## 3. 初步候选清单

本节是 A0 的起始清单，不是完整 inventory。实际数量只能由后续 repository-wide 扫描和逐项分类确定。

### 3.1 P0：internal maintenance 复用 user Command

| 入口                                 | 当前路径                                         | 初步问题                                             | A0/A1 要证明的结论                                                           |
| ------------------------------------ | ------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| `CMS.Articles.Maintenance.archive/1` | `Maintenance -> Commands.Archive.execute/1`      | internal maintenance 与 user Command 共用入口        | 是否需要独立 internal entry，并只共享更下层 Support/Persist                  |
| `CMS.Articles.Maintenance.trash/2`   | `Maintenance -> Commands.Trash.execute_direct/3` | 通过固定 operations actor 进入 user-oriented Command | Gate、Lifecycle、rejection 和 operation identity 是否与 maintenance 语义一致 |

目标合同是 external/user root 与 internal job/maintenance root 分离。禁止用 nil `command_id`、特殊 actor、
`{:workflow, ref}` 或运行时 flag 在同一入口切换执行协议。

### 3.2 P1：推进领域状态的后台入口

| 入口                                         | 当前职责                                                            | 初步分类                     | 迁移前必须证明                                                          |
| -------------------------------------------- | ------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| `Jobs.CreateCommunity`                       | approved Application 创建 Community；重试耗尽后标记 creation failed | durable domain workflow 候选 | `operation_ref`、Application lock、创建原子性、失败补偿和 setup handoff |
| `Jobs.CommunitySetup`                        | 执行 Community 初始化；重试耗尽后标记 setup failed                  | durable domain workflow 候选 | setup 的幂等步骤、部分成功恢复、失败状态与 enqueue 边界                 |
| `Jobs.ExpireCommunityApplications`           | 批量过期超时 Application                                            | maintenance lifecycle 候选   | 批量锁、并发 review、每项失败语义和事务粒度                             |
| `Jobs.ExpireCommunityApplicationLogoUploads` | 过期未绑定 upload 并清理对象                                        | maintenance workflow 候选    | DB 状态与对象删除的顺序、重试和 partial success                         |
| `Jobs.ReleaseExpiredCommunitySlugClaims`     | 释放 terminal Application 的过期 slug claim                         | maintenance lifecycle 候选   | terminal 条件、并发 claim、批量返回协议和可重试性                       |
| `Jobs.WallpaperLifecycle`                    | reconcile Receipt、revision 与孤儿 generated asset                  | reconciliation workflow      | domain receipt 与 operation identity、外部删除、分批边界和恢复语义      |

这组入口最可能需要正式执行合同，但不预设必须新增 Command 模块，也不预设需要第四种顶层 pipeline。
如果现有命名 maintenance workflow 已经完整拥有 identity、事务和恢复语义，应保留其协议并补足证据。

### 3.3 P2：明确的 maintenance transaction owner

| 入口                                             | 当前写入方式                            | 初步判断                           | 审计重点                                                           |
| ------------------------------------------------ | --------------------------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| `Analysis.Maintenance.Workflow.delete_expired/0` | 有界批处理；每批独立 transaction        | 合法 maintenance owner 候选        | cutoff 稳定性、批间失败、最大批次数和 telemetry                    |
| `CMS.Assets.Maintenance.Backfill.run/2`          | 自有 transaction，完整性不足时 rollback | maintenance transaction owner 候选 | 是否跨 Context、Completeness lock、重复 backfill 和 rollback error |
| `CMS.Assets.Maintenance.Completeness`            | 直接 insert/update 完整性状态           | maintenance state owner 候选       | 并发 upsert/lock、状态转换与调用者边界                             |
| `CMS.Assets.Maintenance.ApplicationUploads`      | 直接调用 `Assets.Persist.register`      | adapter 或绕过候选                 | 是否只是受限 import adapter，还是缺少正式顶层 entry                |
| `Jobs.CommandReceiptRetention`                   | 分批删除过期 Receipt                    | infrastructure retention 候选      | 与 active claim/finalize 的并发、批大小和截止时间                  |
| view/profile-view dedupe cleanup                 | 清理过期去重状态                        | infrastructure cleanup 候选        | cleanup owner、并发 tracker 写入和失败是否可安全重试               |

### 3.4 预计保留的 delivery/projection 入口

以下入口仍需进入完整清单，但正常结论应优先是“保留 typed job + Context owner”，而非 pipeline 迁移：

- CMS article/comment/community/asset/interaction/press Outbox delivery；
- `Jobs.PublicCachePurge`、`Jobs.SearchIndex`、`Jobs.SnapshotRefresh`；
- `Jobs.Comments` 的后台 effect/projection repair；
- `Jobs.AccountEvent`、`Jobs.ContributionCache`；
- Article Insights aggregation/retention；
- enqueue facade `GroupherServer.Jobs.Workflow`。

保留也必须有证据：payload 是闭合集合且可版本化，worker 不通过动态 MFA 执行业务代码，delivery state 有明确
owner，并且 projection/effect 不反向成为 canonical domain authority。

## 4. 批次

### A0：report-only inventory

1. 枚举所有 Oban worker、maintenance/workflow、public facade 和 transaction owner；
2. 从真实调用图识别顶层 root、共享 helper 和最终写入终点；
3. 按第 2 节字段生成逐项清单；
4. 标注 `business-command`、`domain-workflow`、`maintenance`、`delivery/projection`、`leaf` 或
   `unresolved`；
5. 记录现有测试与静态门禁覆盖，但不启用新的 strict gate。

A0 完成标准：没有未分类 root；每个 `unresolved` 都有具体缺失证据和下一步。候选数量、分类数量和文件路径以
清单产物为准，不能从本文初步表格推导。

### A1：拆分 external 与 internal entry

优先解决 `Articles.Maintenance -> user Command`，再处理扫描发现的其他 Job/maintenance 到 user Command 路径。
拆分时共享 Support/Persist，不保留旧/新 runtime 双路兼容层，不用 flag 在同一入口切换协议。

### A2：后台领域 workflow

逐项处理 Community Application、Community setup、slug claim 与 Wallpaper lifecycle。只有完成 identity、事务、
锁、重试/recovery 和 compensation 证明后，才选择现有 maintenance workflow 或三种 pipeline 之一。

### A3：maintenance owners

审计 Analysis retention、Assets backfill/completeness/application upload、Receipt/dedupe cleanup。优先修正 owner、
事务和返回协议；仅当入口确实是业务 Command 时才迁移 pipeline。

### A4：Backend 级 inventory/gate

在 A0–A3 分类稳定后，再决定是否生成 Backend contracts/coverage/graph。任何新增检查先 report-only；只有清单
完整、误报规则和例外字段稳定、现存 finding 清零后才能进入 strict/CI。CMS 三份现有产物继续保持 CMS scope。

## 5. 静态门禁与行为测试责任

现有门禁已经覆盖部分结构事实：

- `check-cms-context-module-boundary` 检查 CMS transaction owner、Job 调 user Command、Workflow user action 等；
- `check-backend-context-v2` 检查 typed Job、worker 归属、动态 callback、Outbox owner 和 transaction error；
- CMS pipeline contracts/coverage/graph 证明 CMS concrete Command，不证明完整 Backend inventory。

这些检查不能根据函数名判断业务语义，也不能证明幂等性、锁、外部 effect 或部分失败恢复。每个实际迁移项至少
需要对应行为测试覆盖：

- 相同 identity 重试和并发执行；
- 主事务 rollback 与 post-commit effect；
- Oban attempt exhaustion 和 compensation；
- batch 中途失败与下一次续跑；
- 外部对象/消息 delivery 的 partial success；
- internal entry 不可从 resolver/user facade 到达。

## 6. 完成定义

本文只有在以下条件全部满足后才能改为 `implemented`：

1. A0 inventory 覆盖完整 Backend root，并提交可审查的分类产物；
2. 每个 business-command/domain-workflow 候选已有明确目标协议；
3. external 与 internal entry 混用已清零；
4. 迁移项没有遗留兼容分支或重复 runtime authority；
5. maintenance/delivery/leaf 的保留结论均有调用图和行为测试证据；
6. `mix compile --warnings-as-errors`、相关 ExUnit、现有三项 CMS pipeline freshness check 与
   `pnpm docs:check` 通过；
7. 文档分别报告“已审计”“已迁移”“明确保留”和“仍 unresolved”的数量，不用一个总数代替状态。

## 7. 当前状态

截至 2026-10-19：

- Accounts/Messaging 21 个显式 Command 迁移已完成，不属于本文待办；
- 本文只完成审计合同和初步候选梳理；
- A0 repository-wide inventory 尚未实施；
- 尚未决定任何新入口的 pipeline 类型；
- 尚未新增 Backend 级 contracts/coverage/graph 或 strict gate；
- 尚未修改任何 runtime 代码。
