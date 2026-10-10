# Backend Context Module Structure

> 状态：current（2026-10-10）
>
> 本文定义 Groupher Backend Context 的通用结构、owner、边界和 review contract。它不复制任何单一领域的完整实现；
> 各业务和平台 Context 只在此基础上选择自己真实需要的 owner。

相关文档：

- [Backend Rules](./be.md)：后端通用实现规则、返回形状、时间和错误协议；
- [CMS Context Module Architecture](../architecture/cms-context-module-architecture.md)：CMS 的 specialization 示例，
  不改变本文的通用适用范围；
- [CMS Context Module Refactor](../migrations/cms-context-module-refactor.md)：将本文规则应用到一个领域的迁移示例；

## 1. 适用边界

本文适用于：

```text
backend/api/lib/groupher_server/<context>
backend/api/lib/groupher_server/<namespace>/<context>
```

这里的 Context 可以是根 Context，也可以是 namespace 下的子 Context，例如
`accounts/profiles`、`cms/comments` 或 `analysis/article_insights`。Namespace 只是目录和模块的组织层级，
不自动拥有子 Context 的业务职责；`model`、`gate`、`command` 等共享基础设施也不因为位于某个 namespace
下就成为业务 Context。Context 是一组围绕某项业务能力或平台能力的稳定 owner，不是一个 Ecto schema、
GraphQL resolver、Oban worker 或历史 `Writer` 文件。

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

Gate 可以被任何需要 admission 的 domain context 使用，但 Gate 不负责：

- 身份认证本身；
- 主数据写入；
- transaction；
- Lifecycle transition；
- Activity、Outbox、通知或外部 provider。

Gate 可以读取 context-specific Policy 和 Lifecycle 定义的 capability/blocker 状态，但状态转换仍由 Lifecycle
owner 执行。
如果某个 Context 没有 authorization 或 admission 需求，不要为了目录对称性创建空的 Gate。

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

Context 可以使用共享的 execution facility，也可以拥有自己的可靠执行实现；共享 facility 不应携带某个
领域的 resource、Policy 或业务枚举。Receipt-backed action 的具体实现必须在所属 Context 的 contract 中
说明，不应因为其他 Context 使用 Receipt 就强制所有 one-shot action 创建 Receipt。

### 3.3 Commands 动作命名

`<context>/commands/` 已经提供了 context 和 `Commands` namespace，因此动作文件和模块默认只保留
动词或动词短语，不重复 context 的资源名：

```text
<namespace>/<context>/commands/create.ex
  -> <Namespace>.<Context>.Commands.Create

<namespace>/<context>/commands/mark_read.ex
  -> <Namespace>.<Context>.Commands.MarkRead
```

不要新增仅重复当前 Context 或子 Context 名称的动作命名，例如
`<context>/commands/create_<context_resource>.ex`。Facade 的公开函数、transport operation 和
`command operation` 可继续保留资源名，因为它们属于 transport 或稳定业务 contract，不是 Commands 目录内
的模块名。

只有在同一 Commands namespace 同时管理多个不同资源目标、确实需要消除动作目标歧义时才保留目标名，
例如 `CreateArticle` / `CreateComment`；如果 Context 本身就是 Group，则不能使用 `CreateGroup`。
Confirmation、codec、support 等非动作模块可以保留资源名，以表达其具体 result/辅助 contract。

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
  audit / outbox intent / cache invalidation intent

post-commit:
  provider / HTTP / notification / webhook / object storage / async index
```

通用规则只规定 intent、identity、delivery、retry 和 recovery 的边界，不要求所有 Context 使用相同的
Outbox namespace 或拥有完整的 Effects/Delivery 链路。

### 3.5 Resource Resolution / FrontDesk

资源解析是可选的 read/admission support capability。只有存在 public ref、path 或稳定资源 identity 的
Context 才需要它：

```text
public ref / path / loaded struct
  -> canonical resource
  -> Query / Gate / Command
```

它负责 canonical loading、public locator 和稳定关系读取，不负责 mutation、authorization decision 或
Receipt claim。

当前仓库可以使用 `FrontDesk` 作为这类能力的命名，但其他 Context 可以使用等价的
`ResourceResolver` 或领域专属名称；名称不是本文的强制要求。

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

| Owner      | 负责                                                          | 不负责                                               |
| ---------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| Facade     | 稳定 API、轻量归一化、delegate                                | Repo、transaction、Gate、Outbox、provider            |
| Commands   | 一个完整 mutation、编排和结果；需要时处理 actor/identity      | 大量 ORM、第二层 transaction、外部调用               |
| Query      | 当前事实、列表、详情、聚合和 read composition                 | 主数据写入、Receipt claim、隐式副作用                |
| Persist    | changeset、row lock、upsert、row primitive                    | Gate、Lifecycle、Receipt、transaction、通知          |
| Gate       | admission、authorization、scope、canonical resource           | authentication、写入、transition、effects            |
| Lifecycle  | 状态、版本、transition metadata、blocker、capability          | actor admission、主流程编排、外部调用                |
| Projection | 从 authoritative facts 重建派生数据                           | 主数据的第二个权威来源、授权、用户 mutation 的 owner |
| Effects    | intent、Activity、Outbox、cache、通知和 delivery contract     | 主数据 authority、user identity 生成                 |
| Workflow   | 存在长流程时负责多阶段、lease、retry、recovery、provider step | 伪装成用户 Command、重复 Receipt                     |
| Policy     | 纯规则判断                                                    | Repo、transaction、外部调用                          |
| Adapter    | 外部协议转换、错误归一化                                      | 领域授权、主流程和主数据 orchestration               |
| Model      | schema、association、changeset                                | 业务流程和 public facade                             |

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

## 6. 当前仓库示例（非规范）

本节只是帮助 review 当前仓库如何套用前面的 Context Profile，不是所有 Context 的完整清单，也不是新增
Context 时必须复制的目录模板。实际 owner 以代码和对应领域 architecture 为准；CMS 的细节见
[CMS Context Module Architecture](../architecture/cms-context-module-architecture.md)。

### 6.1 Accounts

当前仓库的 Accounts 可以按子 context 理解：

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

当前迁移参考：

- `Profiles` 使用 Commands、Query、Persist、Effects；OAuth 的同步注册和绑定流程由 Commands/Oauth 编排，不额外创建空的 Workflow；
- `CollectFolders` 将现有 Write 拆成 Commands、Persist，并通过 `CMS.Interactions` 的公开 Command/Persist contract
  维护跨 Context 的 collect fact；它没有独立的 Accounts Effects owner；
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
external delivery (when a provider is enabled)
  -> delivery Workflow / retry / recovery
```

`read-state mutation` 是 Inbox 自己维护的内部状态更新，不代表用户业务 Command，也不要求创建用户
Command 或 Receipt。当前 Messaging 只发布稳定的 Notify dispatch boundary 和 inbox/message row
contract，没有外部 delivery provider，因此不创建空的 Messaging Workflow。

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
  -> ArticleLog / CommunityLog resource view
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
2. 跨 context 写入必须通过目标 Context 明确公开的 contract：用户或系统业务动作默认使用公开 Command；
   只有目标 Context 明确发布的 Persist primitive 或 Workflow contract 才允许直接调用。禁止访问目标 Context
   的内部 Persist、Model、Repo 或 private helper。
3. Gate 或等价的 admission facility 可以作为共享 contract，但具体 Policy、resource 和 Lifecycle capability
   由领域 Context 提供；没有 admission 需求的 Context 不需要创建 Gate。
4. 所有 transport adapter（Resolver、HTTP/controller、CLI、MCP 和 job entrypoint）只能调用 public facade、
   公开 Command 或明确 Workflow contract，不直接调用 Repo、Model、内部 Persist 或 provider。
5. Recovery/delivery worker 只能恢复 Workflow 或 Effects delivery。需要发起全新业务动作的 job 可以调用公开
   facade 或 Command，但不能伪造、重用或隐式覆盖原用户的 command identity。
6. Shared infrastructure 不应向业务 Commands 暴露 provider、传输协议和 payload 细节；业务 Context 通过
   typed intent 或稳定 contract 交互。
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

### Context acceptance

一个 Context 或子 Context 满足适用于自身 owner 的条件后，才能标记为 acceptance。不存在的职责不产生
验收项：

- 如果存在 public facade，facade 不直接访问 Repo、Model、transaction、Outbox 或 provider；
- 如果存在 mutation，每个公开 mutation 有明确的 Command 或 Workflow owner；
- 已创建的 Gate、Lifecycle、Persist、Effects、Projection 和 Workflow 之间没有职责重叠；
- 如果存在 Persist，Persist 不创建 transaction、不执行 authorization、不发送不可回滚副作用；
- 如果存在 Query，Query 不修改 authoritative facts；
- 如果存在 Projection，Projection 可以从 authoritative facts 重建；
- 如果存在 Effects，Effects 区分 in-transaction intent 和 post-commit delivery；
- 如果存在 Workflow，Workflow 具备适用的 identity、lease、retry 和 recovery contract；
- recovery/delivery worker 不重新进入用户 Command；
- 适用的 actor、identity、typed result 和 tagged tuple contract 有测试覆盖；
- 每个 owner module 都有 `@moduledoc`，说明存在理由、owner、委托边界和业务位置，并包含 ASCII flow；
- 每个对 Context 外部可调用的 public function 都有相邻的 `@doc` 和基于真实参数的 `## Examples`；有稳定类型边界时同时提供 `@spec`；
- focused tests、static checks、format 和 documentation checks 通过。

“目录齐全”不是完成标准；唯一 owner、清晰依赖、可靠 transaction 和可恢复副作用才是完成标准。
