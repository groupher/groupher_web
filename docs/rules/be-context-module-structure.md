# Backend Context Module Structure

> 状态：active（v2，2026-10-11）

Backend 采用“约定大于配置”的 Context 结构。完整设计、角色权限和 lint 原理见
[Backend Context Convention over Configuration](../architecture/backend-context-convention-over-configuration.md)。

## 生效规则

- Context 只能是 `backend/api/lib/groupher_server/` 下登记在
  `backend/api/.context-registry-v2.json` 的一级目录；
- 每个 Context 必须同时存在 `<context>/` 与 `<context>.ex`；单文件是对外唯一 Facade；
- Context 内普通能力目录也必须使用 `foo/ + foo.ex`，其中 `foo.ex` 是仅供本 Context 使用的 internal Facade；
- `commands/`、`model/`、`workflows/` 是集合型 Owner，可以没有同名文件；
- `query/`、`persist/`、`workflow/`、`effects/`、`policy/`、`projection/`、`cache/`、`lifecycle/`、`gate/`、`outbox/`
  是单数 Owner，拆目录时必须保留同名 `.ex`；
- Owner 子树可用无 Facade 的目录整理实现文件；它继承父 Owner role，不形成新调用入口；
- 禁止独立的 `Read`、`Reader`、`Write`、`Writer` 文件、目录和模块段；读取、派生状态、持久化与副作用必须分别进入
  `Query`、`Projection`、`Persist`、`Effects` 等明确 Owner；
- 已退役的 `Interactions.ReadState` / `read_state` 和 `CollectFolders.WriteConfirmation` /
  `write_confirmation` 同时受 legacy 模块段与文件 stem 门禁约束，禁止重建兼容入口；
- Web、Worker 和其他 Context 只能调用目标 Context 根 Facade；普通 struct、type 和 ErrorCat pattern 引用不算行为调用；
- Worker 只允许放在 Jobs Context，并且不能直接访问 Repo、transaction 或 provider；
- Facade 只做稳定 API、轻量适配和转发；一对一机械转发使用 `defdelegate`，基础设施访问下沉到 Owner；
- Facade 必须返回业务值，不能返回内部 module 让调用方继续拼接调用；
- `CMS.Outbox.send/1` 只能由 Effects Owner 调用；`execute/2` 和 `mark_failed/1` 只能由 `CMS.Outbox.Workflow` 调用；
- 持久化 Job 必须使用有限的 `type` + version + 稳定资源 ID；禁止 `Helper.Later`、`Jobs.Later`、`{module, function, args}` 和业务 `kind`；
- 禁止 `import` Context 根 Facade；普通函数必须显式保留 Context 名称，编译期宏按需使用 `require`；
- 不使用 profile、shared facility 分类、逐文件 allowlist 或常规 exception。

## 合法结构

```text
groupher_server/
|-- accounts.ex                         # Context Facade
|-- accounts/
|   |-- profiles.ex                    # internal Facade
|   |-- profiles/
|   |   |-- query.ex                   # Query Owner
|   |   |-- persist.ex                 # Persist Owner
|   |   `-- commands/                  # 集合型 Owner
|   |       `-- update_profile.ex
|   `-- model/                         # 集合型 Owner
|       `-- embeds/                    # Model 内组织目录
|           `-- user_meta.ex
|-- jobs.ex
`-- jobs/
    `-- public_cache_purge.ex          # Worker
```

合法调用：

```elixir
GroupherServer.Accounts.profiles_user(user)
GroupherServer.Accounts.Profiles.user(user)
GroupherServer.CMS.articles_count_published(:post, user)
```

## 非法结构和后果

```text
groupher_server/accounts/               # 缺 accounts.ex
  -> missing_context_facade

groupher_server/accounts/random/foo.ex  # random/ 既不是 Owner，也没有 random.ex
  -> unknown_internal_directory

groupher_server/accounts/query/by_id.ex # query/ 缺 query.ex
  -> missing_owner_facade

groupher_server/cms/worker.ex            # use Oban.Worker，但不在 jobs/
  -> worker_outside_jobs

groupher_server/accounts/profiles/read.ex # 独立 Read owner
  -> forbidden_architecture_name

groupher_server/cms/interactions/read_state/query.ex # 已退役 legacy stem
  -> forbidden_architecture_name
```

非法调用：

```elixir
GroupherServer.CMS.Articles.page(:post, filter)
# -> context_boundary

def get(id), do: Repo.get(User, id)
# Facade 中 -> facade_infrastructure_access
# Worker 中 -> worker_infrastructure_access

def revalidate, do: Accounts.FrontDesk.Revalidate
# Facade 中 -> facade_internal_module_escape

CMS.Outbox.send(attrs) # Command 中
# -> outbox_write_outside_effects

import GroupherServer.CMS
# -> root_context_import
```

所有 Context 当前都是 `strict`。任一 finding 会让 `mix lint.context` 返回非零，继而阻断 `mix lint`、Backend CI 和
Lefthook pre-commit。新增尚未 `git add` 的文件也会被扫描。

## 命令

```bash
cd backend/api
mix lint.context # 本规则的强制验收入口
mix lint         # 聚合入口；还会运行尚有历史基线的全量 Credo
```

`mix lint.context` 固定执行 v2 checker 单元测试和 `--fully-strict` 全量扫描。v1 的
`.context-layout-manifest.json`、逐文件 allowlist checker 和 v1 report-only 迁移入口已经删除。v2 保留
`pnpm report:backend-context-v2` 作为非门禁诊断命令；正式验收、CI 和 pre-commit 始终使用 `--fully-strict`。

本规则以 `mix lint.context` 的零 finding 为通过条件。`mix lint` 会先执行同一强门禁，所以 Context 违规仍会立即阻断；
但它随后运行 `mix credo --strict`，而全仓 Credo 历史基线尚未清零，因此不能把当前 `mix lint` 的整体退出码误写成
本次 Context 迁移的验收结果。Credo 是否成为全仓硬门禁由
[CI Contract Gaps](../architecture/ci-contract-gaps.md) 单独跟踪。

结构 checker 自动执行的是可由源码稳定判断的规则：目录/Facade 配对、跨 Context 行为调用、Facade/Worker
基础设施访问、Worker 位置、Outbox 调用方向、root Facade import、内部 module 泄漏和根 Facade 依赖环。Owner 表中的“Query 不写事实”“Projection
可重建”等语义规则由专用 CMS gate、Credo、测试和 review 共同约束；不能仅凭文件名可靠判断的规则不会伪装成
v2 checker 已自动证明。
