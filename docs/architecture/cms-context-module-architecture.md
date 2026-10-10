# CMS Context Module Architecture

> 状态：current（2026-10-10）
>
> 本文定义 CMS Backend Context 的目标架构、模块关系和 ownership。它回答“系统应该如何组织、为什么
> 这样组织”；具体的强制约束、禁止依赖和 review checklist 见
> [Backend Context Module Structure](../rules/be-context-module-structure.md)。

相关文档：

- [Backend Context Module Structure](../rules/be-context-module-structure.md)：通用的模块结构、owner、事务和副作用规则；
- [CMS Facade 与实现目录收口](./cms-facade-directory.md)：现有 facade、commands 和目录迁移；
- [CMS Query V2](./cms-query-v2.md)：Query、Projection、Store/Facts 与 FrontDesk 读取边界；
- [CMS Command](./cms-command.md)：用户写入、Receipt、Confirmation 和结果恢复；
- [CMS Outbox](./cms-outbox.md)：intent、event identity 和消费边界；
- [CMS Context Module Refactor](../migrations/cms-context-module-refactor.md)：当前 context 的迁移顺序和完成状态。

## 1. 架构目标

CMS Context 以业务能力为边界，而不是以 ORM schema、GraphQL resolver 或历史 Writer 为边界。
每个 context 可以拥有自己的公开 facade、Commands、Query、主数据写入、副作用、状态生命周期和长流程，
但每种职责必须有唯一 owner。

目标是让以下问题可以从目录和模块名直接回答：

- 谁是用户业务动作的入口？
- 谁负责授权和 canonical resource admission？
- 谁负责状态转换和并发版本？
- 谁负责主数据 row mutation？
- 谁负责 Outbox、Activity、通知和缓存副作用？
- 谁负责重试、lease、外部 provider 和恢复？
- 哪些读取是 authoritative facts，哪些读取是可重建 projection？

## 2. 总体调用模型

### 2.1 写入路径

```text
GraphQL / Job / CLI / MCP / domain caller
  -> CMS context facade
     -> Commands.<Action>.execute
        -> Gate / Policy
        -> Lifecycle / version / transition
        -> Persist
        -> Effects: in-transaction intent
        -> typed Confirmation or typed result
  -> commit
     -> Effects: post-commit delivery
     -> Outbox worker / Workflow resume
```

Facade 是稳定的 transport-neutral 业务入口；Command 是完整业务动作的 owner；`CMS.Command` 是按需
使用的可靠执行协议，不等于领域 Command。

### 2.2 读取路径

```text
CMS context facade
  -> Query
     -> Model facts / FrontDesk / Projection / cache
```

`Query` 负责当前读取和结果组合；`Projection` 负责可以从 authoritative facts 重新计算的派生模型；
`FrontDesk` 负责共享的单资源解析和稳定关系读取。

### 2.3 Workflow 路径

```text
Command or maintenance trigger
  -> Workflow start
     -> workflowRef / stepRef
     -> claim / lease / retry
     -> Persist or provider operation
     -> Effects delivery
     -> Workflow resume or terminal result
```

Workflow 是多阶段、可重试、可恢复流程的 owner。Outbox worker 恢复 Workflow 或调用 Effects delivery，
不能重新进入用户侧 Command 的完整流程。

## 3. Context 目标结构

根 facade 通常固定存在：

```text
<context>.ex
```

一个 context 的逻辑结构如下：

```text
<context>.ex                         # public facade

<context>/
  commands/                          # 业务 mutation
    confirmation/                    # typed result / Receipt contract
  query.ex or query/                 # 当前读取
  persist.ex                         # 主数据 row mutation
  effects.ex                         # Activity、Outbox、cache、通知等副作用
  lifecycle.ex or lifecycle/         # 状态和版本转换
  projection.ex or projection/       # 派生读模型
  workflow.ex or workflow/           # 单一 workflow owner
  workflows/                         # 多个独立 workflow family 时允许
  setup.ex or setup/                 # bootstrap / 初始化
  policy.ex                          # 纯业务策略
  settings.ex                        # 产品/领域 settings
  config.ex                          # runtime/application config facade
  error_cat.ex                       # context-specific errors
  const.ex                           # 封闭领域词汇
  helper/                            # 纯领域 helper
```

以上是逻辑结构，不要求每个 context 创建完整目录。单个 owner 可以使用单文件；多个同类 owner 才继续
使用目录。目录的存在由职责决定，职责隔离本身不能省略。

### 3.1 Commands 动作命名

`commands/` 下的动作文件使用动词或动词短语，并默认不重复 context 的资源名：

```text
<context>/commands/create.ex
CMS.<Context>.Commands.Create
```

因此 `Comments.Commands.Create`、`Assets.Commands.Register` 和
`Communities.Tags.Commands.Update` 是默认形态，而不是 `CreateComment`、`RegisterAsset` 或
`UpdateTag`。只有目标名能消除同一 Commands namespace 内的真实歧义时才保留，例如
`CreateTagGroup`、`PinDoc` 和 `CreateNode`。Facade、GraphQL operation、Receipt operation 和
Confirmation 类型不受此文件名约束。

## 4. Ownership

### 4.1 Context 内模块

| 模块         | 架构职责                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------- |
| Facade       | 稳定 public API、轻量参数归一化、delegate 到具体 owner。                                     |
| Commands     | 一个完整用户或系统业务动作的入口和编排。                                                     |
| Query        | 当前事实、列表、详情、聚合和读取组合。                                                       |
| Persist      | 在已有 transaction 中执行主数据 row primitive。                                              |
| Effects      | 记录可回滚 intent，并在 commit 后投递副作用。                                                |
| Lifecycle    | 状态、版本、transition metadata 和 blocker。                                                 |
| Projection   | 从 authoritative facts 生成可重建的派生读模型。                                              |
| Workflow     | 多阶段、可重试、有 lease 或需要恢复的流程。                                                  |
| Setup        | root resource、默认 settings 和一次性 bootstrap。                                            |
| Policy       | 纯能力、版本、状态和组合判断。                                                               |
| Settings     | 产品/领域 settings 的 schema、normalize 和 default。                                         |
| Config       | runtime/application configuration facade。                                                   |
| ErrorCat     | context-specific error code 和错误构造。                                                     |
| Const        | context 拥有的 action/type/state 等封闭词汇。                                                |
| Helper       | 不访问 Repo 的 canonicalization、digest、codec 和算法。                                      |
| Confirmation | `commands/confirmation/<action>.ex` 中的 typed result、encode/decode 和 operation contract。 |

### 4.2 Shared infrastructure

以下模块不属于任何 context 的标准目录，而是 CMS 共享设施或明确的 aggregate seam：

```text
CMS.Gate
CMS.Command
CMS.Outbox
CMS.FrontDesk
CMS.Model
CMS.Articles.MutationLock
```

其架构 ownership 为：

| 模块                        | 拥有的能力                                                                |
| --------------------------- | ------------------------------------------------------------------------- |
| `CMS.Gate`                  | resource admission、canonical reload、aggregate lock 和 access decision。 |
| `CMS.Command`               | command identity、Receipt claim/finalize/recovery 和 Confirmation codec。 |
| `CMS.Outbox`                | intent persistence、event identity 和消费基础设施。                       |
| `CMS.FrontDesk`             | public ref/path resolution、单资源读取和稳定关系加载。                    |
| `CMS.Model`                 | 共享 Ecto schema、association、embedded data 和 changeset contract。      |
| `CMS.Articles.MutationLock` | Article aggregate 的确定性并发锁。                                        |

Context 只能调用这些模块的公开 contract，不得复制第二套 Gate、Receipt、FrontDesk 或 aggregate lock。

`Lifecycle` 不属于 shared infrastructure。它是 context/aggregate 的领域 owner，应保留在对应 context
根目录中。

## 5. 事务与可靠执行

### 5.1 One transaction owner

一个业务动作只能有一个 transaction owner：

```text
Receipt-backed:
  Commands.Action
    -> CMS.Command.execute
       -> one transaction
          -> Gate / Lifecycle / Persist / Effects intent / Confirmation

One-shot:
  Commands.Action
    -> one transaction
       -> Gate / Lifecycle / Persist / Effects intent
```

`Persist`、`Projection`、`Effects`、`Policy` 和普通 Helper 都是下层能力，不应再创建第二个 transaction。

单一 workflow owner 默认使用 `workflow.ex` 或 `workflow/`；多个独立 workflow family 可以使用复数
`workflows/` 和对应的 `CMS.<Context>.Workflows.<Name>` namespace。

### 5.2 Command 与 Workflow

二者解决不同问题：

```text
Commands.Publish       用户或系统要执行什么业务动作
CMS.Command            同一个 commandId 如何 claim、finalize 和恢复结果
Workflow.Upload        多阶段流程如何 claim、retry、lease 和 resume
```

如果一个用户 Command 启动 Workflow，Command 是用户入口，Workflow 是下层流程 owner；两套 identity
之间必须存在显式映射，不能隐式创建两套 Receipt。

### 5.3 Effects 两阶段模型

```text
in-transaction:
  写入 Activity / Outbox / cache invalidation / provider intent

post-commit:
  delivery、HTTP、通知、Webhook、对象存储、外部 provider
```

所有不可回滚动作都属于 post-commit 的 Effects delivery、Outbox worker 或 Workflow step。

## 6. Schema 与派生读模型

CMS schema 统一位于：

```text
cms/model/
CMS.Model.<Schema>
```

Model 是数据结构 owner，不是业务流程 owner。Query、Gate、Projection 和 Workflow 可以读取 Model；
主数据改变必须经过对应 Persist 或明确的 Workflow persistence owner。

Projection 只能拥有可由 authoritative facts 重建的派生数据，例如：

- ReadState bitmap、count 和 latest-user projection；
- 搜索 projection；
- dashboard/statistics materialization；
- 可重建的 cache 或 persisted read model。

Projection 不能成为第二套主数据 authority，也不能代替 Command/Persist 执行授权和写入。

## 7. 典型 context

### 7.1 Interactions

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

`query/read_state.ex` 负责读取；`ReadState.Sync` 负责更新派生状态时属于根级 `projection.ex`，不属于
Query。

Interactions 的事务包装只使用明确命名的 `Interactions.Transaction`；reaction fact、collect 和 report
的主数据 row write 统一由 `Interactions.Persist` 持有。

### 7.2 Wallpaper

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

`RequestDigest` 是 Wallpaper context-specific 的纯 helper。Wallpaper 用户入口必须经过
`Commands.Publish` / `Commands.RestoreSnapshot`；Workflow 只拥有 Assets capability、跨阶段发布、lease、
recovery 和 retention，不同时拥有 Command、Persist、Receipt 和 transaction。

## 8. 文档分层

CMS backend 相关文档分为三层：

```text
Architecture
  定义目标结构、模块关系和 ownership

Rules
  定义必须遵守的依赖、transaction、effect 和命名约束

Migrations
  记录当前代码从现状迁移到目标结构的批次、状态和验收
```

因此：

- 新 context 的设计先参考本文；
- 代码评审和静态检查遵守 [Backend Context Module Structure](../rules/be-context-module-structure.md)；
- 具体重构顺序查看 [CMS Context Module Refactor](../migrations/cms-context-module-refactor.md)。
