# CMS Command、Gate、Lifecycle 与 Persist 写入边界收口

> 状态：已实施（pipeline foundation 与 concrete Command 全量迁移，2026-10-18）
>
> 范围：冻结 CMS 写入链路中 public facade、领域 Command、`CMS.Command`、Gate、Lifecycle、
> Persist、Audit/Outbox 与 result builder 的职责；93 个 concrete Command 已全部迁移，并统一客户端业务
> 写入 identity 为 `commandId`。

相关合同：

- [CMS Command Pipeline Contract](../architecture/cms-write-boundary-contract.md)：
  `receipt_pipeline`、`direct_pipeline`、`workflow_pipeline` 的目标设计，以及编译合同、Elixir 全局检查、
  现有 repository gates、runtime 和行为测试的责任边界；
- [CMS Command](../architecture/cms-command.md)：Command Receipt、ambiguous commit 与长期执行边界；
- [CMS Command V3](../architecture/cms-command-v3.md)：Confirmation、事务与 result builder；
- [CMS Command 入口与命名修复](./cms-command-entry-and-naming-fix.md)：public facade 与
  `Commands.<BusinessAction>.execute` 命名；
- [CMS Command 客户端 Identity 边界修复](./cms-command-client-identity-fix.md)：客户端
  `commandId` 的创建、持有与 retry/recovery；
- [Gate V2](../feature/gate/v2.md)：读取 Scope 与 mutation admission；
- [Gate V4](../feature/gate/v4.md)：资源级 Access/Scope Context；
- [Gate V5](../feature/gate/v5.md)：当前 Gate 公开接口与 Scope 命名；
- [Community Lifecycle](../feature/lifecycle/contract.md)：actor-independent 状态与转换权威。

本文记录已经实施的边界和迁移历史。当前 API 只使用 `receipt_pipeline`、`direct_pipeline`、
`workflow_pipeline` 三个名称；历史分类已按这三个名称统一。通用 DSL 另定义非 CMS 专用的
`access: :open`：它表示没有 Gate/actor admission，不是用户授权旁路；CMS module 禁止使用它。

## 1. 问题

当前代码已经建立 `CMS.Command`、Gate 和多种 Lifecycle，但写入入口仍存在五类混用：

1. `Command` 同时被用来表示领域 use case 和 Receipt 执行机制；
2. 部分旧领域仍保留内部 Writer，容易被误当作 public 业务入口；
3. 事务所有权必须由 Command/Gate callback 统一，Persist 不得另开 transaction；
4. 资源级上传协议可能仍有历史字段名，但不能把它当作业务 Command identity；
5. 首批领域需要用静态门禁持续阻止边界回退。

典型现状：

```text
GraphQL Resolver
  -> CMS.Dashboard.update
  -> Dashboard.Commands.UpdateSection
       -> Gate + Persist + Outbox
```

该路径由具体 Command 接收 actor 并在 Gate callback 内完成写入；GraphQL middleware 只是 transport 层的
提前拒绝，不是领域授权权威。

本文不把所有写入机械接入 Receipt，而是先统一完整业务动作的入口，再只为需要 ambiguous-commit 恢复的
动作启用 `CMS.Command`。

## 2. 术语与职责

### 2.1 冻结调用链

```text
Transport adapter
  GraphQL / CLI / MCP / Agent / job
  -> 解析协议参数与认证上下文

CMS public facade
  CMS.Articles / CMS.Dashboard / CMS.Communities / CMS.DocCover
  -> transport-neutral 业务入口

Concrete use case
  Commands.<BusinessAction>.execute
  -> Gate / Lifecycle / version / Persist / Audit / Outbox 编排

Reliable execution boundary（按需）
  CMS.Command.execute
  -> commandId / fingerprint / Receipt / Confirmation recovery

Persistence primitive
  <Domain>.Persist
  -> 加入既有事务，执行 lock/query/insert/update/delete

Result builder
  -> Command transaction 提交后，从 Confirmation immutable anchor 构造 canonical result
```

### 2.2 职责矩阵

| 层                   | 拥有                                                                           | 不拥有                                                   |
| -------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Resolver             | GraphQL 参数、认证上下文、transport result                                     | Gate、事务、领域写入、Receipt 分支                       |
| CMS facade           | 共享业务 API、委托具体 use case                                                | 直接调用 Repo/Writer/Persist、选择 write/receipt 分支    |
| `Commands.X.execute` | 一个完整业务动作、Gate/Lifecycle/version、写入顺序、Audit/Outbox               | 通用 Receipt 基础设施                                    |
| `CMS.Command`        | command identity、claim/finalize、Confirmation encode/decode、恢复             | 领域规则、Gate、Lifecycle、资源写入                      |
| Gate                 | actor/action/resource admission、canonical resource 与权威 Access facts        | 状态转换、业务写入、结果投影                             |
| Lifecycle            | actor-independent 状态、allowed transition、blocker、version/concurrency guard | actor policy、GraphQL、普通展示字段                      |
| Persist              | 已有事务内的数据库 lock/query/write                                            | Gate、Lifecycle 决策、transaction owner、Receipt、Outbox |
| FrontDesk            | public locator 解析、稳定资源读取与关系加载                                    | 写入、Receipt、幂等判断                                  |

### 2.3 两种 Command 不再混用

```text
Commands.Publish.execute   领域用例：发布什么、谁能发布、怎样发布
CMS.Command.execute        执行协议：同一 commandId 如何只执行一次并恢复结果
```

每个对外持久化业务写入都必须有 concrete use case；只有满足第 9 节条件的 use case 才进入
`CMS.Command`。

## 3. 强制结构规则

### 3.1 Public facade

Public write facade 只能委托 `Commands.<Action>.execute`：

```elixir
def update_section(community, section, attrs, actor) do
  Commands.UpdateSection.execute(community, section, attrs, actor)
end
```

禁止：

- facade 直接调用 `Writer`、`Persist` 或 `Repo`；
- facade 根据 `commandId` 是否为空选择两套领域实现；
- resolver 构造 `%CMS.Command{}` 或选择 Confirmation codec；
- resolver 直接调用 Persist。

### 3.2 Persist

`<Domain>.Persist` 只保留多个 use case 共享、值得独立测试的数据库 mechanics：

- `FOR UPDATE`/advisory lock 后的具体行操作；
- insert/upsert/update/delete；
- 批量 reindex；
- 关联数据清理；
- 数据库唯一性、外键和集合完整性检查。

Persist 必须：

- 返回 `{:ok, value} | {:error, reason}`；
- 加入调用方已经建立的 transaction；
- 不调用 `Repo.transaction`、`Repo.rollback`；
- 不调用 Gate、Lifecycle、`CMS.Command`、Audit、Activity、Outbox；
- 不生成 `commandId` 或 `operationRef`；
- 不组装 GraphQL 或 transport result。

只被一个 use case 使用且逻辑很短的持久化代码直接留在该 Command 内，不为“分层”创建空转 Persist。

### 3.3 事务所有权

`receipt_pipeline` use case：

```text
Commands.X.execute
  -> CMS.Command.execute
       -> BEGIN
       -> Receipt.claim
       -> Gate admission + canonical lock
       -> Lifecycle/version check
       -> Persist
       -> Audit/Activity/Outbox intent
       -> Confirmation
       -> Receipt.finalize
       -> COMMIT
  -> Result.build
```

`direct_pipeline` use case：

```text
Commands.X.execute
  -> Gate transactional access callback
       -> BEGIN
       -> canonical lock + admission
       -> Lifecycle/version check
       -> Persist
       -> Audit/Activity/Outbox intent
       -> COMMIT
  -> canonical result
```

Gate 的 transactional callback 必须能够加入现有 `CMS.Command` transaction；Persist 不再建立第三层
transaction。

以上是当前实现的事务形态。目标 pipeline 落地后统一为：

```text
receipt_pipeline / direct_pipeline runner
  -> BEGIN
  -> Gate join-only check：load + lock + authorize，返回 canonical resource
  -> Lifecycle / workflow / change
  -> COMMIT / ROLLBACK
```

runner 是唯一主事务 owner；Gate 不再通过 callback 拥有 pipeline transaction，Persist 继续只加入现有
transaction。显式 `on_rejection` 发生在主事务回滚之后，由 runner 另开一笔独立 error transaction，只允许
记录 rejection Audit/Activity，并始终保留原始错误。它只处理 Gate/Lifecycle/change/workflow 明确返回的业务
rejection/blocker；Receipt claim conflict、recovery/decode/finalize、Confirmation 构造/codec、基础设施与未分类
内部错误不触发 `on_rejection`。

## 4. 当前盘点

运行时 GraphQL schema 的 mutation 数量与 `commandId` 覆盖率以生成的 `schema.graphql` 为准；覆盖率只用于
审计，不代表所有 mutation 都必须进入 `CMS.Command` Receipt。

已完成的首批修复包括：revision restore 传递 `commandId`；Docs Cover 的 pin mutation 不再误接 Article
Pin；Dashboard、DocCover、Community 写入均经具体 Command；Gate admission 与写入共用事务；Outbox 使用
调用方传入的 `commandId`；Community Application、Wallpaper、Content Import 的客户端字段统一为
`commandId`（资源上传协议字段除外）。Article 的 `pinDoc/undoPinDoc` 不再生成，schema 只保留 Docs Cover
的 `pinDocToCover/unpinDocFromCover`。

## 5. Article Binding：`BindingWriter` 收口为 `BindingPersist`

### 5.1 目标名称

```text
CMS.Articles.BindingPersist
  -> ArticleBinding / local binding rows
```

`BindingPersist` 不是 facade 或业务 Command，只是 mirror、move、unmirror 共享的 persistence primitive。

### 5.2 保留职责

- 创建或更新 `ArticleBinding`；
- 分配 binding `inner_id`；
- 锁定目标 binding；
- 删除 source binding；
- 清理 binding-local `ArticleBindingTag`、`PinnedArticle`、`KanbanState`；
- 在删除公开 binding 前校验“已发布 Article 至少保留一个公开 binding”。

### 5.3 移出职责

- 删除 `BindingPersist.move/mirror/unmirror` 内部的 `Repo.transaction`；
- 删除 `Repo.rollback`，改为 tagged tuple；
- Command/Gate 已锁定 canonical Article 时，不再重复建立独立事务边界；
- Confirmation、result projection、tag orchestration、Outbox 继续由具体 Command 拥有。

### 5.4 目标调用者

```text
Commands.Mirror.execute   -> BindingPersist.mirror
Commands.Move.execute     -> BindingPersist.move
Commands.Unmirror.execute -> BindingPersist.unmirror
```

`Commands.Pin/Unpin` 不写入 Binding 本身，不放入 `BindingPersist`。若 pin persistence 后续需要共享复杂
mechanics，建立独立 `PinPersist`，不扩大 `BindingPersist` 职责。

## 6. Dashboard

### 6.1 当前问题

`Dashboard.Writer` 当前同时拥有：

- GraphQL `dsb_section` 分发；
- section payload normalize；
- Dashboard 初始化；
- Community base-info 同步；
- transaction；
- section persistence；
- public presentation Outbox。

`CMS.Dashboard.update` 和 ThemePresets 现在把 actor 传入具体 Command；resolver 不再选择 Writer 或
Persist，Dashboard 由 Gate callback 统一拥有事务。

### 6.2 目标模块

```text
CMS.Dashboard
├── Commands
│   ├── UpdateSection (including base_info)
│   ├── SaveCustomThemePreset
│   └── SelectThemePreset
├── Persist
├── BaseInfo
├── SectionPayload
└── ThemePreset
```

### 6.3 Use case 映射

| 当前动作                  | 目标 use case                            | 执行协议                    |
| ------------------------- | ---------------------------------------- | --------------------------- |
| 更新 `base_info`          | `Commands.UpdateSection.execute`         | `direct_pipeline` set-style |
| 更新普通 embedded section | `Commands.UpdateSection.execute`         | `direct_pipeline` set-style |
| 更新 `content_shadow`     | `Commands.UpdateSection.execute`         | `direct_pipeline` set-style |
| 保存 custom theme         | `Commands.SaveCustomThemePreset.execute` | `direct_pipeline` set-style |
| 选择 theme preset         | `Commands.SelectThemePreset.execute`     | `direct_pipeline` set-style |

`UpdateSection` 可以接受受限 section enum：这些字段共享同一 Gate、transaction、section replacement 和
cache invalidation 合同。无需为 SEO、RSS、footer、layout 创建只转发一行的模块。

### 6.4 `UpdateSection(:base_info)` 原子边界

```text
Commands.UpdateSection.execute(community, :base_info, attrs, actor, commandId)
  -> Gate.with_community_check(actor, :update, community)
  -> Communities.Persist.update_identity_fields
  -> Dashboard.Persist.replace_section(:base_info)
  -> Outbox community.presentation_changed
```

Community row、Dashboard base-info 与 Outbox intent 必须同事务提交。

### 6.5 `Dashboard.Persist`

只保留：

```text
get_or_insert_dashboard
replace_section
update_content_shadow
```

`Analysis.Web` 曾调用 `Dashboard.Writer.ensure_exist`。读取路径不应隐式依赖 Writer；现已改为：

- `Dashboard.Persist.get_dashboard` 只读查询；
- `Dashboard.Persist.get_or_insert_dashboard` 只允许 Command/setup 写路径调用。

普通 Analysis read 不应在查询过程中创建业务行。

## 7. Communities

### 7.1 当前问题

旧 `Communities.Writer` 同时承载：

- 用户创建 Community；
- 用户/operations 更新 Community；
- Dashboard base-info 同步；
- Community Application workflow 的 core row 创建；
- Lifecycle 初始化、root moderator、DocTree 初始化；
- Web Analysis 外部 provisioning。

这些动作的事务、Gate、Receipt 和失败语义不同，不能继续放在同一个 Writer。

### 7.2 目标模块

```text
CMS.Communities
├── Commands
│   ├── Create
│   ├── Update
│   ├── CreateFromApplication
│   ├── RunSetup
│   ├── RetrySetup
│   └── RequestDestroy
├── Persist
├── Lifecycle
├── Setup
└── ...
```

### 7.3 `Commands.Create`

`createCommunity` 创建新资源身份，并组合 Lifecycle、root moderator、DocTree 和外部 provisioning，因此由
具体 `Commands.Create` 接管业务入口并贯穿 `commandId`。它使用 `CMS.Command` Receipt 保存创建结果；重试
会恢复同一个 Community，而不会重新撞 slug：

```text
Commands.Create.execute(attrs, actor, commandId)
  -> CMS.Command receipt claim
  -> Communities.CreationPersist.create_core (core-only helper)
  -> Lifecycle.ensure_created
  -> Moderator root
  -> DocTree initialize
  -> Web Analysis provisioning
  -> canonical Community result
```

`provision_web_analysis` 仍是提交后的 best-effort 外部副作用；provider 失败不能改变已经确认的 Community
创建结果。

### 7.4 `Commands.Update`

```text
Commands.Update.execute(community, attrs, actor)
  -> Gate.with_access(actor, :update, community)
  -> Persist.update_fields
  -> Dashboard.Effects.enqueue_presentation_changed(commandId)
```

普通字段覆盖是 set-style，可保持 `direct_pipeline`。若以后增加 expected version、revision anchor 或必须恢复首次响应，
再升级为 `receipt_pipeline`。

### 7.5 `sync_base_info` 与 `create_core`

- `Communities.sync_base_info` 不再是 public business action；改为
  `Communities.Persist.update_identity_fields`，只在 `Dashboard.Commands.UpdateSection(:base_info)` 已完成 Gate 的事务内调用；
- `CreationPersist.create_core` 改为 `Communities.Persist.insert_core`；
- 当前 `Communities.Creation` 改为 `Communities.Commands.CreateFromApplication`，继续拥有 Application lock、
  asset promotion、Lifecycle、slug claim 和 setup job 编排。

`Communities.CreationPersist` 当前只作为 Community creation/setup 的内部 core helper；它不再拥有 Gate、
transaction、Lifecycle、Receipt 或 Outbox，也不再是 public facade 入口。后续可在 Application creation
workflow 稳定后把该 helper 合并进 `Communities.Persist`。

## 8. DocCover

### 8.1 目标模块

```text
CMS.DocCover
├── Commands
│   ├── AddCard
│   ├── RemoveCard
│   ├── ReorderCards
│   ├── UpdateCardAppearance
│   ├── PinDoc
│   ├── UnpinDoc
│   ├── ReorderPinnedDocs
│   └── UpdatePinnedDocAppearance
├── Persist
├── Query
└── Sync
```

### 8.2 事务与 Gate

旧 Writer 曾先调用 `CMS.Gate.access_check`，Gate 短事务提交后才开始部分写事务。现行路径为：

```text
Commands.<Action>.execute
  -> CMS.Gate.with_community_check(actor, :manage_docs, community)
       -> published-node/tree invariant
       -> Persist
       -> result
```

Gate admission、canonical Community/Lifecycle lock 与 Cover 写入必须处于同一 transaction。

### 8.3 Command 与 Receipt 分类

| use case                  | `commandId`           | 原因                                 |
| ------------------------- | --------------------- | ------------------------------------ |
| AddCard                   | `CMS.Command` Receipt | 首次结果可能因 response 丢失而需恢复 |
| RemoveCard                | `CMS.Command` Receipt | 首次结果可能因 response 丢失而需恢复 |
| PinDoc                    | `CMS.Command` Receipt | 首次结果可能因 response 丢失而需恢复 |
| UnpinDoc                  | `CMS.Command` Receipt | 首次结果可能因 response 丢失而需恢复 |
| ReorderCards              | `direct_pipeline`     | 完整目标集合覆盖                     |
| UpdateCardAppearance      | `direct_pipeline`     | set-style 覆盖                       |
| ReorderPinnedDocs         | `direct_pipeline`     | 完整目标集合覆盖                     |
| UpdatePinnedDocAppearance | `direct_pipeline`     | set-style 覆盖                       |

### 8.4 `DocCover.Persist`

保留多个 use case 共享的：

- published node resolution；
- card/pinned row insert/delete；
- 完整集合与唯一 ID 检查；
- batch reindex；
- appearance update。

“Cover 只能引用已发布 Group/Page”等产品规则属于 Command 或明确的 domain policy helper，不因需要 SQL
查询就自动归 Persist。

### 8.5 无调用 API

以下 Persist mechanics 没有独立的 public business entry；仅由未来需要它们的具体 Command 调用：

- `set_item_hidden`；
- `update_item_appearance`；
- `reorder_items`。

若继续确认无调用，删除这些 dead mechanics，不为其创建 compatibility wrapper。

## 9. `commandId` 是唯一客户端业务写入 identity

### 9.1 冻结名称

```text
一次已经开始执行的逻辑业务写入 = commandId
```

禁止新增以下同义公共字段：

- `idempotencyKey`；
- `requestId`；
- `mutationId`；
- 作为 retry identity 使用的 `operationId`。

资源上传完成协议中的历史 `idempotency_key` 是 provider/resource 字段，属于明确例外；它不能被当作
业务 Command identity，也不能扩散到其他 mutation。

统一名称不等于所有 mutation 都必须进入 Receipt。只有需要恢复首次结果的动作要求
`commandId: ID!`；天然 set-style、允许读取最新 canonical result 的动作可以使用 `direct_pipeline`。

### 9.2 与其他 ID 的边界

| 名称                        | 含义                                                       |
| --------------------------- | ---------------------------------------------------------- |
| `commandId`                 | 一次逻辑业务写入，transport retry/recovery 复用            |
| `operationRef`              | 内部 Audit/Activity correlation；不作为客户端写入 identity |
| `jobRef`                    | 持久化 workflow resource identity                          |
| `previewRef`                | Preview resource identity                                  |
| `batchRef`                  | 外部上传/处理批次 identity                                 |
| `revisionId` / `snapshotId` | immutable domain resource identity                         |
| capability/token nonce      | 安全凭证 identity                                          |

资源 ref 不能代替 `commandId`，`commandId` 也不能代替资源主键。

pipeline 的 rejection Audit/Activity 使用以下 `operationRef` 规则：

- 用户 `receipt_pipeline` 原样使用入口 `commandId`，同一逻辑命令重试时保持幂等；
- `direct_pipeline` 由 runner 在每次 `execute` 入口、主事务开始前生成新的 UUID，并在回滚后的 `on_rejection`
  transaction 中原样复用；不得从 operation、resource 或 actor 确定性推导；
- internal job/workflow 只有已经拥有代表本次外部执行的稳定 UUID 时才能显式传入并在重试中复用；资源 ref
  或 operation atom 不能充当执行 identity。

actor 仍是 Activity 的独立字段。只把 actor 拼入资源级 key 仍会错误合并同一 actor 后续的独立操作，因此
不能替代每次 write 执行的新 UUID。

### 9.3 Community Application

当前：

```text
submitCommunityApplication(commandId)
  -> CommunityApplications.Writer
  -> CommunityApplication.submit_command_id
```

目标：

```text
submitCommunityApplication(commandId)
  -> CommunityApplications workflow
  -> CommunityApplication.submit_command_id
```

领域行保存 `submit_command_id` 作为 provenance/唯一约束；它不是第二套客户端 identity。Application
expected-version transitions 仍由其 aggregate workflow 持有，只有确实需要首次结果恢复时才接入 `CMS.Command`。

以下 expected-version transitions 同样增加 `commandId`，是否进入 `CMS.Command` 按 ambiguous-commit 风险单独判定：

- cancel；
- start review；
- approve；
- reject；
- retry creation；
- retry setup。

首次提交成功但 response 丢失后，原请求若没有 Receipt 恢复会因 version 已变化而错误返回 conflict。

### 9.4 Wallpaper

`WallpaperPublishReceipt` 是 Batch/Snapshot workflow 的领域 receipt，不是客户端 identity 的第二套命名。当前链路为：

```text
prepareWallpaperUpload(commandId)
  -> Batch/capability 绑定 commandId

publishWallpaper(commandId)
  -> Wallpaper.Commands.Publish / 领域流程 receipt

Assets Hub claimForPublish(batchRef, commandId)
```

本轮完成名称和传递链收口：

- prepare、publish 与 Assets Hub claim 均接收同一个 `commandId`；
- Snapshot/领域 receipt 只作为 Batch/Snapshot workflow 的 provenance 与恢复投影，不替代 `commandId`；
- `requestDigest` 继续验证 payload，不能替代 `commandId`；
- 后续若将 Wallpaper 全量接入 `CMS.Command`，只需替换该领域 receipt 的执行协议，不再改客户端字段。

### 9.5 Content Import

Content Import 不再向产品层暴露通用 `idempotencyKey`：

- 表示用户启动的一次逻辑写入时，使用 `commandId`；
- 只表示一次 preview 计算尝试时，使用 `attemptRef`；
- `previewRef`、`jobRef` 继续作为资源 identity；
- 禁止为同一次 attempt 同时维护 `attemptRef` 与 `commandId` 两个客户端 identity。

Content Import Job 自身的状态机、row lock 和完成结果仍由 Job aggregate 拥有；不把 Job lifecycle 塞入
`CMS.Command`。

### 9.6 Outbox

本轮 command-backed concrete Command 及其 Persist 不得调用 `Ecto.UUID.generate()` 填充 `command_id`，必须
把入口 `commandId` 原样传给 `CMS.Outbox.send/1`；`operationRef` 只允许作为内部 correlation 字段，不能
作为第二套客户端幂等 identity。迁移前的旧流程分类保留在第 11 节，只作为历史依据。

## 10. Gate 与 Lifecycle 的组合

### 10.1 Gate

Gate 只回答：

```text
actor 是否可以对当前 canonical resource 执行 action？
```

所有外部写入必须在领域 Command 内调用 Gate。GraphQL Passport middleware 可以提前拒绝请求，但不是领域
授权权威，不能替代 Gate。

当前 `CMS.Gate` 公开 facade 已暴露两类入口：

- `scope/4`：构造读取范围，不执行 Repo；
- `access_check/3`：加载并检查单资源 mutation admission。

`Gate.Access` 还实现了 aggregate Command 所需的事务 callback：`with_check/4`、
`with_community_check/4`、`with_community_check/5` 和 `with_branch_check/6`。这些可成功执行的签名已按原名和原
arity 提升到 `CMS.Gate` facade，由 facade 委托给内部 `Gate.Access`；领域 Command 只依赖
`CMS.Gate`。

历史 `Gate.Access.with_branch_check/5` 只是在缺少显式 Community/binding context 时返回
`:article_binding_context_required` 的错误兜底，不是受支持的事务入口，也不提升到 `CMS.Gate`。
其上游无 context 调用已改为显式 `with_branch_check/6`，`/5` 子句已删除；不把该
兜底保留成 facade 兼容层。

不新增 `with_access/4` 同义入口。Community 与 Doc branch callback 需要显式 Community、Article 和
branch context，不能在没有定义 typed target 的情况下压缩成一个含义不完整的 `/4` API。
`Gate.Access` 继续作为内部加载、锁定和授权实现，不成为业务层可直接调用的公共边界。

pipeline 迁移必须增加一组由 `CMS.Gate` facade 暴露的 join-only API，目标合同见
[CMS Command Pipeline Contract](../architecture/cms-write-boundary-contract.md) §3.4：

- 调用方必须已经处于 runner transaction；
- Gate 在该 transaction 内加载并锁定主目标、构造 typed Access Context、完成授权并返回 canonical
  resource；
- API 不接收业务 callback，不调用 `Repo.transact`，也不提交或回滚；
- Article/Comment/Community/Doc branch 可以保留表达完整 context 所需的不同 arity，不能压缩成丢失
  Community/binding/branch 信息的通用参数；
- pipeline 后续的 Lifecycle 与写入复用返回的 canonical resource，不允许为同一主目标再 load 一次。

`with_check`、`with_community_check`、`with_branch_check` 是非 pipeline 调用方使用的 transaction-owning
Gate API；pipeline 只能调用 join-only primitive。两类 API 的 transaction owner 不同，不是兼容层。

### 10.2 Lifecycle

Lifecycle 只拥有长期资源状态和并发 guard：

- Community Lifecycle：setting up、active、read-only、archived、pending destroy、destroy 等；
- Article Lifecycle：draft-only、published、archived、deleted、destroy；
- Doc Lifecycle：branch-scoped draft/public lifecycle。

以下不是 Lifecycle：

- Dashboard section；
- Article sink flag；
- comment pin/fold；
- Kanban status；
- theme preset；
- upload Batch 或 Content Import Job 状态。

它们可以有领域状态和 transition，但不能为了统一命名都塞进 Lifecycle authority。

## 11. mutation 分类结果

Article、Comment、Community、Assets、Dashboard、DocCover、DocTree、Docs、Kanban、Press、Wallpaper 与
Community Application 下的 93 个 concrete Command 已逐项归入 `receipt_pipeline` 或 `direct_pipeline`；
Community Application Submit 另以 `workflow_pipeline` 表达命名步骤。Auth/session 与纯读取投影不属于
CMS command pipeline 范围。具体数量、operation 和 access 以三份生成 manifest 为准，不再维护一张会与代码
漂移的手工 action 表。

## 12. 实施阶段

### Phase 1：基础命名与事务（已完成）

1. `BindingWriter` 改为内部 `BindingPersist`；
2. Persist 移除自有 transaction/rollback；
3. 冻结 Gate transactional API；
4. 增加 facade/resolver/Persist 静态依赖门禁。

### Phase 2：删除 Writer 业务入口（首批已完成）

1. Dashboard Commands + Persist；
2. Communities Commands + Persist；
3. DocCover 八个 Commands + Persist；
4. 删除三个无调用 DocCover Writer API；
5. `Dashboard.Writer`、`DocCover.Writer` 已删除；Community creation/setup 的 `CreationPersist` 仅作为内部 core helper，不能由 public facade 调用。

### Phase 3：服务端 identity 统一（命名与首批路径已完成，其余按领域保留）

1. Community Application `idempotencyKey` 改为 `commandId`；
2. Submit identity 已改为 `commandId`；Application expected-version transitions 继续由其 aggregate workflow 持有；
3. Wallpaper prepare/publish 保留 domain receipt 作为外部 Batch workflow 的资源投影，客户端 identity 已统一为 `commandId`；
4. Wallpaper prepare/publish/Assets Hub claim 贯穿同一 `commandId`；
5. 首批迁移路径的 Outbox 已停止由 Persist/Writer 自行生成伪 `command_id`，并接收 concrete Command
   的入口 `commandId`；Phase 5 文档列出的遗留 producer 不属于本项完成范围；
6. Content Import 移除同义 `idempotencyKey`。

### Phase 4：客户端 identity 统一（已完成）

按 [CMS Command 客户端 Identity 边界修复](./cms-command-client-identity-fix.md) 实施：

- 组件和领域 hook 不创建/保存 `commandId`；
- mutation executor 是唯一 owner；
- unknown outcome 保留同一 handle；
- Apply、Wallpaper、Content Import 删除各自的 `idempotencyKey` coordinator。

### Phase 5：其余 mutation 审计（持续清单）

详细实施合同见
[CMS Command Phase 5：Legacy Mutation 分类与迁移](./cms-command-phase-5-legacy-workflows.md)。按第 11 节
逐领域迁移；每个 mutation 明确标注：

```text
concrete use case
Gate action
Lifecycle/version authority
transaction owner
receipt_pipeline | direct_pipeline | routing function
internal workflow_pipeline（按需）
Confirmation/present builder（receipt 按合同必需）
Audit/Activity/Outbox
```

### Phase 6：pipeline foundation 与 Command 迁移（已完成）

1. 已实现 pipeline macro/runner、`__pipeline_contracts__/0` 和 `mix cms.pipeline.check`；macro 只做当前模块的
   metadata/阶段检查，Confirmation 跨模块合同等完整 application 编译后再检查；receipt/direct 顶层 pipeline
   都必须声明稳定 `operation`，write 升级为 receipt 时 atom 不变；macro 读取 `@pipeline` 后必须用
   `Module.delete_attribute/2` 擦除，禁止下一条声明继承过期 metadata；
2. 已增加 Gate join-only API，并与非 pipeline transaction-owning Gate API 分离；
3. concrete Command coverage 使用 `covered`/`uncovered` 合同，任何 uncovered 项直接失败；顶层
   receipt/direct contract 与 1 个 workflow contract 覆盖现有 Article、Comment、Community、Assets、Dashboard、DocCover、DocTree、
   Docs、Kanban、Press、Wallpaper 与 Community Application 写路径；
4. `workflow_pipeline` 只能在顶层 pipeline transaction 内执行，V1 禁止 workflow 嵌套；
   step 的 `Pipeline.Rejected`/Gate `Decision` 由 runner 归一化为该 step 的失败，保留原始对外错误并触发顶层
   `on_rejection`，不产生重复的 `pipeline_stage` 嵌套；
5. external/user entry 与 internal job/maintenance entry 分开，禁止根据 nil `command_id` 或
   `{:workflow, ref}` 改变执行协议；
6. 新增 `GroupherServer.Activity.log_rejection/3` 窄入口；builder 只返回纯 `RejectionData`，不获得任何
   Activity/Effects 写入权限；runner 固定调用 `{GroupherServer.Activity, :log_rejection, 3}`。该函数接收稳定
   `resource`、领域 `action` 和 opts，要求 `actor`、`rejection_code`、`operation_ref`，允许 `source`，并在
   内部固定注入 `outcome: :denied`；receipt 使用入口 commandId，write runner 在每次执行入口生成新的 UUID
   并跨主事务回滚传给 `on_rejection`；
7. Mix task 的 call-edge 分析对 `apply/3`、变量模块和无法解析的函数捕获 fail closed，并限制
   `on_rejection` builder 只能做纯数据转换；Activity 写入只由 runner 执行；
8. 受检源码读取/parse 失败、parser recovery、partial AST、未知可达 executable node 或 traversal
   覆盖无法证明时，Mix task 必须失败；visitor 不得用无诊断兜底分支静默跳过；
9. 除已建模的标准构造、pipeline DSL、`defdelegate` 外，受检边界内的自定义 macro 调用默认失败；检查器
   只通过封闭的已审查宏配置扩展能力，并为宏生成的调用边提供显式模型和正反例测试；
10. Backend CI 独立运行 `mix compile --warnings-as-errors`、`mix cms.pipeline.check --check`、
    `mix cms.pipeline.coverage --check`、`mix cms.command.pipeline --check` 与 ExUnit；现有 Node
    architecture gates 保持独立，不读取 pipeline coverage。
11. `mix cms.pipeline.coverage` 生成 concrete Command 覆盖清单；`mix cms.pipeline.check` 生成完整编译合同。
    两者负责不同事实，均以 freshness 门禁防止代码与 JSON 漂移。
12. `mix cms.command.pipeline` 从 resolver 和 concrete CMS facade root 传递追踪路由函数、helper、Command、
    pipeline 与动态边；正式运行读取宏展开后的 Elixir debug definitions。uncovered、unreached user pipeline、
    unresolved、internal reachability、顶层 pipeline 互调、非法 workflow caller 或绕过 pipeline 的 Command
    write 任一非零都会阻断 CI。
13. `Commands/` 外的 interaction reaction 由独立 interaction command contract 覆盖，不进入 pipeline
    coverage 或 pipeline graph；它们不属于 CMS pipeline 迁移范围，数量只以生成产物为准。

### Phase 7：rejection effect 收口（已完成）

已按 `docs/architecture/cms-write-boundary-contract.md` §3.3 完成：Command 只返回显式本地
`&builder/1 -> RejectionData`，runner 在主事务回滚后组装 `RejectionLog` 并调用 adapter 的
`record_rejection/1`；CMS adapter 在独立 transaction 中通过 Activity Context 写入审计表；
共享 `GraphAnalyzer` 负责 builder purity，`pipeline_contracts.json` 已升级为 schema 2，Activity 字段/API 已
统一为 `rejection_code`，旧 `on_error` DSL、terminal MFA 和 Command 侧写入路径已删除。

### Phase 8：提升为 Backend 通用 Command Pipeline（第一阶段已完成）

目标合同见 architecture §10.2。通用 runtime、DSL、编译后 `GraphAnalyzer` 与 rejection adapter boundary
已提升到 `GroupherServer.CommandPipeline`；CMS Gate、Receipt、Activity 仍由显式 CMS adapter 提供。

- Accounts 16 个显式 Command 已迁移：14 个 `direct_pipeline`，CollectFolders Add/Remove 为
  `receipt_pipeline`；Achievements advisory lock、CollectFolders 的跨 Context 写入和 OAuth 并发注册均有行为测试；
- Messaging 5 个显式 Command 已迁移为 `direct_pipeline`，post-commit notification/mention effect 的提交边界保持不变；
- 三种 pipeline 是唯一顶层执行协议；本批没有发现需要第四种协议的业务动作；
- leaf Persist、查询、recorder、普通 helper 和既有非 Command maintenance workflow 未被强制包装；
- CMS 的 contracts/coverage/graph 产物继续保持 CMS scope，不能误读为全 Backend inventory；
- Accounts/Messaging 的 21 个非 CMS Command 当前只有通用 DSL 编译合同和领域行为测试，尚未有 Backend 级
  inventory/coverage/graph 产物；
- 后续只审计并迁移其它 Context 中未放在 `Commands/` 的等价写入口，不建立旧/新 runtime 双路兼容层。

## 13. 门禁与验收

### 13.1 当前静态门禁

当前门禁由 Node repository gates 与 Elixir pipeline/graph gates 共同组成：

- `check-resolver-boundary.mjs` 扫描完整 resolver 目录，禁止 Repo/Ecto/ORM、内部
  Store/Writer/Commands/Query、持久化 struct 泄漏；
- `check-cms-facade-boundary.mjs` 检查固定 10 个 facade 的 Repo/Ecto/外部 effect/共享
  `%CMS.Command{}` 边界，并验证固定 7 个 concrete Command 文件；这不是全量自动发现；
- `check-command-identity.mjs` 扫描 tracked 与 non-ignored source，自动发现
  `cms/**/{persist.ex,*_persist.ex}`，检查常见 `command_id` 生成、Persist 反向依赖，以及 resolver/root
  facade 的 direct Persist；它是语法检查，不是 identity provenance 数据流分析；
- `check-cms-context-module-boundary.mjs --strict` 扫描完整 CMS tree，检查 Persist/Command/Workflow/Job 的
  transaction、Outbox、Writer 和回流边界；其 owner 主要由当前目录结构推导；
- `check-backend-context-v2.mjs --fully-strict` 检查通用 Backend Context、Facade、Owner、跨 Context internal
  调用、typed Job 和 Outbox owner；它不负责 CMS pipeline 阶段；
- production 代码不得新增通用 `idempotencyKey`；资源上传协议的历史字段、migration、历史文档可白名单；
- `commandId` 不得在 facade、Command、Writer/Persist 或 Outbox producer 内生成。

这些门禁与正反例测试由 root `pnpm docs:check` 聚合。命令名虽然包含 `docs`，但其中的 CMS Context、
Facade、Resolver 和 Command identity 检查都是阻断式 architecture gates。

### 13.2 Pipeline 落地后的门禁

目标执行链和唯一 source of truth 见
[CMS Command Pipeline Contract](../architecture/cms-write-boundary-contract.md) §8。pipeline 落地后：

1. Elixir 编译由 macro 检查 pipeline metadata、阶段集合、声明顺序、必需 Gate、Receipt Confirmation 和
   workflow step；macro 不调用 `Code.ensure_compiled!/1`，也不依赖 `@after_compile` 校验其他模块；
2. macro 为 pipeline module 生成 `__pipeline_contracts__/0`，metadata 直接编译进 BEAM；`mix cms.pipeline.check`
   再生成 `backend/api/priv/pipeline_contracts.json`，它是可审查的编译产物，不是第二份 action registry；
3. `mix cms.pipeline.check` 在 `mix compile` 后扫描 compile path 的 BEAM，调用
   `__pipeline_contracts__/0` 汇总 contracts，并检查当前已实现的 operation 唯一性、源码 parse/dynamic-call
   规则，以及 Confirmation module/behavior/callback/operation；`--check` 负责 freshness；
4. `mix cms.pipeline.coverage` 另行扫描 `cms/**/commands` 下导出 `execute/*` 的 concrete Command，生成
   `backend/api/priv/pipeline_coverage.json`，用于 fail-closed 覆盖检查；它不分析调用边，也不替代 pipeline checker；
5. `mix cms.command.pipeline` 从 resolver/facade public root 追踪路由函数和普通 helper，并读取编译后的 Elixir
   debug definitions 看穿 `use`/import/macro 生成函数，输出 `backend/api/priv/pipeline_graph.json`；任务始终对
   unresolved/dynamic/unexpanded macro、uncovered、unreached user pipeline、internal reachability、顶层 pipeline
   互调、workflow caller、非 gate 阶段 Gate、mixed protocol entry 与 unpipelined Command write fail closed；
6. 只有 `receipt_pipeline` runner 可以调用 `CMS.Command`，业务 Command、shared Support 和 routing function
   不得直接选择 Receipt 协议；
7. resolver/user facade 的任意传递调用路径不得抵达 `access: :internal` pipeline；top-level pipeline 不得
   互调，`workflow_pipeline` 只能由顶层 pipeline 的 `workflow` 阶段调用；
8. 一个 pipeline 不得根据 nil `command_id` 或 `{:workflow, ref}` 在运行时改变执行协议；原 external facade
   签名保持不变，internal job/maintenance 使用独立 entry；该规则由编译后图证明同一 Command entry 不会同时
   可达 receipt/direct pipeline，不再由 coverage task 解析源码字符串猜测；
9. 现有 Node architecture gates 继续检查 resolver/facade/Persist 等 repository source 边界，但不读取
   pipeline coverage；`pnpm docs:check` 不代替 `mix cms.pipeline.check --check`；
10. `apply/3`、变量模块、运行时模块拼接和无法解析的函数捕获/callback 在受检调用图内 fail closed；只有
    可以静态穷举并证明安全的有限间接调用才放行；
11. 受检源码必须完整解析，所有可达 executable AST node 必须归类；读取/parse 失败、partial/recovered
    AST、unsupported construct 或 traversal 覆盖无法证明时直接失败，并报告 file、line 和 AST 类型；
12. 除分析器显式建模的标准构造、pipeline DSL 和 `defdelegate` 外，受检边界内的自定义 macro 默认违规；
    已审查宏固定登记在检查器配置中，不能由 action/pipeline annotation 扩展；
13. `on_rejection` builder 及其同模块 helper 只能做纯数据转换；跨模块 helper、`Repo`、Persist、`Activity`、
    Receipt、`CMS.Command`/Outbox、动态调用和其他 pipeline 均 fail closed，Activity 写入只能由 runner 发起；
14. Gate action、Lifecycle transition、事务回滚和 Receipt recovery 的业务正确性仍由 runtime 与行为测试
    证明，检查器不根据文件名或参数名猜测业务语义。
15. runner 为每个 callback 设置并恢复唯一 stage context；join-only Gate API 只允许在 `gate` stage 中调用，
    编译后图同时阻断从其他 stage 经普通 helper 间接抵达 Gate。旧 workflow 中重复的 Gate 必须拆成 Command
    gate 与明确的 `*_after_gate` 写入口，不能用 flag 或兼容分支绕过；编译图提取到的 stage 集合必须与 contract
    完全一致，否则以 `stage_analysis_errors` fail closed。
16. contracts、coverage 与 graph 必须共用同一 production module discovery，只接受 compiler source path 位于
    `backend/api/lib/` 的编译模块；测试 fixture 即使出现在 compile path 中也不得进入正式 contracts 或 graph。
    Mix project 加载后，项目根、源码 glob、manifest 和相对路径必须从 `Mix.Project.project_file/0` 推导，不能
    依赖 task 执行期间变化的 cwd；这不表示 Mix 可以从不含 `mix.exs` 的任意子目录启动。三份 checked-in JSON
    中的 `{module, function, arity, pipeline}` 集合必须完全一致，且每份原始列表不得含重复项。

具体数量以生成 manifest 为准。合同要求 coverage 的 `uncovered` 和 graph 的
uncovered/unresolved/internal/top-level/workflow/gate-stage/mixed-protocol/unpipelined 违规均为 0。静态图不替代 Gate action、
Lifecycle transition、数据库回滚和 Receipt recovery 的行为测试。

### 13.3 行为测试

- 普通 Gate rejection 不产生领域写入、Audit 或 Outbox；Article Trash 等显式 `on_rejection` 场景只允许在明确的
  业务 rejection/blocker 使主事务回滚后写 rejection Audit/Activity；Receipt claim conflict、recovery/decode/
  finalize、Confirmation 构造/codec、基础设施与内部错误不触发 `on_rejection`；
- runner 开启事务，Gate join-only API 在其中一次完成主目标 load/lock/authorize，后续阶段复用同一个
  canonical resource；
- internal pipeline 的 `load` 在 runner transaction 中完成 canonical load + lock，只跳过 actor authorize；
- Persist 错误使 Receipt、领域事实、Audit 和 Outbox 一起回滚；
- `on_rejection` 由 runner 开启独立 error transaction；callback 失败不替换原始错误，也不能写 Receipt、
  领域事实或普通 Outbox；
- `Activity.log_rejection(resource, action, opts)` 要求 atom action，以及包含 `actor`、`rejection_code`、
  `operation_ref` 的 opts；runner 只向 `on_rejection` 提供原始稳定审计对象/identity 和原始错误，不暴露主事务
  内生成后又回滚的 stage result；函数内部固定 `outcome: :denied`，调用方不能覆盖；
- 用户 `receipt_pipeline` 的 rejection Activity 使用入口 `commandId` 作为 `operation_ref`，并按确定性
  `event_ref` 幂等；同一 commandId 重试不新增第二条 denial，transport attempt 次数只记录 telemetry；
- `direct_pipeline` runner 在每次 `execute` 入口、主事务前生成新的 UUID `operation_ref`，并跨回滚原样传给
  `on_rejection`；不得按 operation/resource/actor 生成确定性资源级 key；
- 两个 actor 对同一资源的相同 write denial 产生两条 Activity；同一 actor 两次独立 write denial 也产生
  两条 Activity；
- checker fixtures 证明普通 `Activity.log/3`、public
  `GroupherServer.CMS.Articles.Effects.activity/3`/`enqueue/6`、内部
  `GroupherServer.CMS.Articles.Effects.Outbox.activity/3`/`enqueue/6`、伪造 behavior 和动态调用均不能被
  `on_rejection` builder 调用；Activity 写入终点只存在于 runner；
- checker fixtures 证明 source read/parse failure、partial/recovered AST、unknown executable node 与
  unsupported construct 均阻断检查，并输出 file、line 和 AST 类型；
- checker fixtures 证明自定义 macro 不能隐藏 Repo/动态调用边，已建模 pipeline DSL/`defdelegate` 仍可完整
  建图；
- response 丢失后以同一 `commandId` 恢复首次 Confirmation/result；
- 相同 `commandId` 配不同 payload 返回 identity conflict；
- 当前 direct/set-style 写入（迁移后 `direct_pipeline`）重复执行得到相同最终状态；
- external/user root 无法直接或间接抵达 internal pipeline，workflow 不嵌套；
- Lifecycle transition 覆盖 allowed transition、version conflict 与 blocker；
- Dashboard base-info 的 Community/Dashboard/Outbox 原子性有回归测试；
- DocCover add/remove/pin/unpin 有最终状态回归测试，并覆盖 Receipt recovery；
- Community create 有 ambiguous-commit/recovery 测试；Application transitions 仍由 aggregate workflow 自己持有版本语义；
- Wallpaper publish 的 domain receipt 只保存 Batch/Snapshot workflow 投影，不能再接受 `idempotencyKey`。

### 13.4 验证命令

至少运行：

```text
cd backend/api
mix compile --warnings-as-errors
mix test test/groupher_server/cms/gate
mix test test/groupher_server/cms/articles
mix test test/groupher_server/cms/dashboard
mix test test/groupher_server/cms/communities
mix test test/groupher_server/cms/doc_tree/cover_test.exs
mix test test/groupher_server/cms/community_applications_test.exs
mix test test/groupher_server_web/wallpaper_graphql_test.exs

cd ../..
pnpm docs:check
```

`pnpm docs:check` 已聚合当前 CMS Context、Facade、Resolver、Command identity 和文档检查；定位单项问题时
可以运行对应的 `pnpm check:*`。同时按变更范围运行 GraphQL codegen、frontend type-check 与生成产物
freshness check。Backend CI 在 `mix compile --warnings-as-errors` 之后、ExUnit 之前运行三项 backend
coverage/check：

```text
mix cms.pipeline.check --check
mix cms.pipeline.coverage --check
mix cms.command.pipeline --check
```

它们分别校验 pipeline contract coverage、concrete Command 覆盖 coverage 和跨模块调用图产物的 freshness；
三者都是纯 Elixir backend 检查，不由 `pnpm docs:check` 代跑，也不输出供 JavaScript 消费的业务 manifest。
`mix cms.pipeline.coverage` 是合同覆盖清单；`mix cms.command.pipeline --check` 同时验证 freshness 和
跨层拓扑。对应 ExUnit 行为测试仍必须运行，不能只依赖 compile/check。

## 14. 提交拆分

本轮工作树包含多个独立迁移边界，不应作为一个混合提交交付。提交前按以下顺序建立显式 manifest，
每批单独运行对应测试并检查 `git diff --cached --check`：

1. `refactor: normalize article binding storage and naming`：Article Binding schema、字段/索引改名、`BindingPersist` 与相关测试/migration；
2. `feat: complete command identity and receipt migration`：`commandId`、Receipt、Outbox identity、客户端 executor、generated GraphQL 与 identity 测试；
3. `refactor: promote gate access contracts`：`CMS.Gate` facade、Access callback、policy/context 与 Gate focused tests；
4. `refactor: move dashboard/community/doc-cover writes into commands`：具体 Commands、Persist、Writer 删除、resolver/schema 与领域测试；
5. `chore: add CMS command-boundary gate and docs`：静态门禁、门禁测试、两份迁移文档和 package script；
6. `backend/content-import/**` 等已存在但不属于上述边界的改动保持独立，不自动纳入本轮提交。

拆分时同时审计 cached 与 uncached 文件；未跟踪的新 Command/Persist 必须先归入正确批次，不能因为尚未
`git add` 而逃过审查。除非另有明确授权，本节只定义拆分边界，不自动执行 commit 或 push。

## 15. 非目标

本文不：

- 把 `CMS.Command` 扩展成全局 Command Bus；
- 要求所有 mutation 都创建 Receipt；
- 把 SQL/Ecto 实现全部塞进 Command module；
- 用 `commandId` 代替 job、batch、revision、snapshot 等资源 identity；
- 把 Dashboard、Kanban、comment pin 等普通领域状态塞进 Lifecycle；
- 让 GraphQL middleware 取代领域 Gate；
- 为旧 Writer 或 `idempotencyKey` 保留 runtime compatibility wrapper；
- 修改历史 migration 文件中的旧列名或表名。
