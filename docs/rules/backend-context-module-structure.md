# Backend Context Module Structure and Boundaries

> 状态：current。
>
> 本文规定 Backend Context 内部的模块职责、目录命名、依赖方向、transaction owner、业务副作用和
> Receipt/Confirmation 边界。它是新代码的规范；现有迁移文档中的 legacy owner、deferred context 和
> 兼容入口需要明确标注，不应被当作新代码模板。

相关文档：

- [Backend Rules](./be.md)：后端通用规则、ErrorCat、Config、业务返回形状；
- [CMS Command Confirmation](../architecture/cms-command-confirmation.md)：typed Confirmation、Receipt 和恢复合同；
- [CMS Facade 与实现目录收口](../architecture/cms-facade-directory.md)：现有 facade 收口与迁移记录；
- [CMS Command Phase 5 Legacy Workflows](../migrations/cms-command-phase-5-legacy-workflows.md)：Command、Workflow、Persist 和副作用边界。

## 1. Scope

本文适用于有明确业务边界的 Backend Context，尤其是：

```text
backend/api/lib/groupher_server/cms/<context>
```

也适用于其他 backend bounded context，只要它具有自己的公开 facade、业务 mutation、查询、主数据
写入或副作用。

本文不要求每个 context 拥有完整的目录集合。目录是否存在取决于职责是否存在；但一旦职责存在，
就必须有明确且可测试的 owner，不能因为实现较小而把职责重新混入 facade、Command 或模糊的
`Writer`、`Manager`、`Service` 模块。

## 2. Core model

对外调用的标准路径是：

```text
GraphQL / Job / domain caller
  -> Context facade
     -> Commands.Action
        -> Gate / Policy / Lifecycle
        -> Persist
        -> Projection
        -> Effects
        -> Confirmation
```

读路径独立于 mutation：

```text
Context facade
  -> Query
     -> persisted facts / projection / cache / FrontDesk
```

不是每个 mutation 都需要 `Policy`、`Projection`、`Workflow` 或 `Setup`；但这些职责一旦出现，
必须按照本文定义隔离。

## 3. Canonical context shape

### 3.1 Root facade

对外 context 通常保留一个根 facade：

```text
<context>.ex
```

例如：

```elixir
CMS.Interactions
CMS.Wallpaper
```

Facade 可以负责：

- 稳定的公开函数、typespec 和返回合同；
- delegate 到 Command、Query、Workflow 或具名 domain owner；
- 轻量参数归一化；
- 公开边界上的匿名/认证分流；
- 少量、没有私有业务算法的结果组装。

Facade 不得负责：

- 直接 `Repo` 查询或写入；
- 建立或控制业务 transaction；
- 直接调用 `CMS.Outbox`、Activity、通知或外部 HTTP；
- 生成 command identity 或 workflow identity；
- 把已加载的领域 struct 降级为 ID 后交给下层重复加载；
- 通过 `Writer`、`Manager` 或 `Service` 绕过标准 owner。

### 3.2 Logical skeleton

Context 的逻辑结构如下。没有对应职责的部分不创建；具有对应职责时必须使用明确的 owner：

```text
<context>.ex                         # facade，公共 context 通常固定

<context>/
  commands/                          # 有业务 mutation 时需要
    confirmation/                    # 有 Receipt-backed Command 时需要

  query/                             # 有读取职责时需要

  persist.ex                         # 有主数据写入时需要
  effects.ex                         # 有副作用时需要
  policy.ex                          # 有独立业务策略时需要
  settings.ex                        # 有产品/领域 settings 时需要
  config.ex                          # 有 runtime/application config facade 时需要
  error_cat.ex                       # 有 context-specific errors 时需要
  const.ex                           # 有封闭领域词汇时需要

  projection.ex or projection/      # 有派生读模型时需要
  workflow.ex or workflow/          # 有多阶段/可重试流程时需要
  setup.ex or setup/                # 有 bootstrap/初始化流程时需要
  helper/                           # 有多个纯领域 helper 时需要
```

单个 owner 可以使用单文件；多个同类 owner 才使用目录。例如 `Persist` 和 `Effects` 可以分别是
`persist.ex`、`effects.ex`，不要求为了形式创建 `persist/`、`effects/` 目录。

`commands/`、`query/` 和 `commands/confirmation/` 表达稳定的逻辑 namespace。文件数量增加时，
才在这些 namespace 下继续拆分。

## 4. Module ownership matrix

| Module       | Requirement                       | Owns                                                      | Must not own                                           |
| ------------ | --------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| Facade       | Public context 时通常需要         | public API、delegate、轻量归一化                          | Repo、transaction、Gate、Outbox、identity              |
| Commands     | 有业务 mutation 时必须有          | 一个完整业务动作、Gate/Lifecycle 编排、Command protocol   | ORM 细节、外部不可回滚副作用、第二个 transaction owner |
| Query        | 有读取职责时需要                  | list、detail、aggregate、read model 查询                  | mutation、Receipt、commandId 写入                      |
| Persist      | 有主数据写入时必须有              | changeset、row lock、upsert、关联 row primitive           | authorization、transaction、identity、Activity、Outbox |
| Effects      | 有副作用时必须有                  | Activity、Outbox intent、通知 adapter、cache invalidation | 主数据 authority、独立 transaction、identity 生成      |
| Projection   | 有可重建派生读模型时需要          | ReadState、统计、搜索 projection、materialization         | 第二套 authority、actor authorization                  |
| Workflow     | 有多阶段/可重试/有状态流程时需要  | workflow identity、claim、step、retry、maintenance        | 隐式混用 CMS.Command identity 和 workflow identity     |
| Setup        | 有 bootstrap/初始化流程时需要     | root initialization、bootstrap、初始资料                  | 普通用户 mutation、通用业务写入                        |
| Policy       | 有独立、可复用业务策略时需要      | 纯规则判断、能力/版本/状态 policy                         | Repo 写入、transaction、外部副作用                     |
| Settings     | 有产品/领域 settings 时需要       | settings schema、normalize、default、version              | runtime config、Repo transaction、side effect          |
| Config       | 有 runtime/application 配置时需要 | 本 context 的 Config facade                               | 业务 mutation、跨 context 的无语义配置读取             |
| ErrorCat     | 有 context-specific errors 时应有 | 错误构造器、错误 code owner                               | `{:error, ...}` 包装、业务流程、GraphQL 格式化         |
| Const        | 有封闭领域词汇时需要              | action/type/state 等常量                                  | 无 owner 的全局业务枚举                                |
| Helper       | 有多个纯领域 helper 时需要        | canonicalization、digest、纯格式/算法 helper              | 通用业务 orchestrator、Repo、transaction               |
| Confirmation | Receipt-backed Command 时需要     | typed result codec、encode/decode、operation contract     | 业务写入、外部副作用、完整状态重建                     |

## 5. Commands

### 5.1 Command ownership

用户或系统业务 mutation 必须有明确的 concrete Command：

```text
<context>/commands/<action>.ex
CMS.<Context>.Commands.<Action>
```

Command 负责：

- 一个完整 business action 的入口；
- Gate、Policy、Lifecycle 和版本检查的编排；
- 选择 one-shot 或 Receipt-backed protocol；
- 调用 `Persist`、`Projection` 和 `Effects`；
- 创建 typed Confirmation；
- 返回 `{:ok, confirmation}` 或 `{:error, reason}`。

Command 不负责：

- 直接编写大量 ORM query；
- 自己再调用另一个完整的 Writer business flow；
- 在 Receipt path 内部重新开启 transaction；
- 直接构造 Outbox payload；
- 直接调用 HTTP、邮件、Webhook、异步 task 或对象存储等不可回滚副作用。

### 5.2 One transaction owner

一次 mutation 只能有一个 transaction owner：

```text
Receipt-backed:
  Commands.Action
    -> CMS.Command.execute
       -> Receipt claim
       -> one Repo transaction
          -> Gate / Persist / Projection / Effects intent
          -> Confirmation

One-shot:
  Commands.Action
    -> one Repo transaction
       -> Gate / Persist / Projection / Effects intent
```

`Persist`、`Projection`、`Effects`、`Policy` 和普通 helper 默认加入调用方已有 transaction，
不能自行拥有第二个 transaction。

### 5.3 Confirmation placement and alias

Confirmation 的推荐逻辑 namespace 是：

```text
<context>/commands/confirmation/<action>.ex
CMS.<Context>.Commands.Confirmation.<Action>
```

例如：

```text
interactions/commands/confirmation/upvote.ex
articles/commands/confirmation/publish.ex
comments/commands/confirmation/comment.ex
```

使用方统一 alias 成带有 `Confirmation` 后缀的业务结果名：

```elixir
alias CMS.Interactions.Commands.Confirmation.Upvote,
  as: UpvoteConfirmation

Command.execute(command,
  action: &action/1,
  confirmation: UpvoteConfirmation
)
```

Confirmation module 本身不在名字里重复 `Confirmation`，因为 namespace 已经表达其职责。

现有 Confirmation 如果已经位于 `Reactions` 或 `Commands` 下，不要求为了目录对称立即移动；
该规则冻结新代码路径，旧位置作为迁移状态保留。

## 6. Persist

`Persist` 是 Command 和 ORM/Ecto 之间的 context-specific 薄业务持久化层：

```text
Command
  -> Gate / Lifecycle
  -> Context.Persist
  -> Ecto / Repo / ORM
```

它不是通用 CRUD wrapper，可以包含：

- 当前 context 的 changeset 组装；
- row lock；
- upsert 和 conflict handling；
- 主表与关联表的 row 写入 primitive；
- 数据库层面的并发和唯一性处理。

它不得包含：

- actor authorization；
- command identity 或 workflow identity 生成；
- `Repo.transaction`；
- Activity、Outbox、通知或外部调用；
- 跨 context 的业务 orchestration。

Persist 的方法需要返回标准 tagged tuple。调用方负责决定 transaction、Gate、effects 和最终
Confirmation。

## 7. Effects

Effects 负责主数据写入之后的非主数据副作用和 intent：

```text
Command
  -> Context.Effects
     -> CMS.Outbox / Activity / notification adapter / cache invalidation
```

允许：

- 在当前 transaction 内写入 Outbox intent；
- 记录 Activity 或 audit；
- 记录 metric/achievement intent；
- 发出 cache/search invalidation intent；
- 调用外部 provider adapter，但必须明确它是否可回滚或需要 Outbox/Workflow。

禁止：

- Effects 自己创建 transaction；
- 生成 commandId 或 workflowRef；
- 把主数据 authority 写入 Effects；
- 在 transaction 内直接执行不可回滚的 HTTP、notify、Webhook、对象存储删除等动作；
- 让 Command 直接知道 Outbox worker、event payload 或 effect key。

因此新代码应使用：

```text
Command -> Context.Effects -> CMS.Outbox
```

而不是：

```text
Command -> CMS.Outbox
```

Outbox consumer 在 commit 后负责至少一次投递和消费幂等。Outbox intent 的 identity 必须复用当前
command identity，并使用稳定的 effect key；Effects 不得自己生成第二套 command identity。

## 8. Projection

Projection 是可由 authoritative facts 重新计算的派生读模型，不是每个 context 都需要的通用层。

```text
authoritative facts
  -> Projection
     -> Query
```

Projection 可以负责：

- ReadState bitmap、count、latest-user projection；
- 搜索 projection；
- dashboard/statistics materialization；
- 可重建的 cache 或 persisted read model。

Projection 不得：

- 成为第二套主数据 authority；
- 负责 actor authorization；
- 绕过 Command/Persist 直接改变主数据；
- 把普通 presentation result builder 命名成 Projection。

Projection 如果要求与 authoritative row 同步，可以加入 Command 当前 transaction；如果允许异步，
必须通过 Outbox/Workflow 触发，并拥有自己的幂等和重建合同。

## 9. Query

Query 负责读取：

- persisted facts；
- Projection；
- cache；
- list/search/aggregate；
- FrontDesk 已解析的 canonical resource 的 read composition。

Query 不得：

- 接收或生成 commandId 作为写入身份；
- claim Receipt；
- 调用 Command、Persist、Effects 执行 mutation；
- 在读取时隐式改变主数据或投递副作用。

`ReadState.Query` 是 Query；`ReadState.Sync` 如果更新 bitmap/count/最新用户，则属于 Projection
writer，不属于 Query。

## 10. Workflow and Setup

### 10.1 Workflow

Workflow 只用于具备以下特征的流程：

- 多个步骤；
- 可暂停、重试或恢复；
- 有独立 workflow identity；
- 涉及 provider claim、批次、retention、reconciliation 或 maintenance。

Workflow 必须明确：

- workflowRef/stepRef 的 owner；
- 每一步的状态和幂等键；
- 哪一步拥有 transaction；
- 失败后的 compensation/recovery；
- 是否通过 Outbox 触发异步步骤。

不要让同一个业务动作同时隐式拥有 `CMS.Command` receipt identity 和另一套 workflow receipt identity。
如果两者都需要，必须明确 Command 是用户入口、Workflow 是下层流程，并定义两者的映射。

### 10.2 Setup

Setup 只负责 bootstrap/初始化，例如：

- 创建 root resource；
- 初始化默认 settings；
- 建立初始 projection；
- 重试一次性社区初始化。

Setup 不得成为普通用户 mutation 的通用 Writer，也不得在被 Receipt command 调用时再创建第二个
transaction owner。

## 11. Policy, Settings, Config, ErrorCat and Helper

### 11.1 Policy

`Policy` 是纯业务规则 owner，例如：

- 是否允许某个 operation；
- 状态转换是否满足条件；
- capability/version 是否有效；
- 是否允许某种 settings 组合。

Policy 不写 Repo、不负责 transaction、不发送副作用。需要加载并锁定 canonical resource 时，由 Gate
负责 admission，Policy 只消费 Gate 提供的事实。

### 11.2 Settings and Config

二者都属于 context 根部的可选结构，但语义不同：

```text
settings.ex
  -> 产品/领域 settings schema、normalize、default、版本校验

config.ex
  -> runtime/application configuration facade
```

例如 Wallpaper 的主题 settings 使用 `CMS.Wallpaper.Settings`；runtime 配置使用
`CMS.Wallpaper.Config`。二者都不放在 `Helper` 下。

### 11.3 ErrorCat and Const

有 context-specific business errors 时，context 应拥有自己的 `ErrorCat`。ErrorCat 函数只构造错误值，
不包装 `{:error, ...}`，不执行业务流程。

封闭的 action/type/state 词汇由实际 owner 的 `Const` 持有，不提升到全局 Helper 或无 owner 的
`CMS.Const`。

### 11.4 Helper

`Helper` 是 context-local 的纯领域辅助 namespace，不是通用业务层：

```text
wallpaper/helper/request_digest.ex
CMS.Wallpaper.Helper.RequestDigest
```

适合放：

- canonicalization；
- digest；
- 纯格式转换；
- 不访问 Repo 的算法；
- context-specific codec/helper。

不适合放：

- Repo 写入；
- authorization；
- transaction；
- Outbox/Activity；
- 多步骤业务 orchestration。

## 12. Legacy Writer migration

新代码不得新增 `Writer` 作为业务 owner。

现有 `Writer` 按方法职责迁移：

```text
完整业务动作       -> Commands.Action
主数据 row 写入    -> Persist
Activity/Outbox    -> Effects
多阶段可重试流程   -> Workflow
纯 codec/算法      -> Helper
```

如果一个旧 Writer 同时包含以上多种职责，应拆成多个 owner；不能通过继续扩大 Writer 来保持兼容。

只有在迁移期间保留的内部 delegate、外部协议 callback 或明确注明的 legacy compatibility surface，
才可以暂时继续存在，并需要在迁移文档中记录调用方和删除条件。

## 13. Examples

### 13.1 Interactions

```text
interactions.ex
interactions/
  commands/
    upvote.ex
    emotion.ex
    collect.ex
    report.ex
    confirmation/
      upvote.ex
      emotion.ex
      collect.ex
      report.ex
  query/
    read_state.ex
    reaction_users.ex
    scope.ex
  persist.ex
  projection.ex
  effects.ex
  config.ex
  const.ex
  error_cat.ex
```

`query/read_state.ex` 只负责读取；当前 `ReadState.Sync` 中更新 bitmap、count 和 latest users 的写入
逻辑，在目标结构中归入根级 `projection.ex`（或 `projection/`），不属于 Query。

目标路径：

```text
CMS.Interactions.upvote
  -> Commands.Upvote
     -> CMS.Command
        -> Gate / MutationLock
        -> Persist.change_upvote
        -> Projection.sync_upvote
        -> Effects.upvote_changed
        -> Commands.Confirmation.Upvote
```

Reaction fact 写入不能继续和 ReadState projection、Metric、Achievement、Outbox 全部混在一个
`Reactions.Upvote` 模块中。

### 13.2 Wallpaper

```text
wallpaper.ex
wallpaper/
  commands/
    prepare_upload.ex
    publish.ex
    restore_snapshot.ex
    confirmation/
      publish.ex
      restore_snapshot.ex
  query/
    wallpaper.ex
    history.ex
  persist.ex
  effects.ex
  workflow/
    upload.ex
    retention.ex
  settings.ex
  config.ex
  policy.ex
  helper/
    request_digest.ex
  error_cat.ex
```

目标职责：

- `Commands.PrepareUpload`：校验用户意图并启动上传 workflow；
- `Workflow.Upload`：管理 batch、capability、step 和 retry；
- `Commands.Publish`：完成用户 publish action；
- `Persist`：写入 snapshot、image rows、active pointer 和 publish receipt；
- `Effects`：处理 publish 后的 Outbox、Activity、cache 或 cleanup intent；
- `Workflow.Retention`：处理过期 receipt、snapshot 和 generated asset reconciliation；
- `Helper.RequestDigest`：提供 Upload/Publish 共同使用的 intent canonicalization 和 digest。

`Publisher` 不应长期同时拥有 Command、Persist、Workflow、Receipt 和 transaction 职责。

## 14. Review checklist

新增或审查一个 context 时，至少回答：

1. 对外 facade 是什么？是否只 delegate 和轻量归一化？
2. 每个 mutation 是否有明确的 `Commands.Action`？
3. 是否存在主数据写入？如果存在，owner 是否是 `Persist`？
4. 是否存在 Activity、Outbox、通知、cache 或外部调用？如果存在，owner 是否是 `Effects`？
5. 是否存在派生读模型？如果存在，是否有明确的 `Projection` owner？
6. Query 是否只读？是否混入了 command identity 或副作用？
7. transaction owner 是否唯一？下层是否重复开启 transaction？
8. command identity 和 workflow identity 是否明确且没有混用？
9. Confirmation 是否由 Command/CMS.Command 管理，并 alias 成 `<Action>Confirmation`？
10. Settings、Config、Policy、ErrorCat、Const、Helper 是否放在正确的 context owner 下？
11. 是否新增了模糊的 Writer、Manager、Service 或通用 Helper？
12. 是否有对应的 focused tests、static boundary checks 和文档链接？
