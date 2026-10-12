# CMS Context Module Refactor

> 状态：已完成（第二轮收口，2026-10-10）
>
> 后续说明（2026-10-11）：本文是 CMS 内部 ownership 的迁移记录。其“shared infrastructure”“不移入
> context”等措辞已由 Context v2 统一为“CMS Context 内部平台能力”；跨 Context 调用必须经过
> `GroupherServer.CMS` 根 Facade。现行结构以
> [Backend Context Convention over Configuration](../architecture/backend-context-convention-over-configuration.md) 为准。
>
> 范围：按照 [CMS Context Module Architecture](../architecture/cms-context-module-architecture.md) 和
> [Backend Context Module Structure](../rules/be-context-module-structure.md)
> 重新梳理 CMS backend context 的 Commands、Query、Persist、Effects、Workflow、Lifecycle、Projection
> 与共享基础设施边界。本文件记录重构范围、目标结构、迁移顺序和验收条件；代码变更按 P0/P1/P2/P3
> 分批落地。第二轮已补齐遗漏的 Command/Persist/Effects 边界、旧命名清理、strict 静态门禁和 focused verification。

相关文档：

- [CMS Context Module Architecture](../architecture/cms-context-module-architecture.md)：context 的目标结构、模块关系和 ownership；
- [Backend Context Module Structure](../rules/be-context-module-structure.md)：通用 context 结构、依赖和副作用规则；
- [CMS Command Phase 5](./cms-command-phase-5-legacy-workflows.md)：Legacy mutation 的分类和已完成批次；
- [CMS Assets Refactor](./cms-assets-refactor.md)：Assets 独立重构和 workflow recovery 记录；
- [CMS DocTree / ContentImport Refactor](./cms-doctree-refactor.md)：DocTree 与 ContentImport 的现状和剩余计划；
- [CMS Command、Gate、Lifecycle 与 Persist 边界](./cms-command-gate-lifecycle-persist-boundary.md)：首批写入边界和事务所有权。

## 1. 重构目标

本轮目标不是给所有 context 机械补齐目录，而是让每个已经存在的业务能力都有唯一 owner，并且满足：

1. 用户可调用的持久化业务动作进入 `Commands.<Action>`；
2. 主数据写入由 `Persist` 或明确的 workflow persistence primitive 负责；
3. 状态转换由 `Lifecycle` 负责；
4. Activity、Outbox、缓存失效、通知和 dashboard mirror 由 `Effects` 负责；
5. 长任务、外部 provider、重试、lease 和恢复流程由 `Workflow` 负责；
6. 当前读取属于 `Query`，派生读模型和状态同步属于 `Projection`；
7. 一个业务动作只有一个 transaction owner；
8. `CMS.Gate`、`CMS.Command`、`CMS.Outbox`、`CMS.FrontDesk`、`CMS.Model` 等共享设施不复制到各 context 内。

目录是否存在不是目标本身。只有确实存在对应职责时才建立目录，但功能隔离是强制的，不能因为目录较少
而把写入、状态转换和副作用重新塞回一个 `Writer` 或一个超大 facade。

## 2. 当前基线

### 2.1 已有基础设施

以下模块已经是 CMS 共享基础设施或 aggregate seam，不应归入任何单一 context 的骨架：

| 模块                        | owner                     | 本轮要求                                                                            |
| --------------------------- | ------------------------- | ----------------------------------------------------------------------------------- |
| `CMS.Gate`                  | CMS shared infrastructure | 负责 admission、scope、access 和 canonical resource；不负责业务写入。               |
| `CMS.Command`               | CMS shared infrastructure | 负责 command identity、Receipt、Confirmation encode/decode 和恢复；不负责领域规则。 |
| `CMS.Outbox`                | CMS shared infrastructure | 负责 intent 持久化和投递基础设施；不成为业务 Command。                              |
| `CMS.FrontDesk`             | CMS shared read facade    | 负责公开资源读取和 locator 解析；不负责写入和幂等判断。                             |
| `CMS.Model`                 | shared schema namespace   | 保存 Ecto schema；业务写入由对应 Persist 或 Workflow 负责。                         |
| `CMS.Articles.MutationLock` | Article aggregate seam    | 只负责文章 aggregate 的确定性锁 identity 和获取顺序。                               |

各 context 的 `lifecycle.ex` 则属于 context 或 aggregate owner，不能和 `CMS.Gate` 混为一层。

### 2.2 迁移状态分类

| 状态         | 含义                                                           |
| ------------ | -------------------------------------------------------------- |
| `debt`       | 仍存在明确的业务边界或事务所有权问题，需要重构。               |
| `alignment`  | 主要能力已经存在，需按新 rule 清理命名、调用路径和副作用边界。 |
| `acceptance` | 核心重构已完成，当前可能仍有 recovery、边界约束和旧入口清理。  |
| `deferred`   | 已有独立计划，但尚未完成 caller migration 或物理收口。         |

Assets、Articles、Comments、Communities、CommunityApplications、Interactions、Wallpaper、DocTree 和
ContentImport 均已达到 `acceptance`。当前仓库中本文件范围内的旧 Writer、Publisher、Transitions 物理入口已删除，
caller 已切换到 Persist、Effects、Workflow、Lifecycle 或 Projection owner。

## 3. 公共边界重构

### 3.1 Gate、Lifecycle 与 MutationLock

需要建立统一的调用约束：

```text
Commands.X.execute
  -> Gate admission / canonical resource
  -> Lifecycle / version / transition
  -> Persist
  -> Effects intent
  -> Confirmation or canonical result
```

`MutationLock` 只提供 aggregate lock seam；它不能加载资源、执行授权、改变状态或写入数据库。

已完成事项：

- 补齐 Articles、Comments、Communities、CommunityApplications 和 DocTree 的 lifecycle owner；
- 将 Command、Resolver、Workflow 的调用路径统一到 context owner；
- 保留 `Articles.MutationLock` 作为文章 aggregate 的锁边界；
- 删除 facade、Writer、Job 中的旧入口和隐式边界；
- 保证 workflow transaction helper 能复用外层 transaction。

### 3.2 Commands、Confirmation 与 transaction owner

每个公开 mutation 需要回答以下问题：

| 问题               | 要求                                                       |
| ------------------ | ---------------------------------------------------------- |
| 谁是业务 owner     | `Commands.<Action>.execute`。                              |
| 谁接收 actor       | Command，而不是 Resolver 或 Persist。                      |
| 谁生成 identity    | `CMS.Command` 或明确的 Workflow identity owner。           |
| 谁开启 transaction | 一个且只有一个 Command/Workflow owner。                    |
| 谁保存主数据       | Persist 或该 Workflow 的 persistence primitive。           |
| 谁产生副作用       | Effects 的 in-transaction intent 或 post-commit delivery。 |
| 谁返回稳定结果     | typed Confirmation 或明确的 typed result contract。        |

需要逐个动作标记为 one-shot 或 Receipt-backed：用户可见、可重试的幂等 mutation 默认使用 Receipt-backed；
纯内部、幂等性由外层保证的动作才使用 one-shot。

### 3.3 Persist、Effects 与 Outbox

`Persist` 只处理当前 transaction 中可回滚的主数据写入；不调用 Gate、Lifecycle、Receipt、Activity 或
Outbox，也不创建第二层 transaction。

`Effects` 必须区分两个阶段：

```text
in-transaction:
  记录 Activity / Outbox intent / mirror intent

post-commit:
  delivery、通知、缓存失效、外部 provider、异步索引和其他不可回滚动作
```

已完成事项：

- 清理 Command、Mutation 和旧 Writer 中直接调用 `CMS.Outbox.send` 的路径；
- 将 Activity、通知、缓存和 dashboard mirror 按 context 收口到 Effects；
- 保持 Outbox worker 只执行 Effects delivery 或恢复 Workflow；
- 保持 worker 不重新进入用户 Command；
- 保持外部 provider 调用位于 post-commit、Outbox 或 Workflow 边界。

### 3.4 Model schema

`backend/api/lib/groupher_server/cms/model/` 是共享 schema namespace。无需为每个 context 复制 schema，
也不应让 schema module 充当业务 facade。

本轮收口：

- schema changeset 继续只负责数据结构和 changeset contract，不承载业务授权、状态转换或副作用；
- 业务写入 owner 已收口到各 context 的 Persist 或明确的 Workflow persistence primitive；
- `cms/model/` 继续作为共享 Model/schema namespace，本轮不做 schema 物理搬迁。

## 4. Context 重构清单

### 4.1 Articles — `acceptance`

目标结构：

```text
Articles.Commands
Articles.Query
Articles.Persist
Articles.Effects
Articles.Lifecycle
Articles.Workflow
Articles.MutationLock
Articles.Commands.Confirmation
```

重构内容：

- 已将旧 `Writer` 的主数据写入迁移到 `Persist`；
- 已将 publish、binding、moderation、revision 等动作接入 Commands；
- 已将 Activity、Outbox、通知和索引副作用归入 Effects；
- 已将发布、版本恢复和外部同步等长流程归入 Workflow；
- 已由 Lifecycle 统一文章状态和版本转换；
- 保持 `Articles.MutationLock` 作为文章 aggregate 的锁边界，不承担授权和写入；
- 已统一 Article Commands 的 Confirmation、Receipt 和 replay 行为。

### 4.2 Comments — `acceptance`

目标结构：

```text
Comments.Commands
Comments.Query
Comments.Persist
Comments.Effects
Comments.Lifecycle
Comments.Commands.Confirmation
```

重构内容：

- 已删除 `Comments.Writer` 和 `Comments.Workflow` 业务入口；create/reply 分别由 `Commands.Create` 与 `Commands.Reply` 持有；
- 评论主表、回复关联、嵌入 projection 和 question flag 等 row primitive 归 `Comments.Persist`；
- 生命周期状态转换归 `Comments.Lifecycle`，moderation 状态归 `Comments.Moderation`；
- Activity、Outbox、通知归 Effects；
- 批量 question flag 更新继续归 `Comments.Persist`，其他批处理或恢复动作归对应的 Command、Lifecycle 或 maintenance owner；Comments 不再保留泛化的 Workflow 入口；
- Comment Command 中不再直接发送 Outbox。

### 4.3 Communities — `acceptance`

Categories、Tags、Subscriptions 和 Moderators 已经存在较多 Commands 化能力，当前重点是统一边界，而不是
重写所有模块。

已完成事项：

- 已审计根级 API 与 `Commands.<Action>` 的调用关系并移除旧入口；
- Tags 等模块的 Outbox intent 已迁移到 Effects；
- 社区创建、setup、过期和状态转换已有明确 Lifecycle/Workflow owner；
- 社区 Command 的 transaction owner 已收口；
- `Communities.Persist` 只处理 Communities 主数据。

### 4.4 CommunityApplications — `acceptance`

目标结构：

```text
CommunityApplications.Commands
CommunityApplications.Query
CommunityApplications.Persist
CommunityApplications.Effects
CommunityApplications.Lifecycle
CommunityApplications.Workflow
CommunityApplications.Commands.Confirmation
```

重构内容：

- `Submit`、`Cancel`、`Review`、`RetrySetup` 等用户入口由 Commands 持有完整动作；
- 已将旧 `Writer.submit` 等主数据写入迁移到 `Persist`；Lifecycle 的 application/event row primitive 也统一经过 `Persist`；
- `Workflow` 只保留可重试的 expiry maintenance；创建社区、retry setup 等长流程由各自 workflow/Command owner 持有；
- 已将审核状态变化收口到 Lifecycle；
- 已去除 Command 内的旧嵌套 `Repo.transaction` owner，复用 shared Command/Gate transaction；
- Job 只恢复 Workflow，不重新伪装成用户 Command；
- 已明确 application identity、community setup identity 和 Receipt identity 的关系。

### 4.5 Interactions — `acceptance`

Interactions 是核心 context，需要按 Commands 模式进行完整梳理。

目标结构：

```text
Interactions.Commands
Interactions.Query
Interactions.Persist
Interactions.Effects
Interactions.Projection
Interactions.Commands.Confirmation
```

重构内容：

- Upvote、Emotion、Collect、Report 等用户动作已由 Commands 持有；
- reaction fact、collect、report 主数据写入已由真实 `Interactions.Persist` 持有；
- `Interactions.Projection` 已完整替代 `ReadState`；读取实现位于 `Projection.Query`，同步实现位于
  `Projection.Sync`，不保留旧 module/path/alias；
- Metric、Achievement、Activity、Outbox 和通知已归 Effects；
- 跨文章加锁继续使用 `Articles.MutationLock`；
- 已拆分 action 模块中混合的 Gate、Repo、Projection、Metric 和 Outbox 逻辑；
- 已为每个动作确定 one-shot 或 Receipt-backed 及对应 Confirmation；原仅包装 transaction 的 Interactions 模块已改为语义明确的 `Interactions.Transaction`。

### 4.6 Wallpaper — `acceptance`

目标结构：

```text
Wallpaper.Commands
Wallpaper.Query
Wallpaper.Persist
Wallpaper.Effects
Wallpaper.Workflow
Wallpaper.Settings
Wallpaper.Config
Wallpaper.Helper
Wallpaper.Policy
Wallpaper.ErrorCat
```

重构内容：

- 已将旧 Publisher 中的主数据写入迁移到真实 `Persist`；
- `Commands.Publish` / `Commands.RestoreSnapshot` 是用户入口，Gate、CMS.Command Receipt 和 Confirmation 在 Command；Assets capability、跨阶段发布和 retention 由 Workflow 负责；
- 已将 Asset 删除、缓存失效和通知归 Effects；
- 将 `RequestDigest` 放入 `Wallpaper.Helper.RequestDigest` 这类领域 helper；
- 已明确 Wallpaper domain recovery record 与通用 `CMS.Command` Receipt 的边界；
- transaction 内不直接调用外部 provider。

### 4.7 Assets — `acceptance`

Assets 已在独立批次中完成主要重构，不应重新当作未开始 TODO。目标结构为：

```text
Assets.Commands
Assets.Query
Assets.Persist
Assets.Effects
Assets.Refs
Assets.Upload
Assets.Provider
Assets.Replacement
Assets.Maintenance
Assets.Workflow
```

当前需要验收和收口：

- 用户资产行 mutation 是否始终经过 Commands -> Persist；
- provider-delete intent 是否统一经过 `Assets.Effects`，而不是由 Command、Provider 或 Maintenance 直接调用 `CMS.Outbox`；
- Outbox consumer 是否通过 `Assets.Effects` 的 delivery owner 调用 provider adapter；
- Upload、cleanup、reconciliation 和 replacement 是否具有稳定 workflow/run/step identity；
- provider 调用是否只发生在 post-commit；
- 是否覆盖 worker crash、lease 过期、重试、response loss、重复 apply 和 partial success；
- Outbox consumer 是否调用 Effects delivery，而不是重新进入用户 Command；
- 旧 Writer 或兼容入口是否仍有调用者；
- 当前工作区已有 Assets 相关修改，验收基于现有实现继续，不重开目录设计；本批次已完成 `Assets.Effects` intent/delivery 收口。

### 4.8 DocTree — `acceptance`

目标结构：

```text
DocTree.Commands
DocTree.Query
DocTree.Persist
DocTree.Effects
DocTree.Lifecycle
DocTree.Projection
DocTree.Workflows
DocTree.Commands.Confirmation
```

`DocTree.Workflows` 使用复数是有意的：DocTree 同时拥有 `TreeMutation`、`ContentImport` 等多个独立
workflow family，实际目录和 module namespace 均使用 `workflows/`、`CMS.DocTree.Workflows.*`。单一
workflow owner 仍使用 `workflow.ex` 或 `workflow/`。

已完成迁移的公开动作包括：

```text
create_tab / create_group / create_page / create_link / pin
update / delete / duplicate / move / restore / publish
```

重构内容：

- 所有公开 mutation 已要求 actor 和非空 command id；
- 已统一经过 DocTree Commands、Gate、Persist、Effects/Workflow 和 Confirmation；
- 树 revision、branch lock 和生命周期状态已有唯一 owner；
- 已删除没有 actor/command identity 的旧 convenience arity；
- caller 已迁移并删除旧 `Writer`、旧 writer_impl 和 direct path；
- Preview/planning 保持 Query/纯 planning，不创建 Job 或 Receipt；
- DocCover 保持独立，不并入 DocTree；
- 已覆盖 replay、response loss、revision conflict、lock conflict、publish、restore 和 move recovery。

### 4.9 ContentImport — `acceptance`

ContentImport 应作为 DocTree 下的 Workflow，而不是一组用户 Commands：

```text
DocTree.Workflows.ContentImport
```

ContentImport 沿用 DocTree 的复数 workflow namespace；它是一个 workflow family，不是用户 Command 的
Confirmation 或第二套 Command 入口。

重构内容：

- 已保留 Job-only start contract；
- 已持久化 staging、dataset intent、source-target intent；
- apply 阶段由一个 Workflow transaction owner 管理；
- 一个 transaction 内完成 Job lock、intent revalidation、trash restore、Docs Draft、DocTree.Import、
  ImportSourceMapping、staging cleanup 和 Job result；
- 处理 retry、response loss、duplicate staging 和 target conflict；
- Worker 只恢复 ContentImport Workflow，不调用 DocTree 用户 Command；
- focused recovery tests 已通过。

### 4.10 Docs、DocCover、Kanban、Press 与 Dashboard — `acceptance`

这些 context 不需要统一成同样的目录树，本轮已完成按新 rule 的边界复核：

- `Docs`：editor、branch version、store、publish 的 Commands、Persist 和 Lifecycle owner 已明确；
- `DocCover`：保持独立，Commands、Query、Persist、Effects 和 Confirmation 边界已明确；
- `Kanban`：Commands、Query、Persist 边界已明确，没有 Writer 回流为业务入口；
- `Press`：保留 Config、Projection、Invalidation 等特殊能力，并明确 transaction owner；
- `Dashboard`：mirror、统计和缓存更新归 Effects；
- `SearchArtiments`、`Snapshot`、`ViewTracker`：按 Query、Projection 或 Workflow 基础设施定位。

## 5. 迁移顺序

### P0：公共边界和静态约束

1. 盘点 Gate、Lifecycle、MutationLock 的真实调用者；
2. 盘点所有 Writer、直接 `Repo.transaction` 和直接 `CMS.Outbox` 调用；
3. 确定每个公开 mutation 的 Command、identity、transaction owner 和 result contract；
4. 增加静态检查：Command 不直接发送 Outbox、Worker 不调用用户 Command、Persist 不开启 transaction；
5. 保持 `CMS.Model` schema 物理位置稳定，只收口业务写入 owner。

当前已落地：`scripts/check-cms-context-module-boundary.mjs` 同时提供 report 和 strict 两种模式，覆盖空 Persist、Persist
反向委托 Workflow、Persist 自建 transaction、Reaction 直接 row write、Workflow 冒充用户 Command、Command/Writer/Mutation
直发 Outbox、Command 直接调用 Writer，以及 Job 回流用户 Command。strict 检查已加入 `docs:check`。
各 context 完成 caller migration 后，旧入口已直接物理删除，没有增加兼容 wrapper 延长旧路径生命周期。

当前 strict 结果：`CMS context module boundary report: 0 findings`。Assets、Interactions、Comments、Articles、
Communities.Tags、CommunityApplications、DocTree、ContentImport、Wallpaper 和 Press 的 transaction、Effects intent、
旧入口及 worker 调用路径均已收口；Outbox worker 仍只负责共享执行协议和 post-commit delivery。

### P1：核心用户写入 context（已完成）

Interactions、CommunityApplications、Articles、Comments、Communities、Wallpaper 和 Press 均已完成 Persist、Effects、
Workflow/Lifecycle 和 caller 物理收口；公开用户入口由 Commands 持有，Workflow 仅保留长流程、恢复和 maintenance。

本批次完成顺序：

1. Interactions；
2. CommunityApplications；
3. Articles；
4. Comments；
5. Communities；
6. Wallpaper。

顺序依据是副作用密度、事务边界复杂度、跨 context 依赖和用户可见 mutation 数量；所有列出的 context 均已完成。

### P2：Assets 验收收口（已完成）

不重新设计 Assets 已有的 Upload、Provider、Replacement、Maintenance workflow 目录；已补齐真实的
`Assets.Effects` owner，并集中验证：

- durable workflow identity；
- provider post-commit；
- lease/retry/recovery；
- partial success 和 response loss；
- 直接 Outbox 调用清理和旧入口移除；
- Outbox consumer owner；Assets focused tests 已通过。

### P3：DocTree 与 ContentImport（已完成）

resolver、GraphQL、test 和内部 caller 已切换到 `Persist` / `Workflow` owner，旧 facade、Writer 和
`writer_impl` 已物理移除。ContentImport 的 apply/retry/recovery 作为独立 Workflow 边界完成验收，未混入用户
DocTree Command 入口。

## 6. 验收标准

每个 context 完成后，至少需要满足：

- public facade 只委托 Commands、Query 或明确的 Workflow API；
- Command 不直接承担 schema、Outbox 和外部 provider 的全部职责；
- Persist 不开启 transaction，不调用 Gate、Lifecycle、Receipt 或 Effects delivery；
- Effects 的 in-transaction 阶段只记录可回滚 intent；
- 外部 provider、通知、缓存和异步投递发生在 post-commit；
- Outbox worker 不重新进入用户 Command；
- 一个业务动作只有一个 transaction owner；
- actor、command identity、Confirmation 和 Receipt contract 可被测试验证；
- 业务层继续遵守 `{:ok, value}` / `{:error, reason}` 返回规则；
- `git diff --check`、`pnpm docs:check`（包含 strict CMS boundary gate）及对应 context 的 focused tests 通过。

## 7. 非目标

本轮不做以下工作：

- 不为了目录对称性创建空的 `Persist`、`Effects`、`Workflow` 或 `Setup`；
- 不把 `CMS.Gate`、`CMS.Command`、`CMS.Outbox`、`CMS.FrontDesk` 或 `CMS.Model` 移入 context；
- 不把所有内部 Job、callback 或 provider adapter 都改成用户 Command；
- 先完成 caller migration 和 focused tests，再直接切换并物理删除旧入口；不添加兼容 facade、alias 或
  wrapper 来延长旧路径生命周期；
- 不在本文件范围内做 schema 大规模搬迁或数据库结构变更。
