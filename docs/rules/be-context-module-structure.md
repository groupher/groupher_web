# Backend Context Module Structure

> 状态：current（2026-10-10）
>
> 本文定义 Groupher Backend Context 的通用结构、owner、边界和 review contract。它不复制任何单一领域的完整实现；
> CMS、Accounts、Analysis、Messaging 等 context 只在此基础上选择自己真实需要的 owner。

相关文档：

- [Backend Rules](./be.md)：后端通用实现规则、返回形状、时间和错误协议；
- [CMS Context Module Architecture](../architecture/cms-context-module-architecture.md)：CMS specialization；
- [CMS Context Module Refactor](../migrations/cms-context-module-refactor.md)：CMS 迁移记录；

## 1. 适用边界

本文适用于：

```text
backend/api/lib/groupher_server/<context>
```

这里的 Context 是一组围绕某项业务能力或平台能力的稳定 owner，不是一个 Ecto schema、GraphQL resolver、
Oban worker 或历史 `Writer` 文件。

Transport 和 runtime entrypoint 包括：

- GraphQL resolver；
- HTTP/controller；
- Oban worker；
- CLI、MCP 和内部 job。

它们可以触发 Context，但不自动成为 Context owner。

本文不要求每个 Context 都创建完整目录。职责存在时必须有唯一 owner；职责不存在时不要创建空的
`Commands`、`Persist`、`Effects`、`Lifecycle` 或 `Workflow`。

## 2. 通用业务流

### 2.1 Domain mutation

```text
Transport / Job / internal caller
  -> Context Facade
     -> Commands.<Action>
        -> Gate / Policy
        -> Lifecycle / version
        -> Persist
        -> Effects: in-transaction intent
        -> typed result / Confirmation
  -> commit
     -> Effects: post-commit delivery
     -> Workflow resume when required
```

### 2.2 Read

```text
Context Facade
  -> Query
     -> authoritative facts
     -> Projection
     -> cache / read composition
```

### 2.3 Long-running workflow

```text
Command / maintenance trigger
  -> Workflow start
     -> workflowRef / stepRef
     -> claim / lease / retry
     -> Persist or provider operation
     -> Effects delivery
     -> resume or terminal result
```

## 3. 通用能力与领域实现

### 3.1 Gate：通用 admission 能力

Gate 是通用架构能力，不是 CMS 专属能力。

它负责：

```text
actor + action + resource + context
  -> admission / authorization / scope decision
  -> canonical resource or typed error
```

Gate 可以被 Accounts、CMS 或其他 domain context 使用，但 Gate 不负责：

- 身份认证本身；
- 主数据写入；
- transaction；
- Lifecycle transition；
- Activity、Outbox、通知或外部 provider。

Gate 可以读取 context-specific Policy 和 Lifecycle capability，但状态转换仍由 Lifecycle owner 执行。

当前仓库的 `CMS.Gate` 是 Gate 能力在 CMS 领域的实现，包含 CMS resource、action、scope、Passport 和
Article lock 等细节。通用架构应描述 Gate contract；CMS 文档再描述 `CMS.Gate` 的具体语义。

### 3.2 Command 与 Receipt

Command 是一个完整业务动作的入口：

```text
Context.Commands.<Action>
  -> actor / input / command identity
  -> Gate / Policy / Lifecycle
  -> Persist / Effects
  -> typed result
```

Receipt 是可靠执行协议，不等同于业务 Command：

- Command 说明“执行什么业务动作”；
- Receipt 说明同一个 command identity 如何 claim、finalize、replay 和 recover；
- Receipt-backed mutation 必须有稳定的 Confirmation 或 typed result；
- one-shot 内部动作不应为了形式统一而创建 Receipt。

当前仓库的 `CMS.Command` 是该协议的具体实现；它可以被提炼为通用 Backend execution facility，但
Accounts 等 context 不应依赖 CMS 领域对象来表达自己的业务 Command。

### 3.3 Commands 动作命名

`<context>/commands/` 已经提供了 context 和 `Commands` namespace，因此动作文件和模块默认只保留
动词或动词短语，不重复 context 的资源名：

```text
comments/commands/create.ex  -> CMS.Comments.Commands.Create
comments/commands/delete.ex  -> CMS.Comments.Commands.Delete
assets/commands/register.ex   -> CMS.Assets.Commands.Register
```

不要新增 `create_comment.ex`、`delete_asset.ex` 或 `CreateTag` 这类仅重复当前 context/子 context
名称的动作命名。Facade 的公开函数、GraphQL operation 和 `command operation` 可继续保留资源名，
因为它们属于 transport 或稳定业务 contract，不是 Commands 目录内的模块名。

只有在同一 Commands namespace 中确实需要消除动作目标歧义时才保留名词，例如
`CreateTagGroup`、`PinDoc`、`CreateNode`。Confirmation、codec、support 等非动作模块可以保留
资源名，以表达其具体 result/辅助 contract。

### 3.4 Outbox 与 Effects

Outbox 是通用的可靠 intent/delivery 模式：

```text
Context.Effects
  -> in-transaction intent
  -> Outbox / delivery row
  -> worker or Workflow
  -> external adapter
```

Effects 必须区分：

```text
in-transaction:
  Activity / audit / outbox intent / cache invalidation intent

post-commit:
  provider / HTTP / notification / webhook / object storage / async index
```

当前仓库的 `CMS.Outbox` 是已有实现；通用架构只规定 intent、identity、delivery、retry 和 recovery
边界，不要求所有 context 直接调用 `CMS.Outbox`。

### 3.5 FrontDesk 与资源解析

资源解析是通用的 read/admission support capability：

```text
public ref / path / loaded struct
  -> canonical resource
  -> Query / Gate / Command
```

它负责 canonical loading、public locator 和稳定关系读取，不负责 mutation、authorization decision 或
Receipt claim。

当前仓库的 `CMS.FrontDesk`、`Accounts.FrontDesk` 是不同领域的具体实现；通用文档描述的是
FrontDesk contract，而不是某个 namespace。

### 3.6 Model

Model 是 schema 和 persistence shape owner：

- Ecto schema；
- association；
- embedded data；
- changeset contract；
- database constraint mapping。

Model 不是业务 facade、Gate、Lifecycle 或跨 context orchestration owner。共享 schema namespace 不改变业务
context 的 ownership。

## 4. Owner 职责

| Owner      | 负责                                                       | 不负责                                      |
| ---------- | ---------------------------------------------------------- | ------------------------------------------- |
| Facade     | 稳定 API、轻量归一化、delegate                             | Repo、transaction、Gate、Outbox、provider   |
| Commands   | 一个完整 mutation、actor、identity、编排和结果             | 大量 ORM、第二层 transaction、外部调用      |
| Query      | 当前事实、列表、详情、聚合和 read composition              | 主数据写入、Receipt claim、隐式副作用       |
| Persist    | changeset、row lock、upsert、row primitive                 | Gate、Lifecycle、Receipt、transaction、通知 |
| Gate       | admission、authorization、scope、canonical resource        | authentication、写入、transition、effects   |
| Lifecycle  | 状态、版本、transition metadata、blocker、capability       | actor admission、主流程编排、外部调用       |
| Projection | 从 authoritative facts 重建派生数据                        | 第二主数据 authority、授权、用户 mutation   |
| Effects    | intent、Activity、Outbox、cache、通知和 delivery           | 主数据 authority、user identity 生成        |
| Workflow   | 多阶段、lease、retry、recovery、maintenance、provider step | 伪装成用户 Command、重复 Receipt            |
| Policy     | 纯规则判断                                                 | Repo、transaction、外部调用                 |
| Adapter    | 外部协议转换、错误归一化                                   | 领域授权、主流程和主数据 orchestration      |
| Model      | schema、association、changeset                             | 业务流程和 public facade                    |

## 5. Context Profiles

### 5.1 Domain Context

适用于有明确用户或系统 mutation 的能力：

```text
Facade
  -> Commands
  -> Gate / Policy
  -> Lifecycle when state exists
  -> Persist
  -> Effects
  -> Workflow when recovery or multiple stages exists
  -> Query / Projection
```

不需要的 owner 不创建。例如一个简单的 set-style mutation 可以没有 Lifecycle 或 Workflow。

### 5.2 Projection / Analytics Context

适用于事实聚合、趋势、统计和可重建读模型：

```text
Fact Persist
  -> bounded Workflow
  -> Projection writer
  -> Query
```

通常不需要用户 Commands、Receipt 或 Lifecycle。

### 5.3 Delivery / Effects Context

适用于通知、缓存、Webhook 和 provider delivery：

```text
Intent Persist
  -> Effects / Delivery Workflow
  -> lease / retry
  -> Adapter
```

通常不需要用户 Commands 或 Lifecycle，但必须有清晰的 delivery identity 和 recovery contract。

### 5.4 Technical Boundary

适用于认证、actor 分类、任务运行时、协议和缓存：

```text
Contract / Classifier / Cache / Adapter
  -> typed result
```

不应为了目录对称性创建 Commands、Persist、Effects 或 Lifecycle。

## 6. 当前仓库映射

### 6.1 Accounts

Accounts 应按子 context 理解：

```text
Accounts.Profiles
  -> profile / OAuth / browser session / subscription

Accounts.CollectFolders
  -> folder / article membership / collect metadata

Accounts.Fans
  -> follower / following relationship / viewer state

Accounts.Mailbox
  -> unread counters / mailbox projection / cache sync

Accounts.Publish
  -> user-owned published read model

Accounts.Achievements
  -> achievement rules and projection
```

建议：

- `Profiles` 使用 Commands、Query、Persist、Effects，并为 OAuth 等多阶段流程增加 Workflow；
- `CollectFolders` 将现有 Write 拆成 Commands、Persist、Effects；
- `Fans` 将 relationship row、counter、achievement 和 event 拆成 Persist/Effects；
- `Mailbox` 以 Query、Projection、Workflow 为主；
- `Publish` 主要保留 Query，写操作移入明确的 Accounts owner；
- 不建立一个覆盖全部 Accounts 子域的总 `Accounts.Lifecycle`。

### 6.2 Analysis

Analysis 是 Projection / Analytics Context：

```text
Analysis.MetricEvent
  -> fact Persist

Analysis.Aggregator
  -> bounded Workflow + Projection writer

Analysis.Maintenance
  -> retention Workflow

Analysis.ArticleInsights
  -> Query

Analysis.Web
  -> Query + provider Adapter
```

它通常不需要用户 Commands、Receipt 或 Lifecycle。

### 6.3 Messaging

Messaging 是 Delivery / Inbox Context：

```text
Mentions / Notifications
  -> message Persist
Notify
  -> Effects dispatch
Inbox
  -> Query + read-state mutation
delivery jobs
  -> Workflow / retry / recovery
```

通知 row 写入、投递、重试和 inbox 读取应分开，不让单个 notification module 拥有全部职责。

### 6.4 PublicCache

PublicCache 是共享 Effects / Delivery Infrastructure：

```text
PublicCache intent
  -> invalidation Persist
  -> delivery Workflow: claim / lease / retry
  -> CDN Adapter
```

它不需要用户 Commands 或 Lifecycle。

### 6.5 Activity

Activity 是共享 append-only fact sink：

```text
Context.Effects
  -> Activity.log
  -> append-only fact
  -> Activity.Query / resource view
```

Activity 不拥有业务状态、业务授权或业务 mutation。

### 6.6 Jobs、Auth、RequestActor、ServiceAuth

这些属于 Technical Boundary：

| 模块           | 主要 owner                           |
| -------------- | ------------------------------------ |
| `Jobs`         | worker、codec、enqueue adapter       |
| `Auth`         | contract、credential adapter         |
| `RequestActor` | evidence、classifier、classification |
| `ServiceAuth`  | client、cache、provider adapter      |

它们可以被业务 context 使用，但不应变成第二套业务入口。

## 7. Cross-context 规则

1. 一个 context 不能直接修改另一个 context 的主数据。
2. 跨 context 写入必须通过对方的公开 Command、Persist primitive 或明确 Workflow contract。
3. Gate 可以作为共享 admission contract，但具体 Policy、resource 和 Lifecycle capability 由领域 context 提供。
4. Resolver 只调用 public facade 或 concrete Command，不直接调用 Repo、Model、Persist 或 provider。
5. Worker 只恢复 Workflow 或 Effects delivery，不重新创建 user command identity。
6. Activity、Messaging、PublicCache 等共享设施不向 Commands 暴露 provider 和 payload 细节。
7. Model 可以共享 schema，但不能成为跨 context business facade。
8. 业务层函数统一返回 `{:ok, value}` 或 `{:error, reason}`；协议和框架要求的例外必须明确。
9. Context 之间的依赖方向应保持为：

```text
Transport
  -> Context Facade / Commands
     -> shared admission / execution facilities
     -> context owner modules
        -> Model / Adapter
```

## 8. 迁移与验收

迁移顺序：

1. 先按 Domain、Projection、Delivery、Technical Boundary 给现有目录分类；
2. 盘点 facade、caller、Repo transaction、外部调用和旧 `Writer`/ `Manager`/ `Service`；
3. 建立 report-only static inventory；
4. 一次迁移一个完整业务动作的 transaction owner、result contract 和 focused tests；
5. caller 切换完成后删除旧入口，不保留长期兼容 wrapper；
6. 将已完成类别提升为 strict gate。

建议优先级：

```text
P0  通用规则、Gate contract 和 static inventory
P1  Accounts.CollectFolders / Accounts.Fans
P2  Accounts.Profiles / Accounts.Mailbox
P3  PublicCache / Messaging delivery
P4  Analysis Projection / Workflow
P5  Activity、Jobs、Auth、RequestActor、ServiceAuth 的 contract/exemption 收口
```

### Context acceptance

一个 Context 或子 Context 满足以下条件后，才能标记为 acceptance：

- public facade 不直接访问 Repo、Model、transaction、Outbox 或 provider；
- 每个公开 mutation 有明确的 Command 或 Workflow owner；
- Gate、Lifecycle、Persist、Effects、Projection 和 Workflow 的职责没有重叠；
- Persist 不创建 transaction、不执行 authorization、不发送不可回滚副作用；
- Query 不修改 authoritative facts；
- Projection 可以从 authoritative facts 重建；
- Effects 区分 in-transaction intent 和 post-commit delivery；
- Workflow 具备 identity、lease、retry 和 recovery contract；
- worker 不重新进入用户 Command；
- actor、identity、typed result 和 tagged tuple contract 有测试覆盖；
- focused tests、static checks、format 和 documentation checks 通过。

“目录齐全”不是完成标准；唯一 owner、清晰依赖、可靠 transaction 和可恢复副作用才是完成标准。
