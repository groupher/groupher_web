# Backend Direct Repo Boundary

> 状态：implemented
> 基线日期：2026-10-14
> 迁移基线：96 个 finding，29 个文件
> 当前结果：0 个 finding，0 个文件

本文单独跟踪 `GroupherServer.Credo.Check.NoDirectRepoInBoundaries`，记录迁移前基线、目标边界、实施顺序和最终验收结果。

## 1. 规则目的

该检查不禁止整个后端使用 `Repo`，只保护 transport、public facade 和 Command orchestration：

```text
GraphQL / public facade
  -> Command
  -> Gate admission + canonical resource
  -> Persist / Store
  -> post-commit Effects
```

- transport 不直接查询或写数据库；
- Command 不自行形成第二套资源加载和持久化边界；
- mutation 通过 Gate 获得 canonical resource，并在授权依赖可变事实时保持同一事务；
- Query / FrontDesk 负责读取，Persist / Store 负责写入和锁；
- receipt replay/presentation 通过稳定 public identity 恢复结果，不从 Command 任意拼 Repo 查询。

每个 finding 必须先判断实际 ownership，不能把 `Repo.*` 机械替换成另一层 wrapper。

## 2. 迁移基线

96 个 finding 包含 `alias Repo` 声明和真实调用，因此不等于 96 个独立业务缺陷。

当前 96 个 finding 全部集中在 CMS commands 目录；`groupher_server_web` transport 和受保护的 CMS public facade 当前均为零 finding。本轮债务本质上是 Command orchestration 边界债务，不是 transport 层的现存违规。

| 领域                                       | 文件数 | Finding | 主要问题                                                              |
| ------------------------------------------ | -----: | ------: | --------------------------------------------------------------------- |
| Articles Commands                          |      9 |      31 | resource/community/branch 加载、pin persistence、receipt presentation |
| Assets Commands                            |      4 |      14 | transaction、archive/delete/restore action 与 presentation            |
| Comments Commands                          |      3 |      16 | Article/Community 加载、preload、replay 与 presentation               |
| Community taxonomy/moderation/subscription |      8 |      21 | Support helper 直接加载及恢复结果                                     |
| Community/Application Commands             |      3 |       8 | create/update/cancel/submit 与 receipt lookup                         |
| Docs Commands                              |      2 |       6 | branch community 加载                                                 |
| **总计**                                   | **29** |  **96** |                                                                       |

### 2.1 Articles

- `articles/commands/binding_support.ex`：3
- `articles/commands/comment_lock.ex`：4
- `articles/commands/create.ex`：4
- `articles/commands/moderate.ex`：4
- `articles/commands/pin.ex`：6
- `articles/commands/publish.ex`：1
- `articles/commands/state_change.ex`：4
- `articles/commands/unpin.ex`：2
- `articles/commands/update.ex`：3

优先区分：输入 public ref 解析、Gate transaction 内 canonical reload、pin row persistence、receipt 结果恢复。

### 2.2 Assets

- `assets/commands/archive.ex`：4
- `assets/commands/delete.ex`：4
- `assets/commands/register.ex`：2
- `assets/commands/restore.ex`：4

需要确认 Assets Command 与 Persist 的 transaction owner，以及 provider side effect 是否严格位于 commit 之后。

### 2.3 Comments

- `comments/commands/create.ex`：12
- `comments/commands/solution_change.ex`：2
- `comments/commands/state_change.ex`：2

`Create` 是最大热点，混合了 Article/Community 加载、preload、canonical transaction、receipt replay 和结果 presentation。应先画清 create/reply/replay 三条路径，再移动 Repo 访问。

### 2.4 Communities 与 Docs

- category support：4
- community create/update：3
- moderator support：2
- subscription support：2
- tag set/unset/support：10
- application cancel/submit/support：8
- Docs publish/update branch：6

Support 模块中的查询需要区分正常 command admission 与 receipt presentation；两者不一定使用同一个 Query API。

## 3. 代表性问题

`CMS.Comments.Commands.Create` 当前直接加载 Article：

```elixir
with %Article{thread: ^thread} = article <- Repo.get(Article, article_id),
     {:ok, info} <- CMS.Artiment.Matcher.match_interaction(article) do
  do_create(...)
end
```

该模块当前还为 `%{id: article_id}` 与 `%{article_id: article_id}` 分别维护了几乎相同的 `with` 入口。迁移 Repo 访问前，应先把两种 projection 归一为同一种 Article identity，并收敛到唯一 resolution 路径，再统一处理 thread 校验、interaction 匹配和错误合同；不能把两套重复流程原样搬进新的 Query/FrontDesk API。

迁移前必须回答：

1. transport 是否可以先把 public identity 解析成 Article；
2. root `GroupherServer.FrontDesk` 与内部 `CMS.FrontDesk` 分别负责哪一步；
3. Gate 是否已经在 aggregate lock 内 canonical reload；
4. Command 后续是否只使用 Gate 返回的 canonical resource；
5. replay 是否通过 confirmation identity 恢复，而不是重复原始加载流程；
6. thread mismatch、not found 与权限拒绝是否保持原错误合同。

## 4. 迁移批次

### Phase 1：Support / presentation 小批

先处理纯 receipt result presentation 和 Support helper。目标是建立统一的 public identity -> canonical result API，并避免把写事务一起移动。

### Phase 2：Article / Community resolution

统一 community、branch、article 的解析入口，确保调用方不把 canonical struct 降级为 ID 后再次加载。`Comments.Commands.Create` 应先归一 `%{id: ...}` 与 `%{article_id: ...}` 两种 projection，再通过单一 resolution 路径进入后续流程。

### Phase 3：Persist ownership

处理 pin、archive、restore、delete 等数据库写入，把锁、write 和 transaction 明确收回 Persist/Store，同时保持 Gate admission 与写入的原子性。

### Phase 4：Comments Create / replay

最后处理最大的 Comments 创建路径，分别验证 top-level comment、reply、首次执行、receipt replay 和结果恢复。

`comments/commands/create.ex` 中 `do_create/8`、`replay_created/3`、`replay_article/1` 和 `reply_new_from_canonical/5` 的 preload 统一归入本阶段，不拆到 Phase 1：create/reply 所需的业务加载应由 Query/FrontDesk 或 canonical loading contract 提供；receipt replay 的 Comment presentation 应由基于稳定 identity 的 result projector 提供。Phase 1 只处理独立的 Support/presentation 模块，避免两个阶段交叉修改同一热点 Command。

## 5. 每个 Finding 的判定模板

- 当前 `Repo` 调用是 read、write、lock、transaction 还是 preload；
- 当前模块是否是合法 transaction owner；
- 上游是否已经持有 canonical resource；
- 是否应进入 FrontDesk/Query 或 Persist/Store；
- Gate admission 与写入是否仍在同一事务；
- replay 是否依赖稳定 identity；
- 错误码与 tagged-tuple 返回是否保持；
- 是否存在合理例外，需要收紧 checker scope 而不是逐行 suppression。

## 6. 验收

- `NoDirectRepoInBoundaries` 从 96 降到 0；
- 如确认存在必须保留的合法边界访问，先为检查器设计并测试文件级或符号级的窄排除机制，再登记例外；当前检查器尚未读取 exclude 配置，不能把未实现的排除路径作为现有验收条件；
- Command 不新增 Repo alias/call；
- Gate 返回的 canonical resource 被后续写入复用；
- focused Command/Gate/Persist/receipt tests 通过；
- `mix compile --warnings-as-errors`、后端 format、自定义 Credo tests 和完整后端测试通过。
