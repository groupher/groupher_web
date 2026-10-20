# Policy Boundary

> 状态：current

本文定义 Groupher 后端 `Policy` 的职责、调用位置和命名边界。它约束新代码，也作为现有模块重构时的判断标准。

## 1. 定义

`Policy` 是基于 actor、action、typed context 和已经取得的业务事实作出准入决策的规则层：

```text
actor + action + canonical facts + typed context
                         |
                         v
                       Policy
                         |
                 +-------+-------+
                 |               |
              allow            deny
                 |               |
                 v               v
          {:ok, :pass}   {:error, stable reason}
```

Policy owns decisions, not data and not execution。Lifecycle 仍是资源状态、合法 transition、
blocker 和 actor-independent capability predicate 的唯一权威；Policy 不复制 Lifecycle 状态矩阵。

Policy 通常回答：

- 当前 actor 是否可以对这个具体资源执行 action；
- 给定 Lifecycle 已计算出的状态、transition/capability facts，当前 actor 是否可以执行该动作；
- 已分类的请求是否可以进入计数、投递或其他受控流程；
- 某个集合读取意图应该被限制到哪些可见行。

普通配置、参数转换、数据加载、分页和工作流不是 Policy。

## 2. 在后端链路中的位置

### 2.1 单资源 Access

```text
API / Command
      |
      v
Gate Access Load
├── canonical resource
├── Lifecycle
├── ancestor resources
├── Passport / capability facts
└── typed Context.Access
      |
      v
Gate.Access.Policy
      |
  +---+---+
  |       |
pass    stable denial
  |       |
  v       v
Workflow  ErrorCat
  |
  v
Persist -> Effects
```

Gate 负责在明确的事务/锁边界内加载和锁定事实；Policy 只消费事实并作决定。写命令不得绕过 Gate，自己加载一套资源后直接拼权限条件；没有 canonical resource 的已登记 domain admission（例如 Application create）必须在其 pipeline gate stage 内显式组织准入。Policy 也不得在 facts 缺失时隐式调用 `Passport`、`FrontDesk`、Query facade 或 Repo 补查；必需事实缺失时应 fail closed。

已有资源的标准入口是：

- `GroupherServer.CMS.Gate.Access.Policy`；
- `Gate.Access.Policy.Article`；
- `Gate.Access.Policy.Comment`；
- `Gate.Access.Policy.Community`；
- `Gate.Access.Policy.Application`：只处理已经存在的 Application resource。Application create 尚无
  canonical resource，不属于普通 resource Gate；其准入目标 owner 是
  `CommunityApplications.Admission`。

### 2.2 集合 Scope

`Gate.Scope.Policy` 是 Gate 内部的 Scope query behavior。它把读取准入下推为 Ecto query，
而不是返回单资源 allow/deny；各 resource 模块是 Scope query implementation，不能据此扩展出
第二套通用领域 Policy 或 runtime registry：

```text
base query + actor + action + typed Context.Scope
                         |
                         v
                  Gate.Scope.Policy
                         |
                         v
               visibility-scoped query
```

Scope Policy 只拥有可见性约束，不拥有调用方的业务 filter、sort、projection 或 pagination：

```text
base query
  -> Gate.scope
  -> Filters.apply
  -> Sorts.resolve
  -> Lite.select
  -> ORM.pagi
```

## 3. 与相邻概念的边界

| 概念         | 回答的问题                   | 典型输出                   |                          是否写库 |
| ------------ | ---------------------------- | -------------------------- | --------------------------------: |
| Config       | 系统或管理员配置了什么       | 配置值                     |                 由配置 owner 修改 |
| Params       | 请求表达了什么               | 规范化参数                 |                                否 |
| Load/Facts   | 当前事实是什么               | canonical resource/context |                                否 |
| Lifecycle    | 当前状态及合法状态转换是什么 | state/transition           | 可持久化受保护的 transition/event |
| Policy       | 给定事实，动作是否准入       | allow/deny + reason        |                                否 |
| Gate Access  | 加载事实并执行 Policy        | authorized context         |                                否 |
| Gate Scope   | 哪些行对当前读取意图可见     | scoped query               |                                否 |
| Workflow     | 准入后执行哪些步骤           | 业务结果                   |                          可以协调 |
| Persist      | 如何原子写入                 | persisted result           |                                是 |
| Effects/Jobs | 提交后发生什么               | delivery result            |                      可能有副作用 |
| ORM.Pagi     | 已选定的查询如何分页         | Page                       |                                否 |

### 3.1 Policy 与 Passport

Passport/Gate Action Requirement 是粗粒度能力授权；resource Policy 是加载具体资源后的最终准入：

```text
passport grants post.edit
          |
          v
loaded Article is archived
          |
          v
Article Policy denies edit
```

拥有 action grant 不代表任意状态下都能操作资源。

### 3.2 Policy 与 Lifecycle

```text
Lifecycle
  owns states and transitions
          |
          v
Policy
  decides whether this actor/action may use them now
          |
          v
Workflow
  executes the admitted transition
```

Lifecycle 先判断状态、transition、blocker 和 actor-independent capability；Policy 再组合这些
已加载 facts 与 actor、Passport 和资源关系作准入。Policy 不修改 Lifecycle，也不重新实现
Lifecycle transition matrix；Lifecycle 不读取 Passport 并代替 Gate 做授权。

Lifecycle 可以拥有受保护的 transition 及其 event 持久化；普通资源 insert/update/delete 的细节仍归 Persist。本合同禁止的是 Policy 写库，不是禁止 Lifecycle 实现原子状态转换。

### 3.3 Policy 与 Config

Config 解析后的 typed value 可以成为 Policy 的输入，但 Policy 不拥有配置存储，也不直接调用 `Application.get_env/3` 或其他 config loader：

```text
Config owner -> configured threshold/flag
Facts loader -> current facts
                    |
                    v
                  Policy
                    |
                    v
                 decision
```

以下内容属于 Config，不应创建 Policy 子系统：

- Dashboard 的分页 API 和 UI mode；
- cache TTL、请求 timeout、retry 次数；
- feature flag 和 provider credentials；
- page size、batch size 和部署环境开关。

## 4. Policy 应该做什么

- 接受明确的 actor、action、resource/facts 和 typed context；
- 返回稳定、可注册到 ErrorCat 的拒绝原因；
- 默认 fail closed，未知 actor/action/context 不得隐式放行；
- 对相同输入产生相同决定，尽量保持纯函数；
- 组合 Lifecycle、ancestor state 和领域 enablement 等已加载事实；
- 让 GraphQL、CLI、Job 等入口通过相同 Gate/Workflow 复用规则；
- 对关键 allow/deny 矩阵做独立单元测试；
- 只有历史事件需要解释规则版本时才暴露 policy version。

### 4.1 返回合同按边界分层

Policy 不强制所有领域共用一个返回 struct，但业务返回必须保持 tagged tuple：

```text
Gate Access internal policy
  -> {:ok, :pass} | {:error, ErrorCat.error()}

Domain admission policy with explainable/persisted decision
  -> {:ok, Decision.t()} | {:error, Decision.t()}

Closed predicate policy
  -> boolean
```

`Gate.access_check/3` 的公开成功值仍是 canonical resource，不是 `:pass`。boolean 只适用于
ViewTracker 这类不承担 ErrorCat 协议、且输入已经归一化的封闭 predicate；需要拒绝原因或
持久化 snapshot 的 Policy 必须返回 tagged tuple。

## 5. Policy 不应该做什么

Policy 不应：

- 拥有配置 CRUD、cache、backfill 或 bootstrap；
- 解析 GraphQL、HTTP、URL 或分页参数；
- 自己加载完整 resource graph，或隐藏逐项 Repo 查询；
- 开启事务、加锁、写表或更新 Lifecycle；
- enqueue Job、调用 provider、发送事件或刷新缓存；
- 拥有 Workflow、Persist 或 Effects 编排；
- 负责 filter、sort、Lite projection、count 或 pagination；
- 因为一个模块包含“规则”就统一使用 `Policy` 后缀；
- 成为跨领域的万能 `Policy` context。

局部算法可以使用小写术语 `policy` 描述封闭策略，例如 codec 的字段编码策略，但这不自动意味着需要创建领域 `Policy` 模块。

## 6. 当前样本（无未登记偏差）

### 6.1 Gate Access Policy

`CMS.Gate.Access.Policy.Article` 消费已加载的 Article、Lifecycle、Community 和 typed context，判断 read、publish、edit、restore、
interaction 等 action 是否允许。它不负责加载和写入，是资源准入 Policy 的标准样本。

`CMS.Gate.Access.Policy.Community` 现在只消费 `Context.Access.Community` 中的
`community_lifecycle` 和 normalized `passport_rules`。`Gate.Access.Load.Query.community/2`
负责在 Gate 的事务/锁边界内加载这些 facts；Policy 不再通过 `Communities.Passport` 或其他
Query facade 隐式补查。缺失 lifecycle 或 passport facts 时保持 fail-closed。

### 6.2 Gate Scope Policy

`CMS.Gate.Scope.Policy` 定义 resource-specific Scope query contract。它只把可见性下推到 query，后续 filter/sort/pagination 仍由各自
owner 处理。

### 6.3 ViewTracker Policy

`CMS.ViewTracker.Policy` 与 `Accounts.ProfileViewTracker.Policy` 根据 normalized identity 和 read purpose 决定是否计数：

```text
public human/verified agent -> admitted
preview/moderation/probe    -> excluded
```

它们不执行 UPSERT，也不生成 identity。这类命名明确的 predicate Policy 可以返回 boolean；需要 ErrorCat 映射的 admission/authorization Policy 仍应返回 decision 或 tagged tuple。`CMS.ViewTracker.Policy.version/0` 仅用于解释历史 analytics event 使用的规则版本，不是配置开关。

## 7. 命名判断

新模块命名为 `Policy` 前必须同时回答：

1. 它是否主要回答 allow/deny，而不是返回配置或实体？
2. 输入是否包含 action/intent 与已经取得的 facts/context？
3. 输出是否是 decision/reason，而不是持久化结果？
4. 是否能在不写库、不发消息的情况下执行？
5. 是否需要被多个入口一致复用？

若多数答案为否，应使用更准确的名字：

```text
配置值                 -> Config
读取事实               -> Query / Load / Facts
名称占用查询           -> Availability
参数规范化             -> Params / Codec
后台任务强制投递       -> RequiredJobs / JobContract
状态变化               -> Lifecycle / Workflow
数据库写入             -> Persist
缓存投递参数           -> DeliveryConfig
分页                   -> ORM.Pagi
```

## 8. Review checklist

- Policy 是否通过 Gate 或明确的领域 workflow 调用；
- Policy 输入是否已经是 canonical facts；
- 是否存在 `Repo.*`、`ORM.*`、`Application.get_env/3`、外部请求、Job enqueue 或写操作；
- 是否通过 `Passport`、`FrontDesk`、Query/domain facade 间接加载事实；
- 拒绝原因是否稳定且 fail closed；
- 是否把 Config/Params/Lifecycle/Persist 职责吸入 Policy；
- Scope Policy 是否只处理 visibility；
- 测试是否覆盖 actor × action × lifecycle/facts 的允许和拒绝矩阵。

现有不符合本合同的模块及修复顺序见 [`policy-boundary-fix.md`](../migrations/policy-boundary-fix.md)。
