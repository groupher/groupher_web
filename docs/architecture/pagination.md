# Pagination 与列表读取合同

> 状态：合同已落地；统一执行器、Articles 参考实现、清单内旧分页调用、GraphQL/Core/Community consumer、N+1 严格门禁和
> CollectFolders entry cutover 已完成。本文保留实施决策、例外边界和验收证据。
>
> 本文定义 Groupher 后端统一的 offset/cursor 分页 API、列表 read model、领域 Query 目录、
> GraphQL 契约和 N+1 防护。执行引擎暂定为 Flop；Flop 是内部依赖，不是对外协议。
>
> 本文承接 [CMS Query V2](./cms-query-v2.md) 的 Query/FrontDesk 边界和
> [ORM](./orm.md) 的 `Helper.ORM` 归属，不改变 Gate、Lifecycle、Command 或单资源读取合同。

## 1. 背景

这次改造前，列表读取主要建立在 Scrivener 和 `Helper.ORM.paginator/2` 上，返回 page/size/total 形式的
offset 分页。部分资源自行实现 count、offset、limit、排序、投影和 pinned 合并，形成了几类问题：

- offset 是唯一稳定合同，feed、无限滚动或高频变化列表无法使用 cursor；
- filter、sort 和分页参数散落在 GraphQL、QueryBuilder 与各领域 Query 中；
- 部分列表先取得 path/id，再逐条调用 `FrontDesk.article/1` 或 `Repo.get*`；
- 完整 Detail 模型被复用于列表，读取了不需要的数据和关系；
- pinned entry 混入普通 entries 后，total、page 边界和 cursor 语义不稳定；
- 各资源自行设计目录和返回结构；
- Scrivener、手写分页和未来 Flop 曾经并存，导致迁移容易只替换分页库而不改变读取模型。

已确认的高风险路径包括 Article 普通分页、Kanban、published 列表、用户 upvotes、收藏夹、
trash、评论关联 Article 和 abuse report 格式化。收藏夹路径甚至会先 hydrate 整个集合，再内存分页。

## 2. 目标与非目标

目标：

- 同时支持 offset 与 cursor，共享 filter、sort、scope 和 read model；
- 提供稳定的 Groupher API，隐藏 Flop、Scrivener 和 Ecto 实现；
- 所有可分页领域资源遵循同一 Query 目录骨架，而不是只重构 Articles；
- 列表使用固定、具名的 Lite read model，一页内容由常数次 SQL 得到；
- GraphQL 和前端使用 offset/cursor 两种 API；传入 Dashboard config 时由 `ORM.pagi` 校验请求是否匹配；
- 用静态检查和 SQL 数量测试阻止新的 N+1；
- 最终移除 Scrivener，不保留双实现或兼容 wrapper。

非目标：

- `Helper.ORM.Pagi` 不理解 Article、Community、Gate、Lifecycle、pinned 或 GraphQL；
- 不把前端任意 filter/sort 原样交给 Flop；
- 不把 page/list/search 加入 FrontDesk；
- 不把 Detail schema 少选几个字段后称为 Lite；
- 不要求事务锁循环和 maintenance scan 使用产品分页合同；
- 不根据桌面/移动端 User-Agent 隐式选择模式。

### 2.1 当前实现状态

已落地的核心包括：`Helper.ORM.Pagi.Params.*`、`Page.*`、`Order`、`Config`、
`GroupherServer.Pagi.EffectiveConfig`、`CursorCodec`、Dashboard schema registry，以及
`Helper.ORM.pagi/3` 的 Flop adapter；Pagi ErrorCat、严格 config/context 校验、签名 cursor、已有
`ORDER BY` fail-fast 和 offset/cursor 集成测试也已加入。Flop 只在 `Helper.ORM.Pagi`
内部使用，不能穿过领域 facade 或 GraphQL。尚未声明 `Flop.Schema` 的 legacy offset schema
暂由同一入口 dispatch 到 `Helper.ORM.Pagi.Generic`；Generic 是 offset-only 的过渡 adapter，不能处理 cursor。

资源 Query、Lite/pinned/read-model、Dashboard config、GraphQL 新字段/resolver、Core
query/cache/SSR、Community consumer、CollectFolders 独立 entry 表和 N+1 strict gate
均已接入。旧的 `Helper.ORM.paginator/2`、`Helper.ORM.embeds_paginator/2`、Scrivener
依赖和 Repo adapter 已删除；当前旧调用清单为零，并由严格门禁固定：
[`backend/api/priv/pagination_inventory.json`](../../backend/api/priv/pagination_inventory.json)，
由 `pnpm check:pagination-inventory:strict` 校验 freshness。逐项完整正文读取只保留
搜索重建的最多 500 roots；它登记在
[`backend/api/priv/pagination_n_plus_one_inventory.json`](../../backend/api/priv/pagination_n_plus_one_inventory.json)
并由 `pnpm check:pagination-n-plus-one:strict` 校验。Press 是 service-scoped
request path，使用分页选择器和具名 batch hydrate，不是 background exception。
普通 Article legacy response 的正文、asset refs、Post/Kanban operational state 已改为按页
batch projection；cursor 起始页与 offset 首页共享 pinned loader，后续 cursor 页不重复返回 pinned。

## 3. 冻结决策

### 3.1 Dashboard 配置与 Pagi 执行分离

技术层同时支持 offset 与 cursor，但产品不按设备硬编码。社区级选择只是 Dashboard 普通配置的一部分，不建立独立的分页配置
领域、表、CRUD、cache 或 lifecycle：

```elixir
%Dashboard{
  pagination: %{
    posts: %{schema_version: 1, api: :cursor, mode: :load_more, revision: 3},
    changelogs: %{schema_version: 1, api: :offset, mode: :page, revision: 1},
    comments: %{schema_version: 1, api: :cursor, mode: :infinite_scroll, revision: 2}
  }
}
```

`surface` 只是 Resource Query 选择 Dashboard 配置段的 key，例如 `pagination.posts`；它不是新的领域实体。Dashboard 继续拥有现有的
配置存储、默认值、管理员修改、缓存、revision、失效和 bootstrap 输出。分页改造不复制这些能力。

`api` 表达后端合同 `offset | cursor`；`mode` 表达前端交互 `page | load_more | infinite_scroll`。Dashboard 在写入时校验产品组合；
`mode` 只供 bootstrap/前端选择组件，不进入 ORM SQL 机制。

产品组合是封闭矩阵，不允许把两个枚举任意笛卡尔积。首期矩阵明确属于
`schema_version: 1`；`schema_version` 的类型是 `pos_integer()`，当前支持集合只有
`[1]`：

矩阵版本：`schema_version: 1`

| api     | 合法 mode                    |
| ------- | ---------------------------- |
| :offset | :page                        |
| :cursor | :load_more、:infinite_scroll |

从 schema version 到产品矩阵只有一个来源：Dashboard normalization 使用的封闭
schema registry（实现时由同一 registry/table 提供 `supported_schema_versions/0` 和
`matrix_for/1`）。bootstrap、ORM、前端和测试不得各自复制一份 api/mode 矩阵；前端只消费
normalizer 输出的有效配置。ORM 仍不读取 `schema_version`，也不解释矩阵。

因此 `offset/load_more`、`offset/infinite_scroll`、`cursor/page` 都是非法组合，统一返回
`pagi.invalid_config`；未知值也不能降级为默认值。缺失、`nil`、类型错误或未解析的字符串 API 返回
`pagi.invalid_config`，类型正确但 Pagi 尚未支持的 atom API 返回 `pagi.unsupported_api`；未知 mode 返回
`pagi.invalid_config`。未来若要增加组合，必须
新增并递增 Dashboard config `schema_version`，同步更新 normalization、bootstrap/GraphQL
合同、前端 adapter、query-key 和正反例测试；不能在旧 `schema_version` 下静默扩大矩阵。
每个受支持的 `schema_version` 都有固定矩阵，normalizer 根据显式版本从该 registry 选择矩阵；`revision`
只表示该 surface 的内容变更和缓存失效，不携带矩阵版本。停止支持旧 schema 时，必须先执行
显式配置迁移；迁移前的旧 schema 返回 `pagi.invalid_config`，不能靠 revision 猜测。

Resource Query 将对应配置作为唯一的可选 `config` option 传给 `ORM.pagi`：

```elixir
ORM.pagi(query, params.pagi,
  for: ArticleLite,
  order: order,
  config: effective_config.config
)
```

其中 `effective_config` 是 Dashboard normalizer 输出的 `%GroupherServer.Pagi.EffectiveConfig{}`，不是存储层的原始 map；
传给 ORM 的只是其中的 `%Helper.ORM.Pagi.Config{}`。

Dashboard config 是请求必须遵守的硬约束，不是可以被客户端覆盖的建议。静态平台默认固定为：

```elixir
%{
  schema_version: 1,
  api: :offset,
  mode: :page,
  revision: 0,
  default_size: 20,
  max_size: 100,
  platform_hard_max: 100
}
```

首期 `schema_version: 1`、`default_size: 20`、`max_size: 100`、`platform_hard_max: 100` 与
`api: :offset`、`mode: :page`、整数 `revision: 0` 一并冻结。Dashboard 必须为每个可配置列表维护
独立的非负整数 `revision`；删除 fingerprint/string token 备选。矩阵扩展递增 `schema_version`，
配置迁移同时递增 revision 以使旧 cache 失效。

首次 adoption 也遵循显式版本规则。Dashboard 已提供 `pagination` surface 存储、normalizer、
effective lookup 和 bootstrap 输出；当前仓库的 preflight 没有发现需要 backfill 的旧
pagination surface config，因此默认值继续由 platform config 提供。现有旧分页字段、hooks
和 paginator 调用不属于 Dashboard config；runtime 已迁移到新 contract，但 legacy GraphQL
response 仍在兼容窗口内。

如果以后发现存量配置缺少 `schema_version`，必须先暂停严格校验，执行一次性迁移（写入
`schema_version: 1`、完成 v1 校验并递增该 surface 的 `revision`，随后失效对应 cache）；
迁移完成前不能把缺失版本的配置隐式解释为 v1。正式合同下，存在但缺少
`schema_version` 的 config 一律返回 `pagi.invalid_config`。

Effective config 的字段级合并顺序固定为：

```text
1. Dashboard 整个 surface config 缺失
   -> 完整使用平台默认 config

2. Dashboard surface config 存在
   -> schema_version/api/mode/revision 必填，缺失或 nil 均为 invalid_config
   -> default_size/max_size 缺失或 nil 时继承平台默认
   -> platform_hard_max 永远来自服务端常量，不允许 Dashboard 覆盖

3. 合并后执行 config 防御性校验
```

这不是任意 map 的无条件 deep merge：必填的 `schema_version/api/mode/revision` 不得被平台默认值掩盖；只有 size 字段允许继承。
Dashboard effective-config normalization 的内部检查顺序固定为：

```text
支持的 schema_version（类型与 registry 支持集合）
  -> 封闭 key set
  -> required/type
  -> schema_version 对应的 api/mode 矩阵
  -> 合并后的 size 约束
  -> 注入服务端 platform_hard_max
  -> 生成 %GroupherServer.Pagi.EffectiveConfig{}
```

其中 size 约束在校验时使用服务端的 `platform_hard_max`，但该字段只在最后注入输出，不能由输入
config 提供。非法 mode（例如 `:foo`）或非法组合统一返回 `pagi.invalid_config`，不得进入
`ORM.pagi`。ORM 不读取或解释 mode/schema_version，只消费 `%Helper.ORM.Pagi.Config{}`。

Dashboard surface 的输入 key 也是封闭的：只允许 `api`、`mode`、`default_size`、`max_size`、
`revision`、`schema_version`。`platform_hard_max` 是服务端常量，不是 Dashboard 可配置项；输入中
出现它，或出现任何未知 key，都返回 `pagi.invalid_config`，不能忽略、剥离或静默接受。合并后的
effective config 才由服务端注入 `platform_hard_max`。

Dashboard 写入和 `ORM.pagi` 防御性校验都必须满足：

```text
1 <= default_size <= max_size <= platform_hard_max
1 <= requested_size <= effective max_size
```

Dashboard 不能通过覆盖 `max_size` 绕过平台 hard max，也不能静默 clamp 非法配置或请求。

Community 产品列表先把 Dashboard 配置或静态默认解析成 effective config，再同时提供给 public bootstrap、query-key builder 和
Resource Query。因此 Dashboard 配置缺失不等于运行时 config 缺失：bootstrap 返回平台默认
`offset/page/schema_version 1/revision 0`，Resource Query 只把 effective config 的 `config` 显式传给 `ORM.pagi`。

只有不接 Dashboard 配置的内部/固定列表才可以省略 `config` option。此时 `ORM.pagi` 仍按平台默认 offset 执行，但外部请求不得携带
`config_revision`；需要 cursor 的内部列表必须显式传 config。

`ORM.pagi` 只接收 `%Helper.ORM.Pagi.Config{}`，读取 `api/default_size/max_size/revision/platform_hard_max`；`mode` 和 `schema_version` 继续只供
bootstrap/前端及 normalization 使用。客户端看到的整数 revision 放在
`Pagi.Params.Offset/Cursor.config_revision` 中。修改 posts 配置只增加 posts revision，不得改变 changelogs/comments revision 或 key。

Dashboard normalizer 的输出是已经校验过的 `%GroupherServer.Pagi.EffectiveConfig{}`：

```elixir
%GroupherServer.Pagi.EffectiveConfig{
  config: %Helper.ORM.Pagi.Config{
    api: :cursor,
    default_size: 20,
    max_size: 100,
    platform_hard_max: 100,
    revision: 7
  },
  mode: :load_more,
  schema_version: 1
}
```

`ORM.pagi` 的 `config` 入参只接受其中的 `%Helper.ORM.Pagi.Config{}`，通过 struct 模式匹配拒绝 Dashboard 原始 map。任何绕过 Dashboard、直接把原始 map 传给 ORM 的调用方，
必须先经过同一 normalizer；否则在请求参数校验之前返回 `pagi.invalid_config`。这样 ORM 可以做防御性
检查，但不会重新解释 `mode/schema_version` 或猜测产品组合。

### 3.2 Flop 是执行引擎，不是协议

`Flop.Meta`、Flop filter map 和 cursor 编码不得穿过业务 facade 或 GraphQL 边界：

```text
GraphQL / Job / internal caller
  -> CMS.<Resource> facade
       -> <Resource>.Query.Paged
            ├─ Gate.scope / lifecycle scope
            ├─ Filters.apply
            ├─ Sorts.resolve -> Pagi.Order
            ├─ Lite select
            └─ Helper.ORM.pagi
                  ├─ validate pagination input
                  ├─ apply the only ORDER BY
                  ├─ invoke Flop for Flop.Schema-backed offset/cursor resources
                  ├─ invoke the offset-only Generic adapter for legacy schemas
                  ├─ translate Flop.Meta
                  └─ return Pagi.Page.Offset or Pagi.Page.Cursor
```

替换 Flop 时，只允许 `Helper.ORM.Pagi` 和 adapter/test 变化；领域 facade、GraphQL 和前端合同不变。

### 3.2.1 Generic 是受控的 offset 过渡 adapter

`Helper.ORM.Pagi.Generic` 不是第二个公共分页入口，而是 `Helper.ORM.pagi/3` 内部针对尚未声明
`Flop.Schema` 的 legacy Ecto schema 的 offset-only fallback。当前 fallback 资源包括 account
notifications/mentions、Communities、Upvotes、AbuseReports、CollectFolders，以及部分 moderation、
Assets、ArticleLog 和 reaction-user 列表。完整使用面以 runtime `for:` 调用和 pagination inventory 为准。

Generic 不支持 cursor；任何 cursor surface 必须使用 Flop-backed schema/adapter。退出条件是每个仍在
使用 Generic 的资源补齐最小 Flop metadata、拥有 offset parity/query-budget 测试，并从 fallback inventory
归零后删除 Generic。期间不得把 Generic 描述成已经完成的统一 Flop 执行。

### 3.3 公共入口叫 `ORM.pagi`

```elixir
ORM.pagi(
  query,
  params.pagi,
  for: ArticleLite,
  order: order
)
```

- `Helper.ORM.pagi/3` 是公共执行入口；
- `Helper.ORM.Pagi` 拥有 Params/Page 类型、Order descriptor、验证、CursorCodec、Flop adapter 和 meta 转换；
- 不新增 `Pagi.run`、`ORM.Pagi.paginate` 或 `Database.Pagination`；
- 返回 `{:ok, value} | {:error, reason}`；
- 迁移完成后删除 `ORM.paginator/2` 和 `ORM.embeds_paginator/2`。

Elixir 模块不能写成 `ORM.Pagi(query, params)` 调用，因此 `ORM.pagi/3` 是最短且符合语言习惯的入口。

## 4. Pagi 合同

### 4.1 输入类型

调用方可以传入已经规范化的二选一结构：

```elixir
%Pagi.Params.Offset{page: 2, size: 20, config_revision: 3}

%Pagi.Params.Cursor{first: 20, after: "opaque-cursor", config_revision: 3}
```

`config_revision` 的稳定类型是 `non_neg_integer() | nil`；不使用字符串 fingerprint/token。

首期公共 cursor contract 只支持 forward cursor。`last/before` 不进入 GraphQL 或前端类型；确有反向窗口产品需求后再扩展，
不能因为 Flop 支持就提前暴露。

第二个参数允许为 `nil`；非空时只接受 `Pagi.Params.*`。唯一的配置入口是 keyword 中可选的 `config`，不再拆出
`config_revision` option：

```elixir
@spec pagi(
        Ecto.Queryable.t(),
        Pagi.Params.Offset.t() | Pagi.Params.Cursor.t() | nil,
        keyword()
      ) ::
        {:ok, Pagi.Page.Offset.t() | Pagi.Page.Cursor.t()}
        | {:error, GroupherServer.ErrorCat.Error.t()}
```

约束：

- `page/size` 与 `first/after` 互斥；
- offset `page` 必须是大于等于 1 的整数；
- size/first 有平台默认值和最大值；
- cursor 对客户端是不透明字符串；
- `pagi` 未传时由 `ORM.pagi` 根据 effective config 生成第一页 Params，并显式写入该 config 的整数 `config_revision`；
- config 存在且调用方显式提供 `pagi` 时，请求必须携带 `config_revision`，且请求 api/revision 必须分别匹配
  `config.api/revision`；
- config option 不存在时使用平台默认 offset；外部请求必须省略 `config_revision`，显式 cursor 不能覆盖默认 offset；
- `config` 是已经由 Dashboard 配置层验证的 `%Helper.ORM.Pagi.Config{}`；其运行时字段为
  `api/default_size/max_size/revision/platform_hard_max`，而 `mode` 与 `schema_version` 不进入 ORM；
- filter/sort 白名单和领域转换先于 `ORM.pagi`。

`params.pagi == nil` 是 `ORM.pagi` 的 trusted internal synthesis path：它先选择 effective config，再生成 Params，不参与“调用方是否携带
revision”的 context 校验。只有调用方显式传入的 `Pagi.Params.*` 才执行 config/revision presence 与匹配校验。config option 省略且
Params 为 nil 时，内部合法生成 `%Helper.ORM.Pagi.Params.Offset{page: 1, size: 20, config_revision: 0}`。

错误边界固定为（层级是返回该错误的最早责任层；ORM 仍可对已归一化 config 做防御性复核）：

| 层        | 条件                                                      | reason                        |
| --------- | --------------------------------------------------------- | ----------------------------- |
| Dashboard | `schema_version/api/mode/revision` 缺失、nil 或类型错误   | `pagi.invalid_config`         |
| Dashboard | `schema_version` 不受支持且未完成配置迁移                 | `pagi.invalid_config`         |
| Dashboard | mode 枚举非法或 api/mode 产品组合非法                     | `pagi.invalid_config`         |
| Dashboard | api 是类型正确、已解析但 Pagi 尚未支持的 atom             | `pagi.unsupported_api`        |
| Dashboard | `platform_hard_max` 或未知 key 出现在输入 config          | `pagi.invalid_config`         |
| Dashboard | config revision 或 schema version 为负数                  | `pagi.invalid_config`         |
| Dashboard | config 违反 default/max/hard-max 约束                     | `pagi.invalid_config`         |
| ORM       | config 存在、显式 `pagi` 但缺 `config_revision`           | `pagi.invalid_config_context` |
| ORM       | config option 不存在但请求带 `config_revision`            | `pagi.invalid_config_context` |
| ORM       | 请求 api 与有效 config api 不匹配                         | `pagi.config_mismatch`        |
| ORM       | 请求 revision 与有效 config revision 不匹配               | `pagi.config_mismatch`        |
| ORM       | config api 是已解析值但 Pagi 不支持                       | `pagi.unsupported_api`        |
| ORM       | 请求 page 小于 1 或不是整数                               | `pagi.page_out_of_range`      |
| ORM       | 请求 size/first 小于 1、不是整数或超过 effective max size | `pagi.size_out_of_range`      |

校验层级和优先级固定为：Dashboard normalization 先于 `ORM.pagi`；因此“非法 mode/组合 + 非法
page”必须返回 `pagi.invalid_config`，不能返回 `pagi.page_out_of_range`。ORM 不读取 `mode`，
所以不能为绕过 Dashboard 的调用方补做 mode/组合校验；这类调用方只能提交 `Helper.ORM.Pagi.Config`，
不能把原始 config map 当作已验证值。

平台默认 offset 下显式 cursor 属于有效 API 与当前硬约束不匹配，因此返回 `pagi.config_mismatch`，不是 `pagi.unsupported_api`。

显式请求的校验顺序固定为：config 必填字段/类型 -> config size 约束 -> context/revision presence -> revision match -> API match ->
page/size。公开错误仍为
`pagi.config_mismatch`，但内部 ErrorCat metadata 记录 `mismatch: :revision | :api`，供 SSR 判断是否可重试，不进入 GraphQL 稳定合同。

配置与请求校验的最小回归矩阵：

| 输入类别         | 必须覆盖的值                                                            | 期望                                                                                 |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `page`           | `-1`、`0`、`1`、非整数                                                  | 小于 1 或非整数均为 `pagi.page_out_of_range`                                         |
| `size/first`     | `-1`、`0`、`1`、effective max、max + 1、非整数                          | 小于 1、超过上限或非整数均为 `pagi.size_out_of_range`                                |
| config size      | `default_size/max_size` 为 `0`、负数、非整数、`default_size > max_size` | `pagi.invalid_config`                                                                |
| config key       | 携带 `platform_hard_max`、未知 key                                      | `pagi.invalid_config`，不得忽略或剥离                                                |
| config + request | 非法 mode/组合，同时 page 非法                                          | 先返回 `pagi.invalid_config`                                                         |
| 合法 mode        | 同一 `api` 下的每个合法 mode                                            | 传给 ORM 的 `Helper.ORM.Pagi.Config` 和 SQL/Params 行为完全一致；mode 不进入 ORM     |
| schema migration | 旧 schema 在新矩阵下的保留、迁移、停止支持                              | 只能按显式 schema 规则解释；停止支持后为 `pagi.invalid_config`，不能靠 revision 猜测 |

其中 `size/first` 的非整数在 GraphQL 层由 input coercion 测试负责，在 ORM 单测中仍须用非法
Elixir 值验证 `pagi.size_out_of_range`；两层不能用一层测试冒充另一层。

### 4.2 输出类型

输入与输出不能复用同一个 struct。输出使用独立 Page 类型，不使用充满 nullable 字段的大 map：

```elixir
%Pagi.Page.Offset{
  entries: entries,
  page: 2,
  size: 20,
  total_count: 231,
  total_pages: 12,
  has_previous_page: true,
  has_next_page: true
}

%Pagi.Page.Cursor{
  entries: entries,
  start_cursor: "...",
  end_cursor: "...",
  has_previous_page: true,
  has_next_page: true
}
```

Cursor 默认不计算 `total_count`。需要“共 N 条”的 surface 使用 offset，或通过独立 aggregate 明确承担 count 成本。

### 4.3 Order descriptor 与唯一 ORDER BY owner

cursor 基于排序字段生成，最终排序组合必须唯一、确定且可从结果提取：

```text
publish     -> published_at DESC, article_binding_id DESC
active      -> active_at DESC, article_binding_id DESC
upvotes     -> upvotes_count DESC, article_binding_id DESC
comments    -> comments_count DESC, article_binding_id DESC
views       -> views DESC, article_binding_id DESC
```

`Sorts.resolve/2` 将领域 sort 转成 descriptor，但不得直接调用 Ecto `order_by`：

```elixir
%Pagi.Order{
  fields: [:upvotes_count, :article_binding_id],
  directions: [:desc_nulls_last, :desc],
  cursor_fields: [:upvotes_count, :article_binding_id],
  bindings: [:article_stats],
  projection: [:upvotes_count, :binding_id]
}
```

`directions` 直接使用 Flop/Ecto 的完整方向：`:asc`、`:desc`、`:asc_nulls_first`、`:asc_nulls_last`、
`:desc_nulls_first`、`:desc_nulls_last`，不再建立第二套 `nulls` 数组。ArticleStats row 缺失在领域上等价于计数 0；
`upvotes/comments/views` 使用 left join + `coalesce(value, 0)`，cursor 编码 0 而不是 `nil`。真正 nullable 的时间字段才使用明确的
`NULLS FIRST/LAST`。

`ORM.pagi` 是普通列表 ORDER BY 的唯一 owner。进入它的 base query 不得已经携带列表排序；Flop 根据 `Pagi.Order` 应用完整排序、
cursor predicate 和 tie-breaker。不得先由 `Sorts.apply` 写入 Ecto order，再让 Flop追加第二套 order。

Flop 无法可靠表达的 calculated/alias sort 必须先经过 Phase 1 spike：alias field 不用于 cursor；优先使用 join/custom field 并把
全部 cursor fields 选入 Lite。验证失败则由 Groupher cursor adapter 完整拥有该 sort 的 predicate 和 order，不能只让 Flop
处理 tie-breaker。

`Pagi.Order` 已经包含完整 entry-identity tie-breaker，因此 Flop config 必须使用 `tiebreaker: false`，不能再追加 schema primary key。
`ArticleLite` 是 Flop 的 `for:` schema/config owner，不能只是没有 `Flop.Schema` 协议的普通 select map。

GraphQL 只传领域 enum，不能传列名、direction list 或 SQL。所有非唯一业务排序追加该 surface 的 entry identity，而不是统一追加
`article.id`。从 offset 切到 cursor 时 scope、filter 和 sort 必须不变；cursor 与当前查询签名不匹配时返回明确错误。

### 4.4 Entry identity

每个 paged surface 必须声明五项合同：

```text
resource identity
entry identity
display path
cursor tie-breaker
frontend dedupe key
```

Article 的目标合同为：

```text
resource identity:     article.id
entry identity:        article_binding.id
display path:          community/thread/inner_id
cursor tie-breaker:    article_binding.id
frontend dedupe key:   community/thread/inner_id
```

同一 Article 可以绑定多个 Community，因此 `article.id` 不能统一作为列表 entry identity。所有 cursor fields 和 tie-breaker 必须被
Lite select 返回；索引尾部使用相同 entry identity 和方向。

### 4.5 Lite 的私有 cursor projection

`ArticleLite` 同时承担稳定列表 read model 和 Flop cursor-value source，但 GraphQL 只暴露内容字段。最终 adapter 合同使用
flat selected map + `cursor_value_func`，不定义嵌套 pagination struct。pipeline 中使用
`ArticleLite.select(order, thread)`（完整函数签名为 `select(query, order, thread)`）根据
`Pagi.Order.bindings/projection` 只加入当前 sort 需要的 join 和 cursor 字段，避免 publish/active/inserted 排序也 join
ArticleStats。下面是 upvotes 排序的返回形状：

```elixir
%{
  article: article,
  community: community,
  inner_id: binding.inner_id,
  binding_id: binding.id,
  title: public.title,
  author: user,
  upvotes_count: coalesce(stats.upvotes_count, 0)
}
```

flat map 中的 `binding_id` 与当前 sort projection 只供 `ORM.pagi`/Flop 读取和生成 cursor：

- 调用方显式传入 `cursor_value_func: &ArticleLite.cursor_values/2`，由它从 selected map 提取完整 cursor fields；
- GraphQL presentation 只映射公开内容字段，不暴露 `binding_id` 或 stats cursor projection；
- 前端不会收到这些 stats 值，ArticleStats 仍由独立 batch/cache owner 提供；
- 这不是第二个 Article read model，也不引入 `ArticlePageRow`；
- SQL 可以一次选择轻量 cursor 数值，但不能把完整 ArticleStats/viewer state 混入 Lite；
- 不再支持或评估 nested `path`/嵌套 pagination projection，后续实现者不得再引入第二套 projection 合同；
- alias field 明确不能用于 cursor；如 custom/join field 不能可靠生成 predicate/order，则完整切到 Groupher cursor adapter；
- 所有开放 sort 的 cursor field 必须存在，缺失时测试和开发环境 fail fast，不能用 `nil` 静默编码错误 cursor。

### 4.6 CursorCodec

Flop 原生 cursor 不直接出现在外部合同中。`Pagi.CursorCodec` 负责：

- URL-safe Base64 且不依赖 padding；
- 显式 cursor version；
- 显式 HMAC key version；
- 绑定 surface、sort、direction 和 filter/query fingerprint；
- 可验证的 HMAC signature；
- production 必须显式配置 `PAGINATION_CURSOR_CURRENT_KEY` 和正整数 key version；
- `PAGINATION_CURSOR_PREVIOUS_KEYS` 使用 version -> key 的 JSON key ring，在轮换窗口继续验旧 cursor；
- production 缺少专用 key 时启动失败，不回退到 `SECRET_KEY_BASE` 或固定开发 key；
- 将合法 payload 转换为 Flop cursor/value，反向包装 Flop 输出；
- 不记录完整 cursor 或 payload。

首期不设置 TTL。Cursor 不是授权凭证，每次读取仍经过 Gate；无业务理由的过期会破坏分享和恢复体验。真正引入 TTL 后再增加
`expired_cursor` 错误。

签名 key 来自运行环境的 secret key ring，不写入数据库或源码。Envelope 至少包含 `cursor_version`、`key_version`、payload 和
signature。编码只使用当前 key；解码可接受当前 key 和迁移窗口内的 previous key。轮换先发布新 key ring，再切换 current key，
最后在观测窗口后移除 previous key。移除旧 key 会让对应 cursor 返回稳定的 `pagi.unsupported_cursor_key`，这是显式兼容决策，
不能退化为通用 invalid cursor。

稳定错误 reason：

```text
pagi.invalid_cursor
pagi.unsupported_cursor_version
pagi.unsupported_cursor_key
pagi.cursor_query_mismatch
pagi.cursor_signature_invalid
pagi.page_out_of_range
pagi.size_out_of_range
pagi.deep_offset_rejected
pagi.unsupported_sort
pagi.invalid_config_context
pagi.invalid_config
pagi.config_mismatch
pagi.unsupported_api
pagi.count_failed
pagi.query_failed
```

reason 进入现有 ErrorCat registry 后再分配 GraphQL code，不能在 resolver 临时拼字符串。

### 4.7 Count contract

Offset count 由与 entries 相同的 scope/filter/pinned-exclusion base 构造，但拥有独立 query：

```text
base scope/filter + pinned NOT EXISTS query
├── entries -> Lite select + Pagi.Order + offset/limit
└── count   -> count distinct(entry identity)
```

Count 必须显式处理 `distinct`、`group_by`、1:N join 和 entry identity；不能只依赖 Flop 默认 count，也不能简单删除 select/order 后假设
口径一致。Entries 与 count 使用同一个按 binding entry identity 构造的 pinned anti-join；Pinned 不计入普通 entries 的
`total_count`。如产品需要总量，单独返回 `pinned_count`。

## 5. 所有分页资源的统一目录

所有有 detail 与 paged read 的领域资源采用同一骨架，Articles 只是第一个样本：

```text
cms/<resource>/
├── <resource>.ex          # 可选内部 facade；公开入口仍是 CMS.<Resource>
├── params.ex              # 领域 filter/sort/pagi 输入
├── <resource>_lite.ex     # 稳定列表 read model
└── query/
    ├── detail.ex          # 若 FrontDesk 已拥有则不重复建立
    ├── paged.ex           # 组合 scope/filter/sort/Lite/Pagi
    ├── pinned.ex          # 仅有 pinned 语义时存在
    └── paged/
        ├── filters.ex     # 领域 filter -> Ecto query
        └── sorts.ex       # 领域 sort -> 唯一稳定 order
```

这个骨架同样适用于 Comments、Communities、Assets、Notifications、CollectFolders 等资源。不是每个资源都要创建空文件，
但只要存在分页，`params + lite + paged + filters + sorts` 的职责保持一致。

禁止建立 `mobile_paged.ex`、`desktop_paged.ex`。设备差异只影响 API 和 mode，不产生第二套资源查询。

## 6. Lite read model

`<Resource>Lite` 是版本稳定、具名、服务端拥有的列表读取模型。它不是：

- Ecto schema 的任意 preload 组合；
- GraphQL selection set 的镜像；
- Detail 删除几个字段后的 map；
- 每个页面自行拼装的临时结构。

每个 Lite 模型写清字段、来源、nullable 语义和 viewer-specific 字段。确有不同业务语义时使用
`ArticleLite`、`ArticleManagementLite` 等具名模型，不使用动态字段列表或 `lite_v2`。

分页 SQL 直接选择 Lite 数据：

- 一对一数据使用 join/subquery；
- 一对多摘要使用预聚合子查询、lateral join 或 aggregate；
- 避免 join 造成主资源行放大；
- 禁止先 hydrate 全集合再内存分页；
- public Lite 理想上由一次 entries SQL 得到；offset 额外一次 count；
- viewer state 可并入 actor-scoped query，或使用一次整页 batch，不能逐项查询。

| API    | 公共 Lite | viewer state        | count | 要求   |
| ------ | --------- | ------------------- | ----- | ------ |
| cursor | 1         | 0 或 1 次整页 batch | 0     | 常数次 |
| offset | 1         | 0 或 1 次整页 batch | 1     | 常数次 |

查询次数不能随 `size=1` 增长到 `size=20` 而线性增加。

## 7. Filter、Sort、Gate 与 Lifecycle

```text
base resource query
  -> Gate.scope(actor, context)
  -> lifecycle/publication scope
  -> Filters.apply(domain params)
  -> Sorts.resolve(domain enum + entry-identity tie-breaker)
  -> Lite.select
  -> ORM.pagi(query, params, order: descriptor)
```

- Gate 决定可见资源；Lifecycle/发布状态决定合法状态集合；
- Filters 转换 community、tag、category、status、时间窗口等白名单；
- Sorts 把 active、publish、inserted、upvotes、comments、views 等领域白名单解析为 `Pagi.Order`，但不写 Ecto order；
- `ORM.Pagi` 不解释领域 enum，但根据 descriptor 唯一地施加 ORDER BY、cursor predicate 和 pagination；
- resolver 不拼 Ecto query，也不调用 Flop；
- Flop field config 只开放 Lite query 的显式字段，不开放底层 schema 全字段。

某个 sort 若不能形成稳定唯一顺序，就不能开放 cursor，不能运行时降级成不可靠 cursor。

## 8. Pinned entries

Pinned 是集合组成规则，不是普通排序字段。GraphQL 分段返回：

```graphql
type PostPage {
  pinnedEntries: [PostLite!]!
  entries: [PostLite!]!
  pageInfo: PageInfo!
}
```

这里使用 Posts surface 的具体 GraphQL 名称；backend 仍只有共享的 `ArticleLite` read model。

- pinned query 由领域 `query/pinned.ex` 拥有；
- 普通 entries 和 count 始终使用 `NOT EXISTS`/anti-join 按 pinned `article_binding.id` 排除 pinned entries；
- pageInfo、cursor 和 offset total 只描述普通 entries；
- cursor payload 不编码 pinned 状态，但 pin/unpin 会按 live collection 语义改变后续普通 entries；
- pinned 数量有明确上限，并且只在集合起点返回：offset `page == 1`，cursor 没有 `after`；
- pinned 展示 query 只在集合起点执行；anti-join 属于 entries/count SQL，自第一页到任意后续页都生效，不需要每页先取 pinned IDs；
- pin/unpin 同时失效 pinned query 和相关普通 list family；
- 前端可视觉连续展示，但保留两段数据语义。

Pinned 与普通 entries 是 live collection 下的两次读取，不承诺跨请求 snapshot。并发 pin/unpin 时采用 best-effort 语义；需要严格
snapshot 的后台导出另立协议。

如果产品要求 pin 占用每页 N 个位置，应另立具名集合协议，不能在分页完成后 prepend。

## 9. GraphQL 与前端合同

当前 Absinthe 1.12 支持 OneOf input；Absinthe schema DSL 使用 `@one_of`，生成的 SDL directive 是 `@oneOf`。GraphQL input
直接冻结为显式二选一，不保留 resolver/parser fallback：

```graphql
input OffsetPagiInput {
  page: Int
  size: Int
  configRevision: Int
}
input ForwardCursorPagiInput {
  first: Int
  after: String
  configRevision: Int
}
input PagiInput @oneOf {
  offset: OffsetPagiInput
  cursor: ForwardCursorPagiInput
}
```

现有 `PageSizeProof` 同时注入 page/size/first 和默认 sort，与领域 Params/Sorts ownership 冲突。迁移期间它只能挂在旧 GraphQL
字段上；新 `postPage/changelogPage/commentPage` resolver pipeline 禁止引用它。领域 sort 默认值继续由 Domain Params/Sorts 拥有；
新 `PagiInput` 的 api、page/size/first 默认值和范围验证由 `ORM.pagi` 根据可选 config 统一处理。新 consumer 迁移完成后删除该
middleware 的分页职责。

`pagi` 参数可选。Community Resource Query 始终传入 resolved effective config 的 `config`：Dashboard 配置存在则用它，缺失则显式传静态平台
默认。未传 `pagi` 时，`ORM.pagi` 按 effective config 创建第一页 Params，并把 revision 写入内部 Params。前端显式发送 bootstrap
派生的 `pagi` 时，`configRevision` 与 offset/cursor 参数处在同一个 input 中，类型为非负整数，不建立独立 field argument。

显式请求必须遵守 effective config。Dashboard/bootstrap 与列表请求之间发生配置更新时返回 `pagi.config_mismatch`；前端失效
Dashboard/bootstrap 和旧 list key，取得新 config 后从集合起点重试。对于完全不接 Dashboard config 的内部/固定列表，调用方可以
省略 config option，此时请求必须省略 `configRevision`，且平台默认 offset 是硬约束。

输出合同固定为 `PageInfo` interface、两个实现以及每个资源自己的 Page object：

```graphql
interface PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

type OffsetPageInfo implements PageInfo {
  page: Int!
  size: Int!
  totalCount: Int!
  totalPages: Int!
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

type CursorPageInfo implements PageInfo {
  startCursor: String
  endCursor: String
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

type PostPage {
  pinnedEntries: [PostLite!]!
  entries: [PostLite!]!
  pageInfo: PageInfo!
}
```

`PostLite`、`ChangelogLite` 等只是 backend `ArticleLite` 在 thread-specific GraphQL surface 上的输出类型，不建立第二套 backend
Lite read model。

不建立泛化的 `PagiPage` entries interface，因为不同资源的 entry 类型不同。客户端通过 `pageInfo.__typename` 和 fragments 得到
offset/cursor 的精确 generated type。

旧 `filter.page/size` 与新 `pagi` 不得长期同时接受。兼容窗口使用独立字段：

```graphql
pagedPosts(filter: PagedPostsFilter!): PagedPosts! @deprecated
postPage(filter: PostFilter, pagi: PagiInput): PostPage!

pagedChangelogs(filter: PagedChangelogsFilter!): PagedChangelogs! @deprecated
changelogPage(filter: ChangelogFilter, pagi: PagiInput): ChangelogPage!

pagedComments(...): PagedComments! @deprecated
commentPage(..., pagi: PagiInput): CommentPage!
```

旧字段只接受旧 filter，新字段只接受 `PagiInput`；不在同一 resolver 中定义隐式优先级。Pinned 只在第一页/起始 cursor 返回，
后续 page 的 `pinnedEntries` 为空。

`commentPage` 的 backend field、resolver 和 Lite/Pagi 执行路径已经落地；当前 Comments UI 仍依赖 reply tree、reaction 和 viewer
projection，因此继续消费 rich `pagedComments` compatibility field。它不计入首期 Comment consumer cutover，不能把“schema field 已存在”
描述成 Core/Community consumer 已迁移；后续迁移必须先扩展 CommentPage 的 bounded rich projection，再切 query key 和 UI。

### 9.1 改造前前端基线（历史）

以下记录改造前的前端基线，现已由 9.2–9.9 的合同替换：

- `getPagedArticlesParams` 从 URL 读取 `page`，并固定补充 `size: 20`；
- `Q.article.posts/changelogs` 使用普通 `useQuery`，query key 直接包含 page filter；
- `commentQueries.list` 的 API 和 query key 都直接接受 page，并固定 `size: 30`；
- Posts、Changelogs 的 UI 和 URL 导航都基于 `pageNumber/totalPages`；
- Community SSR query 预取固定的 `{page: 1, size: 20}`，hydration key 也是 offset shape；
- list invalidation 根据现有 filter object 匹配 posts/changelogs；
- `useArticleStates` 已按 community/thread 对当前 entries 执行 ArticleStats batch query。

因此 cursor 不能仅由后端替换实现。GraphQL generated types、Params builder、query options、cache key、SSR loader、hooks、UI、
invalidation 和测试都需要同步调整。

### 9.2 前端分页类型

Core 定义 transport-neutral discriminated union，不复制 Flop 类型：

```typescript
type TOffsetPagi = {
  api: 'offset'
  page: number
  size: number
  configRevision?: number
}

type TCursorPagi = {
  api: 'cursor'
  first: number
  after?: string
  configRevision?: number
}

type TPagi = TOffsetPagi | TCursorPagi
```

首期前端和 GraphQL 都只支持 forward cursor，因此类型中没有 `last/before`。不得让后端支持范围与公开 contract 悄悄漂移。

返回类型同样按 `api` 区分，业务组件不得通过多个 optional 字段猜测分页类型。generated GraphQL type 是 transport source，Core
可以提供窄 adapter 将 GraphQL pageInfo 转成稳定的 `TOffsetPage` 或 `TCursorPage`。

### 9.3 Query hooks

- offset surface 使用 `useQuery`，每个 page 是独立 cache entry；
- cursor/load-more surface 使用 TanStack Query `useInfiniteQuery`，`pageParam` 只保存 opaque cursor；
- 不在同一个 React hook 中根据运行时 api 条件调用 `useQuery` 或 `useInfiniteQuery`；
- 前端从 Dashboard bootstrap 读取 config，再渲染 `OffsetList` 或 `CursorList` 子组件，使各自 hook 调用顺序稳定；
- filter、sort、community、api、mode、schema version 或 config revision 改变时创建新的 query identity，从第一页重新加载；
- cursor entries 按 canonical resource key 去重，但重复出现应同时上报 telemetry，不能只静默掩盖后端问题；
- `hasNextPage=false` 后禁止继续请求；load-more 请求期间保留已经渲染的 pages。

### 9.4 Cache key

推荐 key 形状：

```text
offset:
  [article, posts, surface, {api: offset, mode: page, schema_version: V, revision: N}, community, filters, sort, size, pageNumber]

cursor/infinite:
  [article, posts, surface, {api: cursor, mode: load_more|infinite_scroll, schema_version: V, revision: N}, community, filters, sort, size]
  pageParam = after cursor
```

cursor 本身不进入 infinite query 的根 key，否则每一页会变成互不关联的 query，无法由 `useInfiniteQuery` 管理。`surface` 必须进入
key，避免相同 filter 但 Lite/view 或产品配置不同的列表错误共享缓存。`schema_version` 标识矩阵/配置结构版本，`revision` 是对应
Dashboard 配置段的非负整数内容版本；两者都必须进入 key，不使用 fingerprint 或 string token。修改 posts config 只能更换 posts key，
不能连带更换 changelogs/comments key。

Dashboard 配置缺失时 bootstrap 必须返回平台默认 `{api: offset, mode: page, schema_version: 1, revision: 0}`，因此 SSR 和 browser 仍能生成完全相同、
字段完整的 query key，不存在“缺配置所以省略 key 片段”的分支。

所有对象进入 key 前必须规范化：移除 undefined、数组排序策略明确、enum 大小写统一。不得依赖临时对象的字段插入顺序定义
跨 SSR/browser 的 hydration identity。

`filters` 只包含领域过滤条件，必须排除 `page`、`size`、`first`、`after`、cursor、api、mode、schema version 和 config revision；这些分页位置和
策略已经是 key 的独立字段。Invalidation matcher 同样按规范化后的 domain filters 匹配，不能继续从旧的混合 filter object
猜分页位置。

### 9.5 URL、SSR 与滚动恢复

- offset URL 保留 `page=N`，支持分享、刷新和浏览器前进/后退；
- cursor surface 的 URL 至少保留 filter、sort、api 和 mode；是否保存当前 cursor 由 Dashboard 产品配置决定；
- 无限滚动默认不把每次 load-more 都写入 URL，避免历史记录被每一页污染；
- 若产品要求分享某个 cursor window，URL 只保存 opaque cursor，不保存解析后的排序值；
- SSR loader 必须调用和浏览器相同的 Params/key builder，不再手写固定 `{page: 1, size: 20}`；
- cursor 首屏使用 `prefetchInfiniteQuery` 生成 `{pages, pageParams}` hydration，不由业务代码手工伪造内部结构；
- `initialPageParam` 统一使用可序列化的 `null`，避免 SSR JSON 把 `undefined` 转成 `null` 后产生 server/browser 差异；
- hydration 前必须先得到 Dashboard pagination config，避免服务端预取 offset、浏览器启动后切到 cursor 导致双请求；
- `pagi.config_mismatch` 保持一个公开 reason，但内部记录 `mismatch: :revision | :api`；SSR 只在 revision mismatch 时强制绕过旧
  cache 刷新 Dashboard/bootstrap，并使用新 revision 从集合起点重试一次；
- revision 已匹配时的 API mismatch、`pagi.invalid_config_context`、`pagi.invalid_config` 和 `pagi.unsupported_api` 属于请求构造或
  服务端配置错误，不刷新 bootstrap、不自动重试；
- SSR 重试仍失败时不得返回页面级 500，而是渲染保留 Community shell 和客户端恢复状态的列表 shell；第二次失败记录 telemetry，
  不写入成功列表 cache，浏览器接管后必须重新读取 Dashboard/bootstrap，再按最新 revision 请求；
- 返回列表页时恢复 scroll position 和已经加载的 infinite pages；失效 cursor 则回到集合起点并给出非阻塞提示。

Community 当前实现按同一 filter/config/key builder 分流：SSR 的 offset 使用 finite query，cursor 使用
`ensureInfiniteQueryData` 与 `{pages, pageParams}` hydration；Core 列表由 `PagedPostsProvider`/
`PagedChangelogsProvider` 在渲染子树前选择独立的 Offset/Cursor provider，因此同一个 React hook
不会同时注册两个 transport query。两者都把 `configRevision` 放入 GraphQL `pagi`，不会把不同
filter 或 transport shape 写入同一缓存身份。

### 9.6 Stats 与 viewer state

Article 当前已有 `useArticleStates`，会把传入的 Article path 按 community/thread 分组，并使用 batch query 获取 ArticleStats，
同时按全部 paths 查询 viewer 和 interaction state。Offset 单页下这是 bounded batch；infinite list 若传入全部累计 entries，新增
一页会改变全量 key并可能重查历史 IDs。

Articles 需要冻结以下选择，避免重复网络和数据库读取：

- `ArticleLite` 负责稳定 content/path/author/tag 等列表内容；
- `ArticleStats` 继续由独立 batch cache 拥有实时 stats 和 revision；
- viewer/private state 继续走现有 owner-wise composition；
- paged GraphQL 不再同时返回一份会立刻被 stats batch 覆盖的 stats；
- SSR 可以预取本页 stats batch，但必须使用与浏览器相同的 stats key。

当前 Core 的 infinite Article state composition 保留每个 loaded page 的 stats、viewer、interaction
batch key；追加新页只创建新页/chunk 的请求，不把历史 IDs 合并成一个不断增长的 batch。

Infinite surface 必须保留 page/chunk boundary，只对新增页或固定窗口建立稳定 query key：

```text
new cursor page
  -> at most one stats batch per community/thread chunk
  -> one viewer-state batch per stable chunk
  -> one interaction-state batch per stable chunk
```

不能对 flatten 后的全部累计 entries 直接复用旧 `useArticleStates(entries)`。实现可由 `useQueries` 接受稳定 page chunks；不得在
普通 `map` 中按 page 条件调用 React hook。`groupStatsBatches` 的去重使用 `Set`，不能对累计 IDs 重复 `includes` 扫描。

后端 SQL budget 与前端 network batch budget 分开测试和 telemetry，不能用“后端没有 N+1”掩盖浏览器每次 load-more 重取全部 ID。

其他资源没有独立 stats/cache owner 时，可以把稳定摘要直接放入 ResourceLite；不能机械复制 Article 的拆分。

### 9.7 Invalidation 与 mutation

- list invalidation matcher 必须识别 offset 和 cursor/infinite 两种 key；
- create、publish、trash、move、pin、sort-field change 默认失效相关 surface 的整个列表 family；
- stats/viewer-only mutation 优先更新独立 stats/viewer cache，不重拉 ArticleLite；
- 对 infinite pages 做乐观更新时必须遍历所有已加载 pages，并按 canonical key 定位；
- pin/unpin 同时失效 `pinnedEntries` 和受影响的普通列表，不能在客户端简单 prepend；
- 删除当前 offset 页最后一项后，需要按产品决定停留空页还是回退一页；该规则由 UI adapter 统一实现。

### 9.8 前端组件

Core 提供两套共享组件，而不是一个包含大量 nullable props 的万能 Pagination：

- `OffsetPagination`：页码、上一页、下一页、总页数和 URL navigation；
- `CursorPagination` 或 `LoadMore`：首期只提供 forward load-more/infinite-scroll，只消费 cursor pageInfo；
- 资源列表只负责 entries rendering 和选择分页组件；
- pinned 与 entries 在 view model 层保持分段，渲染层可视觉连续；
- loading、empty、initial error、next-page error 和 retry 状态分别建模；
- 控件提供 disabled、aria label、键盘操作和加载反馈。

### 9.9 前端测试

至少覆盖：

- Params 与 GraphQL input 的 offset/cursor 映射；
- filter/sort/api/mode/schema version/config revision 改变后重置位置；
- offset URL 前进/后退与 SSR hydration key 一致；
- cursor `getNextPageParam`、无下一页和请求重试；
- 多页 merge、canonical key 去重和 pinned 分段；
- mutation invalidation 同时命中 offset/cursor keys；
- stats batch 数量不随 Article 数量退化为逐项请求；
- infinite 新增一页不得重新请求历史 page/chunk 的 stats、viewer 或 interaction IDs；
- Community Dashboard 配置缺失时 bootstrap、query key 和 SSR hydration 都使用 `offset/page/schema_version 1/revision 0`；
- config option 不存在且 `params.pagi == nil` 时 trusted path 生成 offset第一页、size 20、revision 0；显式 Params 带 revision 仍报错；
- effective config 为平台默认 offset 时显式 cursor 返回 `pagi.config_mismatch`；
- config 存在但请求缺 revision、config option 不存在却提交 revision、revision/api 不匹配分别进入冻结的稳定错误路径；
- Dashboard surface config 缺失时整体默认；存在时 size 字段可继承，但 schema_version/api/mode/revision 缺失、nil、负数、类型错误、非法 mode
  或非法 api/mode 组合均拒绝；
- `schema_version` 选择固定矩阵；旧 schema 在停止支持前按自身规则解释，停止支持后必须先迁移，否则返回 `pagi.invalid_config`；
- `default_size <= max_size <= platform_hard_max`、请求 size 上限和非法 config 均有边界测试；
- offset page `-1/0/1/非整数`、size/first `-1/0/非整数/effective max/max + 1` 和合法 page 的 deep-offset 拒绝分别覆盖对应 reason；
- 修改 posts config 只改变 posts schema/revision/query key，不改变 changelogs/comments query key；
- Dashboard/bootstrap revision 与列表请求竞态触发 bootstrap refresh，并用新 key 从集合起点重试；
- SSR 只对 revision mismatch 重试一次；API mismatch、invalid config/context、unsupported api 不重试；连续 revision mismatch 渲染
  可恢复 shell；
- 管理员切换 api/mode 后的 cache 隔离和滚动恢复。

前端始终不感知 Flop，也不自行生成 cursor。

## 10. N+1 防线

分页改造必须同时消除列表加载中的 N+1。只把 Scrivener 换成 Flop、但继续在 `entries` 上逐项调用
`FrontDesk`、`Repo` 或领域 Query，不算完成迁移。

### 10.1 已确认问题与处置

| 路径                                    | 当前形态                                                         | 风险                                  | 目标处置                                                               |
| --------------------------------------- | ---------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| `CMS.Articles.Query` 普通分页           | `Pagination.page/4` 先取 ArticleLite，再做兼容 response 组装     | 旧 Detail N+1 已移除                  | 一页 Lite 查询；pinned 独立首屏查询；viewer state 由独立 owner 负责    |
| `CMS.Articles.Query` Kanban             | binding identity 先分页，再一次 `FrontDesk.articles/1` batch     | 完整 legacy projection 的固定 batch   | 保留具名 composite；不把 joined Kanban sort 硬塞进通用 Pagi            |
| `CMS.Articles.Query` published          | author/community/binding joined page，再一次 batch               | 完整 legacy projection 的固定 batch   | 保留具名 composite；page identity 是 binding path                      |
| `Accounts.Upvotes`                      | 一页 ArticleLite/stats projection                                | 旧逐项读取已移除                      | direct query + bounded interaction projection                          |
| `CollectFolders.Articles`               | `collect_folder_entries` 先数据库分页，再 Lite batch             | entry identity 稳定                   | 独立表、binding identity、无 embedded collection dual-write            |
| `CMS.Articles.Trash`                    | trash-scoped page query + mention aggregate                      | 固定查询预算                          | 一次 page/count base，加一组页内 mention projection                    |
| `Comments.Query.assign_stable_articles` | page paths 交给 `ArticleLite` bounded batch                      | 固定 batch                            | 按 `(community, thread, inner_id)` 建 identity map                     |
| Comments public GraphQL                 | `commentPage` backend Lite/Pagi 已可用                           | rich `pagedComments` consumer 暂留    | reply tree/reaction/viewer projection 完成前不宣称 consumer cutover    |
| AbuseReports                            | report page 后一次 ArticleLite/stats batch                       | 固定 batch                            | 线程目标和评论目标共用 page context                                    |
| `Assets.Query.usages/3`                 | replacement snapshot + page-level draft visibility               | plan preview 固定预算；apply 逐项重验 | snapshot 携带 Draft/Public/Lifecycle facts；创建计划不逐项读库或加锁   |
| Press feed / manifest                   | service-scoped request 先分页选 paths，再按 100 条 batch hydrate | 固定 batch；manifest 最多 5 页/thread | 复用 Articles Pagination；`FrontDesk.articles/1` batch；不进 allowlist |
| Search reindex                          | 每批最多 500 roots，但 binding fan-out 不封顶                    | background fan-out exception          | 可保留唯一 background allowlist；不把 500 roots 当作完整 bounded 证明  |

Search reindex 和资产替换计划等后台或维护任务仍应进入审计清单；Press feed、manifest 是 service-scoped request path，
不能按后台任务例外处理。资产 replacement plan 创建阶段复用 usage batch 中的 Draft/Public/Lifecycle snapshot，
只执行 actor-independent Lifecycle capability；不得在 `build_items` 中逐项 `Repo.get*` 或开启 mutation
transaction/lock。apply 阶段仍由 `ReplaceUse` 在每个真实写命令中事务内重载、Gate 授权并校验版本。
snapshot 中的 `observed_draft_version` 来自 Article 当前 Draft，而不是恰好拥有该 usage ref 的版本；因此即使最新 usage row
属于 live Revision，计划也不会丢失已经存在的 Draft version。
首期 replacement apply 只支持普通 Article；Doc usage 在计划中显式标记 `unsupported`，不得伪装成可执行 item。

Lifecycle 中逐项加行锁、逐项执行有顺序要求的领域写入，不属于普通列表 hydration。此类循环必须保留明确的 transaction/lock
理由，不能被自动重写成一个无语义保证的 preload。

### 10.2 允许的加载形态

列表读取只允许以下三种形态：

#### A. 一次 Lite 查询

固定列表字段优先由一个 Ecto query 得到：

```elixir
order = Sorts.resolve(params.sort, :public_articles)

query =
  Article
  |> Gate.scope(actor, context)
  |> Filters.apply(params.filters)
  |> ArticleLite.select(order, thread)

ORM.pagi(query, params.pagi,
  for: ArticleLite,
  order: order,
  cursor_value_func: &ArticleLite.cursor_values/2
)
```

`cursor_value_func` 是最终 adapter 合同；它从 `ArticleLite.select/3` 返回的 flat selected map 中提取 cursor fields，调用方必须显式传入。
author、community、public binding 等稳定一对一关系可通过 join/select 获取；tags 等 1:N 摘要通过预聚合子查询、lateral
join 或 PostgreSQL aggregate 获取，避免主资源行被放大。ArticleStats 继续由独立 batch/cache owner 负责，不在 ArticleLite
重复返回。

#### B. 一次主查询加一次 bounded batch

当 viewer state 或多态关系难以安全并入主查询时，可以对“本页 id 集合”做一次批量查询：

```text
1. query page of ResourceLite base rows
2. collect at most page-size resource identities
3. query viewer states with WHERE resource_id IN (...)
4. merge in memory by resource identity
```

batch 输入必须来自已经完成数据库分页的一页，不能来自未分页全集。merge 必须建立 id map，不能为每个 entry 再线性扫描
整个 batch 结果，否则会把数据库 N+1 换成内存 O(N²)。

#### C. 有界 Ecto preload

只有在主资源已经数据库分页、关联规模有明确上限且 preload 不改变 page identity 时，才允许对这一页做有限 preload。
不得 preload body、revision history、全部 comments 或其他无界 Detail 关系。允许的 preload 必须属于 Lite 合同，而不是由
GraphQL selection set 动态决定。

以下形态一律禁止：

```elixir
page.entries
|> Enum.map(&FrontDesk.article/1)

page.entries
|> Enum.map(&Repo.get_by(ArticleStats, article_id: &1.id))

all_bindings
|> Enum.map(&hydrate/1)
|> ORM.embeds_paginator(params)
```

禁止范围也包括通过 `load_entry/1`、`hydrate_item/1` 等本地 helper 间接隐藏查询。

### 10.3 查询预算与验收方法

每个 Paged Query 在模块文档或测试中声明预算：

这里的 list-query budget 从已经加载 Dashboard/community context 开始计算。Resource Query 只读取已有 Dashboard config 并作为
option 传入，不得为了分页单独查询配置。Dashboard/bootstrap 自身的冷 cache miss 属于既有 context 获取成本，单独计入
end-to-end request budget 与 telemetry，不能伪装成 entries SQL。

| 查询类型                | cursor                      | offset                            |
| ----------------------- | --------------------------- | --------------------------------- |
| 纯公共 Lite             | 1                           | 2（entries + count）              |
| Lite + viewer batch     | 2                           | 3（entries + viewer + count）     |
| 起点 pinned 展示        | 在上述预算外固定增加 1 次   | 同左                              |
| 非起点 pinned exclusion | 0；包含在 entries anti-join | 0；包含在 entries/count anti-join |

预算针对数据库 round trip，不要求把复杂逻辑强塞进一条不可维护的 SQL。允许从 1 增加到固定 2 次，但不允许查询数随 page size
增长。测试至少覆盖 size 1、20 和最大 page size，并断言三者 SQL 数量相同。

除了 query count，还必须验证：

- Lite 与原列表可见性、filter 和 sort 语义一致；
- 同一资源不会因 1:N join 在一页出现多次；
- 静态 fixture 下 cursor 跨页无重复、无遗漏；生产合同仍是 live collection，不承诺跨请求 snapshot；
- viewer batch 缺失记录时使用明确默认值；
- pinned 与普通 entries 不重复；
- offset page 2 和 cursor 后续页都不含 pinned，同一 Article 的其他 binding 不被误排除；
- 空列表不执行无意义的 batch query；
- count 由同一 scope/filter/pinned-exclusion base 独立构造，按 entry identity distinct，不复用 entries projection；
- count query 不携带列表 order、Lite select 或 preload，但保留决定 cardinality 所需的 join/distinct/group/subquery。
- 冷/热 Dashboard/bootstrap cache 下分别断言 end-to-end SQL 数量，list-query budget 本身保持不变。

### 10.4 静态检查

当前已落地 collection read inventory 和 strict gate：
[`pagination_n_plus_one_inventory.json`](../../backend/api/priv/pagination_n_plus_one_inventory.json)，
由 `pnpm check:pagination-n-plus-one:strict` 校验 freshness。它标出 list/page 函数中疑似逐项
`FrontDesk`/`Repo.get*`/ORM read；当前仅允许一个明确标记为 `background` 的例外：search reindex。
Press feed/manifest 是 service-scoped request path，已改为 batch hydrate，不再进入 allowlist。它不能替代
query-budget 测试，但不再是迁移前的 report-only 状态。

当前 strict inventory 检查
`Enum.map/flat_map/filter/reduce/reduce_while/each` 中的直接高风险调用，并追踪 collection callback 对 helper 的
函数捕获和直接调用；helper 内的 `Gate.with_*`/`MutationLock.transact_*` 同样进入清单：

- `Repo.get/get!/get_by/get_by!/one`；
- `ORM.find/find_by` 等单条数据库 helper；
- `FrontDesk.article/article_of` 等 canonical read；
- 后续登记的 domain query function。

它仍不能静态覆盖任意跨模块 helper、动态 dispatch、for comprehension 或所有事务副作用。初始严格范围为产品
read/query/list 模块；事务逐项加锁、逐项外部副作用和 maintenance workflow 必须另有 query-count/telemetry 或明确理由。
实施顺序已完成：report-only 清单、分类、请求路径修复、有理由 allowlist 和 CI strict gate
均已落地。后续新增例外必须同时补充 source/function/line/symbol、path classification、批次或 fan-out 说明、原因和测试。

Credo 无法可靠覆盖 `apply/3`、多层跨模块 helper、自定义 wrapper 和动态 dispatch，因此它只是一层高信号门禁，不能替代
query-count regression test 与 runtime telemetry。

### 10.5 查询数量测试

lint 无法可靠识别所有跨模块调用，因此核心分页增加 Repo telemetry query-count test：

- 相同 filter/sort 分别请求 size 1 和 size 20；
- cursor SQL 数量保持固定；offset 只多固定的一次 count；
- viewer state 只多固定的一次 batch；
- 同时校验顺序、无重复、空页、offset 上一页、forward cursor load-more、同排序值和 pinned 边界。

测试关注增长趋势；必要时分别声明 public、viewer 和 offset 的预算。

### 10.6 CollectFolders 存储与 entry identity

改造前 `folder.collects` 是 embedded collection，只存 `article_id`，读取时再展开 Article 的全部 bindings。它无法定义稳定数据库分页，
也会让一个 collect 变成多条展示 entry。Lateral unnest 只能缓解查询，不能修复 identity 和 count 语义。

当前已经规范化为独立表：

- `account.collect_folder_entries` 以 `(folder_id, article_binding_id)` 为唯一 entry identity；
- 初次迁移用安全 CTE 报告坏引用/不可见 binding，并只回填可解析且可见的 binding；
- `account.collect_folder_entry_backfill_failures` 保留人工处理所需的失败明细；
- expand migration 根据实际 entry 重算 `total_count` 和全部 thread counter；
- 独立 cutover migration 在删列前强制校验失败清单、期望/实际 binding 集合、总数和 thread counter；
- `collect_folders.collects` 已从运行数据库移除，runtime model/persist 不再 cast、读取或双写 embedded refs；
- cutover rollback 会从 entry rows 重建 embedded refs，不丢失 binding-scoped 收藏；
- `ArticleCollect.collect_folders` 仍是独立的 interaction projection，不是 folder entry 的第二权威。

独立表合同为：

```text
collect_folder_entries
├── id                         entry identity / cursor tie-breaker
├── folder_id
├── article_id                 resource identity
├── article_binding_id         display path owner
├── inserted_at
└── unique(folder_id, article_binding_id)
```

新写入的一条 folder entry 对应一个 binding path 和一个列表 entry。Add command 必须从用户操作的
`community/thread/inner_id` 解析 `article_binding_id`；Remove command 删除具体 folder entry。“从文件夹移除”与“取消用户对
Article 的全局 collect”是两个领域动作，不能继续依赖 embedded 数量隐式绑定。

历史 `folder.collects` 和 `article_collects` 没有保存用户当时所在 binding，不能静默猜一个 canonical binding。为保持当前读取会
展开全部 bindings 的行为，backfill 规则固定为：

1. 对每个历史 folder collect 取得 `article_id`；
2. 查询该 Article 当前有效、可见的全部 ArticleBindings；
3. 每个 binding 创建一个 `collect_folder_entry`；
4. 以 `(folder_id, article_binding_id)` 去重；
5. 没有有效 binding 的记录写入 migration report，不创建悬空 entry；
6. backfill 后比较每个 folder 的旧展开数量、新 entry 数量和异常清单。

FK 策略：

```text
folder_id            ON DELETE CASCADE
article_binding_id   ON DELETE RESTRICT
article_id           ON DELETE RESTRICT
```

Binding 删除由领域命令先检查 folder usage，并显式迁移或删除 entry；数据库不得静默 cascade 用户收藏。切换顺序由两个独立 migration
固定：expand migration 执行 create table -> backfill/report -> counter rebuild；cutover migration 执行 read verification ->
count/meta verification -> 删除 embedded arrays。command/read runtime 只使用 entry table，cutover 验证未通过时 migration fail closed。
不保留长期 dual-write。

## 11. 迁移计划

基线扫描日期为 2026-10-19，范围是 `backend/api/lib/**/*.ex`。原始文本扫描可复现为：

```bash
rg -n 'ORM\.paginator|ORM\.embeds_paginator|embeds_paginator|Repo\.paginate' backend/api/lib --glob '*.ex'
```

它得到 39 行、24 个文件，但这不是迁移门禁：其中包含 `Helper.ORM` 的 moduledoc、doctest 和函数定义。仅匹配 qualified call 的
文本口径是 37 行、24 个文件；经 AST inventory 分类后的可执行领域调用是 33 处、23 个领域文件。Phase 0 scanner 必须把每个
命中标记为 `executable_call`、`helper_definition`、`documentation_example` 或 `text_reference`，并输出文件、函数和分类。

当前 scanner 已落地为 `scripts/check-pagination-inventory.mjs`，测试和 freshness/strict
命令分别是 `pnpm report:pagination-inventory` 与 `pnpm check:pagination-inventory:strict`。
checked-in manifest 当前记录 0 个 executable call、0 个 helper definition；历史基线中的
33 个可执行调用已经全部迁移或得到明确 disposition。原始 `rg` 仍可能命中文档中的历史
术语，但不再构成 runtime 门禁缺口。

Phase 0 inventory 是迁移 manifest，不是附属报告；Phase 5 的硬门禁已经通过。Helper owner、
Scrivener 依赖和旧 adapter 已删除，当前只保留 Pagi API、legacy response adapter 和具名
composite/bounded workflow。

### Phase 0A：全量 inventory 与基线

每个调用点归入以下类别并指定 owner/disposition：

| 类别                | 示例                                  | 处置                                   |
| ------------------- | ------------------------------------- | -------------------------------------- |
| public paged        | Articles、Comments、Communities       | 标准 Pagi + Lite + consumer migration  |
| internal bounded    | moderation、reaction users            | 判断保留具名 bounded batch 或接入 Pagi |
| synthetic composite | grouped Kanban、default communities   | 具名集合协议，不机械套单一 Page        |
| aggregate abuse     | Community.Count 用 `size: 1` 取 total | 改为明确 aggregate query               |
| embedded collection | CollectFolders                        | 先改存储和 entry identity              |

Inventory 同时覆盖 GraphQL field、PageSizeProof 使用方、前端 consumer、内存分页、逐项 read 和无界 `Repo.all`。关键路径
已记录 size 1/20/max 的 SQL 数量、网络 batch 数量和延迟；`NoPerItemQuery` 的高信号实现
由 checked-in allowlist + strict gate 执行，跨模块动态 helper 仍由 query-count/telemetry 测试兜底。

### Phase 0B：冻结跨层合同

实施前冻结：

- `Pagi.Params.*` 与 `Pagi.Page.*`；
- `Pagi.Order` 和 ORDER BY 唯一 owner；
- 每个首批 surface 的 entry identity/tie-breaker；
- `Pagi.CursorCodec`、error reasons 和 query fingerprint；
- `ArticleLite` flat selected map 的私有 cursor fields + `cursor_value_func`，不引入 `ArticlePageRow` 或嵌套 pagination projection；
- entries/count/pinned 口径；
- GraphQL `@oneOf`、PageInfo 和旧字段版本窗口；
- Dashboard pagination config 到 `%GroupherServer.Pagi.EffectiveConfig{}` / `%Helper.ORM.Pagi.Config{}` 和可选 `ORM.pagi(config: ...)` 的映射、硬约束语义、schema version、整数 revision、平台默认值及
  SSR/bootstrap 路径；
- 前端 offset/infinite query key 和 per-page state batch 合同。

### Phase 1A：Articles capability spike

在建立通用 Pagi 前，用 Articles 最难的 `upvotes/comments/views` 排序验证：

- Flop schema 仅开放 `pagination_types: [:first, :page]`，不允许 `:last` 或裸 `:offset` 穿过公共合同；
- 使用 `tiebreaker: false` 后，`Pagi.Order` 中的完整 cursor fields 和 entry identity 仍进入 ORDER BY 与 cursor；
- Flop join/custom field/field path；
- flat selected map + `cursor_value_func` 能稳定读取私有 cursor projection，并作为唯一 adapter 合同；
- alias field 不进入 cursor，custom/join field 无法可靠工作时切完整 Groupher cursor adapter；
- nullable field ordering；
- stats row 缺失时 `coalesce(..., 0)` 与真正 nullable field 的 NULLS 语义；
- binding entry identity 和唯一 tie-breaker；
- 所有 cursor fields 被 Lite select；
- cursor encode/decode/fingerprint/signature；
- 同一 base 的 entries 与 distinct binding count；
- offset 与 cursor 在相同 filter/sort 下顺序一致。

以上项目是 Phase 1A 的强制退出条件，必须全部通过后才能进入 Phase 1B。任何 custom/join sort 无法可靠分页，或 cursor value
extraction/tie-breaker 不完整时，
在 spike 阶段切换为同时拥有 predicate、ORDER BY 和 cursor extraction 的 Groupher cursor adapter，不把缺口留到 Articles migration，
也不允许 Flop 与自研 adapter 各处理一半。

### Phase 1B：Pagi 基础设施

- 已完成：引入 Flop，不引入 Flop Phoenix；
- 已完成：建立 `Helper.ORM.Pagi`、`Helper.ORM.pagi/3`、Params/Page/Order/CursorCodec；
- 已完成：Count adapter、错误映射、分页 telemetry 和 resource-specific distinct entry identity；
- 已完成基础回归：forward cursor、签名/fingerprint、非法参数、max size、deep offset、空页输出 shape、NULL/tie-breaker
  的真实 Articles resource case；
- 已完成：建立 schema registry，测试 `schema_version: 1` 的固定 api/mode 矩阵、支持集合和唯一 registry 来源；
- 执行 Dashboard pagination config adoption preflight：首期确认无存量 config；若发现存量，则先完成
  `schema_version: 1` backfill、revision 递增和 cache 失效，再启用严格校验；
- 已完成：按 4.1 测试合法 api/mode 组合、未知 config key、normalization、`platform_hard_max` 注入、非法 size
  和“配置错误先于请求错误”的优先级；mode 不进入 ORM 的行为由相同 execution config 覆盖；
- 已完成 v1 支持集合与停止支持旧 schema 的 fail-closed 测试基线；schema 扩展迁移仍待实际 Dashboard 存储出现后落地；
- 已完成：用 schema introspection 和 document validation 验证 Absinthe `@one_of` 生成标准 `@oneOf` 合同；
- 已完成：base query 已带普通列表 order 时 fail fast。

### Phase 2：Articles 参考实现

- 已按统一目录拆分 `detail/paged/pinned/filters/sorts` 责任；
- 已定义 ArticleLite 和 SQL 查询预算；
- 普通分页已接入共享 Pagi；published/Kanban 保留具名 joined composite，先分页 binding identity，再做一次有界完整 projection batch；
- grouped Kanban wrapper 保留具名 synthetic composite，由多个 paged board 组成，不提供整个 grouped result 的单一 cursor/pageInfo；
- pinned 已独立返回；
- 普通 page 中逐条 `FrontDesk.article` 已删除；
- checklist 已复制到 CollectFolders、Trash、Comments、AbuseReports、Assets 和 SearchArtiments background exception 清单。

Articles 是第一个模板，不获得 Pagi 特权。

### Phase 3：按 inventory 迁移

CollectFolders、upvotes、trash、Comments stable Article 与 `commentPage` backend、AbuseReports 和 Assets usages 已完成；Comments rich
Core/Community consumer 明确留在 compatibility inventory；SearchArtiments 的后台 binding fan-out 保留为唯一
具名 `background` exception，Press request path 已从 strict allowlist 移除。

每个 manifest item 已得到一种终态：迁移到 Pagi、改成 aggregate、保留具名 bounded batch、建立 synthetic collection contract，
或带理由豁免。标准 paged resource 同时落 Lite、目录、entry identity、query budget test 和 consumer；禁止只换分页库。

### Phase 4：前端与产品配置

- 已建立 Core offset/cursor types、Params adapter 和共享组件；
- `mode: :page` surface 用 `useQuery` 接入 offset，`:load_more | :infinite_scroll` surface 用 `useInfiniteQuery` 接入 cursor；
- 已统一 browser/SSR query-key builder，删除 loader 中手写的固定 page 1 key；
- 已完成 per-page/chunk stats、viewer、interaction batch 和 infinite SSR hydration；
- 已接入 load-more、list invalidation、optimistic update、scroll restoration，以及显式的 initial/next-page error 与 retry 状态；
- 保留 ArticleStats batch owner，避免 Paged Article 与 stats query 重复返回同一状态；
- 社区设置表达 UI 行为，不表达底层库参数；
- 验证 Dashboard api/mode/schema_version/revision 变更后的 cache reset、URL 可分享性和回退行为；
- 增加 schema/field-level test，证明新 `postPage/changelogPage/commentPage` resolver pipeline 不经过 `PageSizeProof`；
- 同一 surface 不根据设备自动改变结果语义。

### Phase 5：收口

- 所有 runtime 调用方已离开 `ORM.paginator`、`Repo.paginate` 和 `embeds_paginator`；
- Phase 0 manifest 的旧调用已归零，并由 strict inventory gate 固定；
- Scrivener、Repo `use Scrivener` 和旧 paginator adapter 已删除；保留的 GraphQL legacy response 只作为领域兼容输出，底层走 Pagi/Lite；Generic offset fallback 仍是明确登记的过渡 adapter，不得被误报为已删除；
- collection read strict gate 已启用；SearchArtiments 唯一 background exception 有 source/function/line/symbol 和原因，Press 已 batch 化；
- `Helper.T`、GraphQL PageInfo/new page resolver 和 frontend transport contract 已对齐。

## 12. 验收标准

- `Helper.ORM.pagi/3` 是唯一通用分页入口；
- 输入只使用 `Pagi.Params.*`，输出只使用 `Pagi.Page.*`；
- `Sorts.resolve` 不写 Ecto order，普通列表 ORDER BY 只由 `ORM.pagi`/adapter 应用；
- Flop 类型不出现在 GraphQL、前端 contract 或领域 facade 返回值中；
- offset 与 cursor 共享 scope/filter/sort/Lite query；
- 每个 surface 声明 entry identity，每个 cursor sort 都以该 identity 唯一决胜；
- cursor 经过 version/fingerprint/signature codec，cursor 默认不 count；
- Offset count 与 entries 使用同一 scope/filter/pinned anti-join，并按 entry identity distinct；
- nil Params trusted synthesis、Community Dashboard config 缺失时的显式 cursor 拒绝、平台默认 query key/SSR hydration、config 存在但
  缺 revision、字段级 merge、revision 脏数据、invalid config/context、config mismatch subtype、unsupported api、page/size/hard-max、
  SSR 仅对 revision mismatch 单次重试与可恢复 shell、Dashboard 各配置段整数 revision 隔离均有测试；
- 核心列表 size 1 与 size 20 的 SQL 数量保持常数；
- infinite list 新增一页不会重取全部历史 stats/viewer/interaction IDs；
- 不存在先 hydrate 全集合再内存分页的请求路径；
- pinned 与普通 entries 分离；cursor 编码不含 pin 状态，pin/unpin 按 live collection 语义使相关列表 family 失效；
- 所有分页资源遵循统一目录，没有 mobile/desktop 查询分叉；
- resolver 不直接调用 Flop、Repo 或拼 filter/sort；
- FrontDesk 没有新增 page/list/search；
- Scrivener、`ORM.paginator` 与 `ORM.embeds_paginator` 已删除；legacy response adapter 不再包含旧数据库分页实现；Generic 只允许作为已登记的 offset 过渡 adapter 存在；
- scanner 覆盖直接读取和同文件一层 helper；跨模块间接调用仍须由 query-count 测试证明；
- Absinthe `@one_of` 生成 SDL `@oneOf` 的 introspection/document validation、cache key、SSR infinite hydration、空页、forward cursor
  和非法参数有测试；
- Phase 0 manifest 中 33 个可执行领域调用全部得到终态，当前 executable inventory 为 0；剩余完整正文读取仅是一个 background allowlist exception。

## 13. 剩余实施选择

- Flop 版本与当前 Ecto/Elixir 的兼容范围；
- 各 sort 使用 Flop join/custom field 还是 Groupher cursor adapter，以 Phase 1 spike 为准；
- viewer state 使用单 SQL join 还是固定的一次 batch，但不得突破固定预算；
- `ORM.Pagi` 平台默认 config、各 Dashboard 配置段允许覆盖的字段和最大 page size；
- GraphQL 旧 offset 字段的具体下线日期；
- ErrorCat 的最终数值 code；
- 每个高频 filter/sort 的具体复合索引。

这些细节不得改变稳定边界：领域拥有语义，Lite 拥有列表形状，`Helper.ORM.Pagi` 拥有机制，Flop 只是 adapter。

## 14. 完整性复查补充

以下能力也属于分页改造的交付范围，不能留到上线后再发现：

### 14.1 数据库索引与查询计划

- 为每个开放的 filter + sort 组合审计复合索引；
- cursor entry identity 必须进入匹配排序方向的索引尾部；
- 对常用 community/thread/lifecycle scope 使用 `EXPLAIN (ANALYZE, BUFFERS)` 建基线；
- count 与 entries 分别评估，不能假设 entries 快则 count 也快；
- 深 offset 是已知退化路径，产品和 API 需要最大 page/depth 策略。

### 14.2 NULL 与时间语义

- 每个可排序 nullable 字段显式定义 `NULLS FIRST/LAST`；
- cursor 编解码必须保留 null 位置语义；
- 时间字段使用 UTC，排序精度与数据库列精度一致；
- 相同 timestamp 依靠该 surface 的 entry identity 决胜，不能依靠数据库隐式顺序。

### 14.3 并发变化语义

cursor 分页提供稳定位置，不等同于数据库 snapshot。翻页期间 create、delete 或 sort-field update 仍可能改变后续集合。

- 默认合同是 live collection，不承诺跨请求 snapshot isolation；
- entry identity tie-breaker 和去重避免常见重复，但客户端不能假设总集合冻结；
- 审计/导出等需要快照一致性的场景应使用独立 export/job 协议，而不是普通 Pagi；
- mutation 后按既定 invalidation 规则从集合起点或相关列表重新验证。

### 14.4 Cursor 安全与演进

- cursor 必须 opaque、URL-safe、有版本；
- cursor 包含或绑定 sort、direction 和必要的 query fingerprint；
- cursor 使用 HMAC signature 防止 payload 被客户端任意改写；
- 非法、篡改、query mismatch、cursor version 不支持和 key version 不支持分别映射为稳定领域错误；
- cursor 不放入敏感字段或可用于越权推断的数据；
- 首期不设置 TTL，因此暂不产生 expired cursor；客户端永远不能提交原始 SQL/order value map。

### 14.5 可观测性

分页 telemetry 至少包含 resource、surface、api、schema version、config revision、是否使用平台默认 config、page size、sort、query count、DB duration、
count duration 和 result count；Dashboard/bootstrap cache 指标继续由原有配置 owner 记录，Pagi 不重复维护。
前端 telemetry 包含每次新增 page 的 stats/viewer/interaction batch 数、重复 entry 和 retry，
不得记录完整 cursor 或敏感 filter 值。为以下异常建立观测：

- query count 随 size 增长；
- 深 offset 或慢 count；
- `page_out_of_range`、`size_out_of_range` 和 `deep_offset_rejected` 分别观测，不能合并成无上下文的参数错误；
- invalid/signature/query-mismatch/unsupported-version-or-key cursor；
- `invalid_config_context`、`invalid_config`、`config_mismatch`（含内部 revision/api subtype）和 `unsupported_api`，用于区分请求结构、
  配置约束、客户端 stale 和不支持的分页 API；
- cursor page 重复 entry identity；
- 前端 load-more 重试率和模式切换后的双请求。

### 14.6 兼容与发布

- 先新增 offset/cursor 新合同并迁移 consumer，再删除旧 page 字段；
- 不在同一 GraphQL 字段中根据请求猜测两种不兼容返回 shape；
- 按 surface 灰度，而不是一次切换全部资源；
- 灰度开关关闭时回到旧 surface contract，不在服务端把 cursor 偷换成 offset；
- 每阶段都有旧调用计数，归零后才能删除 Scrivener 和兼容字段；
- rollback 不依赖恢复已经删除的 cursor/index 数据结构。

Legacy 清理必须以可验证的退出条件收口：每个旧 GraphQL field 和前端旧 document 记录
consumer count、deprecation reason、观测窗口和计划删除版本；`Page.to_legacy/1` 则单独记录
runtime call-site count，不能把领域内部兼容返回与 GraphQL field consumer 混为一个计数。consumer
归零、观测窗口结束且新 Page contract 的 query-count/type tests 通过后，才能按“前端旧 document ->
GraphQL deprecated field -> legacy response adapter”的顺序删除。

## 15. Phase 0 paginator inventory 基线与当前状态

以下表格保留 Phase 0 的初始 manifest，便于审计当时的风险判断；它不是当前 runtime 状态。每个具体调用已经完成 disposition，
当前 executable inventory 以 [`pagination_inventory.json`](../../backend/api/priv/pagination_inventory.json) 为准，结果为 0。
N+1 例外以 [`pagination_n_plus_one_inventory.json`](../../backend/api/priv/pagination_n_plus_one_inventory.json) 为准，当前只有
SearchArtiments 一个 `background` allowlist 项；Press request path 已 batch 化。

| 文件                                     |                命中 | 初始类别/处置方向                                                   |
| ---------------------------------------- | ------------------: | ------------------------------------------------------------------- |
| `accounts/achievements/moderatorable.ex` |                   1 | internal/product page，确认 consumer 后决定 Pagi                    |
| `accounts/collect_folders/articles.ex`   |                   1 | embedded collection，先切独立 entry table                           |
| `accounts/collect_folders/list.ex`       |                   1 | public paged，标准 Pagi                                             |
| `accounts/fans/list.ex`                  |                   1 | public paged，标准 Pagi                                             |
| `accounts/profiles/list.ex`              |                   2 | 一条标准 Pagi；default communities 为 synthetic composite           |
| `accounts/search/user.ex`                |                   1 | public search page，标准 Pagi                                       |
| `accounts/upvotes.ex`                    |                   1 | public paged + N+1，高优先级 Lite/batch                             |
| `activity/article_log.ex`                |                   1 | product page，确认 entry identity 后 Pagi                           |
| `cms/abuse_reports/query.ex`             |                   2 | management page + N+1，标准 Pagi/Lite                               |
| `cms/articles/moderation.ex`             |                   1 | management page，标准 Pagi                                          |
| `cms/articles/trash.ex`                  |                   1 | management page + 至少 `5N`，高优先级 Lite                          |
| `cms/artiment_mentions/store.ex`         |                   2 | internal bounded/maintenance，确认后保留具名 batch 或迁移           |
| `cms/assets/query.ex`                    |                   2 | refs page 标准 Pagi；`usages/3` 另有无界读取，不在 paginator 命中内 |
| `cms/comments/moderation.ex`             |                   1 | management page，标准 Pagi                                          |
| `cms/comments/query.ex`                  |                   5 | public/management pages；stable Article 路径有 N+1                  |
| `cms/communities/count.ex`               |                   1 | aggregate abuse，改明确 count query                                 |
| `cms/communities/moderators/query.ex`    |                   2 | product pages，标准 Pagi                                            |
| `cms/communities/query.ex`               |                   1 | public paged，标准 Pagi                                             |
| `cms/communities/subscribers/query.ex`   |                   2 | product pages，标准 Pagi                                            |
| `cms/interactions/reaction_users.ex`     |                   1 | product bounded page，标准 Pagi 或具名 bounded collection           |
| `cms/search/community.ex`                |                   1 | public search page，标准 Pagi                                       |
| `messaging/mentions/query.ex`            |                   1 | account product page，标准 Pagi                                     |
| `messaging/notifications/query.ex`       |                   1 | account product page，标准 Pagi                                     |
| `helper/orm.ex`                          | raw 6 / qualified 4 | 1 个可执行 Repo adapter，加上 definitions/docs；领域调用归零后删除  |

Phase 0 之后补入、并已完成处置的同一改造面包括：

- Articles 手写 offset/count 与逐条 FrontDesk hydrate：普通列表已迁移；Kanban/published 保留具名 joined composite；
- grouped Kanban 多 Page composite：保留并明确为 synthetic contract；
- Assets `usages/3` 无界 `Repo.all` 与 replacement plan 逐 Article 读取/加锁：改为 100 行一批的完整 snapshot，
  plan preview 纯内存组装，apply command 事务内重验；Doc replacement 首期显式 unsupported；
- Press feed/manifest：复用 Articles Pagination，按 100 条 batch hydrate，不登记 allowlist；
- Search index：登记 strict `background` exception；500 roots 不等于 binding fan-out 有界；
- 所有 GraphQL `PageSizeProof` consumer：新 Page resolver pipeline 已接入，legacy response 由领域 adapter 兼容；
- 前端 offset hooks、SSR loaders、query keys、invalidation 和分页组件：已切换到 spec/params/query-key contract。
