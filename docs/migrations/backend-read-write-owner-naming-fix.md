# Backend Read / Write Owner 命名与职责修复

> 状态：proposed
>
> 范围：修复一级业务目录内部含糊的 `Read`、`Reader`、`Write`、`Writer` 边界，拆分
> `Accounts.Profiles.Read`，将 `CMS.Interactions.ReadState` 收敛为 Projection，并补齐架构 lint。
> 本文只冻结目标设计和验收合同；在实施开始前不代表代码已经完成迁移。

相关长期合同：

- [Backend Context 约定优于配置](../architecture/backend-context-convention-over-configuration.md)；
- [Backend Context Module Structure](../rules/be-context-module-structure.md)；
- [Backend Effects 与 Job Contract](../architecture/backend-effects-and-job-contract.md)；
- [CMS Context Module Refactor](./cms-context-module-refactor.md)。

## 1. 问题

`Read`、`Reader`、`Write` 和 `Writer` 只描述技术动作，没有表达业务职责。它们容易把 Query、
Persist、Workflow、Projection 和 Effects 重新装进一个模糊模块，使目录看似规整，依赖方向却不可检查。

当前 v2 layout checker 只能判断“未知目录是否有同名 Facade”。因此以下结构会被当成合法 internal
capability：

```text
accounts/
  read.ex
  read/

cms/comments/
  writer.ex
  writer/
```

这不符合当前 Owner 体系。目录与同名 Facade 配对只能证明边界存在，不能让含糊职责自动变得合法。

## 2. 决策

### 2.1 禁止含糊的独立架构段

在 `backend/api/lib/groupher_server/` 的一级业务目录内，禁止以下独立文件、目录和模块段：

```text
read.ex       read/       .Read
reader.ex     reader/     .Reader
write.ex      write/      .Write
writer.ex     writer/     .Writer
```

它们必须改成能说明所有权的标准 Owner 或具体业务能力：

| 实际职责                       | 目标 Owner   |
| ------------------------------ | ------------ |
| 读取数据库、组装返回值         | `Query`      |
| 单表或同一聚合的写入 primitive | `Persist`    |
| 用户发起的完整业务写动作       | `Commands`   |
| 跨多个步骤、需要恢复的编排     | `Workflow`   |
| 外部投递、缓存失效、异步意图   | `Effects`    |
| 可由事实重建的派生数据         | `Projection` |
| 资源状态转换                   | `Lifecycle`  |

禁令按路径段和模块段精确匹配，不按字符串子串匹配。以下名称不能因为包含 `read` 或 `write` 就被
机械判错：

```text
mark_read.ex
write_confirmation.ex
read_state.ex
```

但“没有命中通用禁令”不等于职责合理。已知含糊模块仍需在本迁移中逐项改名，并由专门的 legacy
禁令防止重新引入。

### 2.2 Query 必须保持只读

Query 可以访问 Repo 并组装业务返回值，但不得：

- 修改数据库；
- 开启业务事务；
- 调用 Effects 或 Outbox；
- 在发现 projection 缺失时顺手回写；
- 把一次请求中的读取、统计写入和缓存失效包装成所谓 `Read`。

合法：

```text
Profiles.Query.profile(ref, viewer)
  -> Repo read
  -> projection read
  -> {:ok, profile}
```

非法：

```text
Profiles.Read.run(user)
  -> Persist.increment_views
  -> Query.project_user
  -> Persist.persist_contributes
  -> Effects.revalidate_user
```

### 2.3 不为旧混合逻辑凭空增加 Workflow

`Workflow` 只用于业务明确要求多个步骤同步成功或整体失败，或者需要持久化恢复进度的场景。不能为了
给旧 `Read` 找新目录，就把原有混合职责整体搬进 `Workflow.Visit`。

Profile 查询、派生数据刷新和访问统计没有“必须一起成功”的产品要求，因此目标是拆开，而不是换一个
容器名称。

## 3. `Accounts.Profiles.Read` 拆分

当前 `Accounts.Profiles.Read.run` 同时增加 view、生成 contributes、持久化 contributes，并触发缓存
revalidation。目标结构为：

```text
accounts/profiles.ex
accounts/profiles/
  query.ex
  persist.ex
  projection.ex
  projection/
    contributions.ex
  effects.ex
  effects/
    record_visit.ex
```

目标职责：

```text
Profiles Facade
  ├─ read_user(...)                   # 委托 Query.profile，返回 Profile，不写库
  ├─ refresh_contributions(...)       # 委托 Projection.Contributions
  └─ record_visit(...)                # 委托 Effects.RecordVisit
```

目标调用关系：

```text
请求 Profile
  -> Accounts 根 Facade
  -> Accounts.profiles_read_user/1,2
  -> Profiles.read_user/1,2
  -> Profiles.Query.profile
  -> 返回 Profile

成功读取后的非阻塞行为
  -> request boundary 生成一次稳定 visit_id
  -> Accounts.profiles_record_visit(profile_id, visit_id)
  -> Profiles.Effects.RecordVisit
  -> durable Outbox / named Job
  -> 更新访问统计
  -> 失效相关缓存

派生数据维护
  -> contribution fact 写入流程
  -> Accounts.profiles_refresh_contributions(user_id, digest)
  -> Profiles.Projection.Contributions
  -> 写入 contributes
```

规则：

- Profile 查询不能因为 view 记录失败而失败；
- Query 不修复缺失的 contributes；
- contributes 若可从事实重建，其写入由 Projection 持有；
- view 记录必须定义幂等 identity，不能依赖 fire-and-forget callback；
- 删除 `Profiles.Read`，不保留兼容 shim；
- `read_user` 只能表示纯读，不能继续用它掩盖 view、projection 写入或缓存失效；
- Web、其他 Context 和 Worker 仍只能通过 Accounts 根 Facade 调用这些能力。

### 3.1 Facade API 合同

本迁移保留现有纯读取口径的 public API 名称：

```text
Accounts.Profiles.read_user/1,2
Accounts.profiles_read_user/1,2
```

迁移完成后，它们只委托 `Profiles.Query.profile`，不得调用 Persist、Projection 或 Effects。长期结构文档中
`profiles_read_user` / `Profiles.read_user` 的合法调用示例继续成立，但其合法性的前提是纯读语义。

访问统计使用独立、显式的 API：

```text
Accounts.Profiles.record_visit(profile_id, visit_id)
Accounts.profiles_record_visit(profile_id, visit_id)
```

`visit_id` 由请求边界为一次 Profile 访问生成，并在 Outbox / Job 重试期间保持稳定；它是执行幂等键，不改变
“每次真实请求产生一次访问事件”的统计口径。GraphQL Profile resolver 必须在成功读取后显式调用该 API，
enqueue 失败可记录监控，但不能把已成功的 Profile 查询改成失败。

因此 Profiles 拆分步骤的迁移范围必须包含：

- `accounts/profiles.ex`；
- `accounts.ex` 根 Facade；
- `groupher_server_web/resolvers/accounts/profiles.ex`；
- `Profiles.Read` 的相关测试和 Profile GraphQL 查询测试。

### 3.2 contributes 触发与一致性合同

`User.contributes` 只有一个写 Owner：`Accounts.Profiles.Projection.Contributions`。不得同时保留
`Profiles.Persist.persist_contributes` 和 `Analysis.Contribution.Persist.update_user_projection` 作为第二写入口。

触发合同如下：

1. 用户 contribution fact 成功写入后，由 `Analysis.Contribution.Workflow` 计算最新 digest；
2. Workflow 通过 Accounts 根 Facade 调用
   `Accounts.profiles_refresh_contributions(user_id, digest)`；
3. `Profiles.Projection.Contributions` 在同一事务中写入 projection，保持当前“事实和用户 projection
   一起成功或失败”的行为；
4. 事务提交后再执行用户缓存 revalidation；
5. Profile visit 不触发 contributes 重建，定时任务也不是 projection 正确性的主触发源。

新用户创建时必须初始化零值 contributes projection。切换前使用一次性、可重跑的 backfill 修复历史
`contributes: nil`；运行时 Query 只消费已持久化 projection，缺失时最多组装零值响应并报告完整性 finding，
不得回写。若未来要把同步 projection 改成 eventual consistency，必须另立迁移并定义 Job identity、重试、
可观测性和允许的陈旧窗口，不能在本次命名迁移中顺带改变行为。

## 4. `CMS.Interactions.ReadState` 收敛为 Projection

Interaction read state 是由 reaction facts 和 durable view events 构建的派生状态，符合 Projection
Owner，而不是一个自定义 `ReadState` Owner。

目标结构：

```text
cms/interactions/
  projection.ex
  projection/
    query.ex
    sync.ex
```

职责：

```text
Interactions.Projection
  ├─ article_state/2：无 IO 地映射已读取的 Article 与 viewer state
  ├─ Query：读取派生 Interaction 状态
  └─ Sync：根据已提交事实更新或重建派生状态
```

迁移要求：

- `ReadState.Query` 迁移到 `Projection.Query`；
- `ReadState.Sync` 迁移到 `Projection.Sync`；
- `ReadState.article_state/2` 迁移到 `Projection.article_state/2`，不下沉到 Query；
- `Interactions` Facade 暴露稳定的 `article_state/2`，CMS 根 Facade 使用
  `interactions_article_state/2`，删除带旧 Owner 名的 `interactions_read_state_article_state/2`；
- 原有 public/root Facade 返回协议保持稳定，调用者不获得 Projection 内部模块；
- 删除 `ReadState` 文件和目录，不保留转发模块；
- Projection 只能维护自己拥有的派生表，不能借此修改 source-of-truth 业务数据。

迁移范围不能只包含 Query 和 Sync，还必须覆盖：

- `cms/interactions.ex` 的 alias、delegate 和 moduledoc；
- `Projection.Query.article_states_for_paths/3` 对 `article_state/2` 的调用；
- `reactions/upvote.ex`、`collect.ex`、`emotion.ex`、`report.ex`；
- `command_result.ex` 和 CMS 根 Facade；
- `default_viewer_state.ex`、Reaction/Emotion model moduledoc；
- `comments/author_relation_state.ex` 中对旧边界的说明；
- ReadState 的单元测试文件、module alias 和断言。

## 5. Comments Write / Writer 清理

任何仍存在于其他 worktree、未完成迁移分支或后续提交中的 `Comments.Write`、`Comments.Writer` 都不得
合入当前结构。目标依赖为：

```text
Comments.Commands.<BusinessAction>
  -> Comments.Workflow       # 仅在确有跨步骤编排时
  -> Comments.Persist        # Comment 数据 primitive
  -> Comments.Effects        # 通知、缓存、Outbox
```

禁止：

```text
Comments.Writer.create(...)
Comments.Write.run(...)
Commands.Create -> Comments.Writer
```

不增加旧模块兼容层；迁移调用者后直接删除旧入口。

## 6. `WriteConfirmation` 命名

`Accounts.CollectFolders.WriteConfirmation` 不执行通用写入；它描述 add/remove collect-folder
membership 的可恢复确认结果。因此目标名为：

```text
Accounts.CollectFolders.MembershipConfirmation
accounts/collect_folders/membership_confirmation.ex
```

Command 仍负责完整 add/remove 用例，Confirmation 只负责编码、恢复和验证稳定结果。它不是 Persist、
Workflow 或 Effects。

不应全局禁止所有 `*_confirmation.ex`，也不应使用 `write_*` 作为新的 Confirmation 名称。Confirmation
必须以它确认的业务对象或动作命名。

## 7. Lint 设计

### 7.1 通用命名门禁

扩展 `check-backend-context-v2.mjs`，扫描已登记的一级业务目录，产生
`forbidden_architecture_name`：

```text
accounts/profiles/read.ex
accounts/profiles/read/
cms/comments/writer.ex
cms/comments/writer/
defmodule ...Profiles.Read
defmodule ...Comments.Writer
```

门禁必须递归进入普通 capability 和 Owner 子树，以下路径也不能绕过：

```text
accounts/profiles/commands/read/
cms/comments/effects/writer.ex
```

只检查完整路径段、文件 stem 和完整 Elixir 模块段。普通函数名 `read/1`、`write/2` 以及业务动作
`mark_read.ex` 不在这条结构门禁的范围内。

### 7.2 已知遗留名称门禁

在迁移完成的同一提交中，legacy 门禁必须同时检查完整模块名或模块前缀，以及精确相对路径、目录和
文件 stem。禁止重新引入：

```text
module exact/prefix:
  Accounts.Profiles.Read
  Accounts.CollectFolders.WriteConfirmation
  CMS.Interactions.ReadState
  CMS.Interactions.ReadState.*
  CMS.Comments.Write
  CMS.Comments.Writer

path/stem:
  accounts/profiles/read.ex
  accounts/collect_folders/write_confirmation.ex
  cms/interactions/read_state.ex
  cms/interactions/read_state/
```

该列表是迁移护栏，不是新的可扩展 allowlist。新问题仍应由通用 Owner、依赖和基础设施访问规则判断。
fixture 必须证明迁移后重新创建 `read_state.ex`、`read_state/` 或 `write_confirmation.ex` 会产生
`forbidden_architecture_name`，不能只测试旧模块声明。

### 7.3 职责门禁

命名检查不能代替职责检查。验收由结构 checker、可稳定判断的专用静态规则、focused tests 和 review
共同完成：

- v2 结构 checker 保证禁止名称、目录/Facade 配对和可静态识别的 Context/Owner 调用方向；
- 专用静态规则检查 Query 不调用 Persist、Effects、Outbox 或已知写 Repo API；
- focused tests 证明 Projection 只写自己拥有的派生数据，Effects 使用稳定 Outbox / Job contract；
- review 验证可重建性、source-of-truth 归属和失败语义。

不能仅凭文件名可靠判断的语义，不得在本文中描述成 `check-backend-context-v2.mjs` 已自动证明。

## 8. 正反例

合法：

```text
accounts/profiles/query.ex
accounts/profiles/projection.ex
accounts/profiles/projection/contributions.ex
accounts/profiles/effects.ex
accounts/profiles/effects/record_visit.ex
cms/interactions/projection.ex
cms/interactions/projection/query.ex
cms/interactions/projection/sync.ex
accounts/collect_folders/membership_confirmation.ex
cms/comments/commands/mark_read.ex
```

非法：

```text
accounts/profiles/read.ex
accounts/profiles/read/
accounts/profiles/commands/read/
accounts/collect_folders/write_confirmation.ex
cms/interactions/read_state.ex
cms/interactions/read_state/
cms/comments/write.ex
cms/comments/writer.ex
cms/comments/writer/
cms/comments/effects/writer.ex
```

创建非法结构后的结果：

```text
pnpm check:backend-context-v2
  -> forbidden_architecture_name
  -> exit 1
  -> docs:check / CI 失败
  -> 不得合并
```

## 9. 实施顺序

1. 先冻结本文件中的 Facade API、visit identity、contributes 触发和一致性合同；
2. 增加通用名称与 legacy module/path/stem 的正反 fixture，暂时把当前待迁移路径作为测试基线；
3. 拆分 `Profiles.Read`，迁移 facade、GraphQL resolver、贡献写入触发和历史 projection backfill；
4. 将 `Interactions.ReadState` 完整迁移为 Projection，并清扫调用、测试和 moduledoc；
5. 将 `WriteConfirmation` 改为 `MembershipConfirmation`，同步迁移 add/remove Commands 和确认结果测试；
6. 核对并删除所有 Comments `Write` / `Writer` 入口；
7. 删除迁移基线，使所有通用和 legacy 门禁 fully strict；
8. 更新长期架构文档，运行完整 backend context、documentation 和相关业务测试。

不保留旧模块 shim，也不通过 exception 让旧名称长期存在。

## 10. 完成标准

- production backend 中不存在独立 `.Read`、`.Reader`、`.Write`、`.Writer` 模块段；
- 不存在对应的 `read/`、`reader/`、`write/`、`writer/` 架构目录；
- `Profiles.Query` 不写库、不触发 Effects；
- `read_user/1,2` 保持纯读，Profile resolver 使用独立的 `record_visit` API；
- contributes 只有 `Profiles.Projection.Contributions` 一个写 Owner，并由 contribution fact 写入触发；
- 新用户零值 projection 和历史 backfill 已完成，Profile Query 不再修复缺失 projection；
- profile visit 由 Effects 使用带稳定 `visit_id` 的异步 contract 记录；
- `Interactions.Projection` 完整替代 `Interactions.ReadState`；
- production/test 源码中不再存在旧 `ReadState` module、path、alias 或 moduledoc 引用；
- CollectFolders 使用业务命名的 `MembershipConfirmation`；
- Comments 不存在 Writer 兼容层；
- lint 正反测试覆盖 Context 根、internal capability、Owner 子树和 compound legacy stem；
- `pnpm check:backend-context-v2`、`pnpm docs:check` 和相关 Elixir 测试全部通过；
- 长期架构文档与最终实现一致，本文状态更新为 `implemented` 并记录验收结果。
