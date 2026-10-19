# CMS Command Pipeline Contract

> 状态：pipeline foundation 与 CMS concrete Command 迁移已完成；Backend 通用 runner 第一阶段（Accounts/Messaging）已完成（2026-10-19）
>
> 当前已实现 `receipt_pipeline`、`direct_pipeline`、`workflow_pipeline` DSL/runner、Gate join-only API、
> `Activity.log_rejection/3`、三份可审查 manifest 和 CI fail-closed graph gate。通用 runner 通过 Context adapter
> 接入非 CMS Command；CMS manifest 仍只覆盖 CMS。具体数量与测试结果以当前
> 生成产物和 CI 为准，不在合同正文中固化快照。

本文定义 CMS 写操作从 public facade 进入 Command 后，如何由固定 pipeline runner 执行 Gate、
Lifecycle、Persist、Receipt、Confirmation 和内部 workflow。目标不是改变 public facade，也不是新增
一份与 Command 平行的 action 配置；pipeline 声明本身就是 concrete Command 的可执行合同。

相关合同：

- [`cms-command.md`](./cms-command.md)：Receipt、`commandId` 与 ambiguous commit 协议；
- [`cms-command-confirmation.md`](./cms-command-confirmation.md)：Confirmation encode/decode 与恢复协议；
- [`cms-multi-entry-boundary.md`](./cms-multi-entry-boundary.md)：GraphQL、CLI、MCP、Agent 等入口复用
  public facade 的边界；
- [`graphql-resolver-boundary.md`](./graphql-resolver-boundary.md)：GraphQL resolver 的 transport 边界；
- [`../feature/gate/v5.md`](../feature/gate/v5.md)：Gate admission 与 canonical resource 合同；
- [`../feature/lifecycle/contract.md`](../feature/lifecycle/contract.md)：Lifecycle 状态与 transition 合同；
- [`../migrations/cms-command-gate-lifecycle-persist-boundary.md`](../migrations/cms-command-gate-lifecycle-persist-boundary.md)：
  当前 Command、Gate、Lifecycle、Persist 的迁移边界。

发生冲突时，Receipt 细节以 `cms-command.md` 为准，具体领域规则以对应 Gate/Lifecycle 文档为准；
本文拥有 Command pipeline 的类型、阶段顺序、分层拓扑和迁移验收标准。

## 1. 审计结论

现在的 CMS 写操作可以由三种 pipeline 覆盖，但不能只用最初的
`load -> gate -> lifecycle -> change -> confirm` 五阶段模型。

完整结论是：

1. `receipt_pipeline` 是需要 Receipt、Confirmation 和首次结果恢复的顶层写入；
2. `direct_pipeline` 是不需要 Receipt 的顶层写入；
3. `workflow_pipeline` 是可被前两者调用的内部多步骤事务，不是第三种 public entry；
4. 顶层 pipeline 还需要可选的 `prepare`、`present`、少量显式 `on_rejection`，以及外部资源失败补偿用的
   `cleanup` 阶段；
5. workflow 需要命名步骤和步骤结果，单一“上一步结果”不能覆盖现有 `Ecto.Multi` 型流程；
6. routing function 只负责路由，不属于 pipeline，也不能持有 Gate、Persist 或 transaction；
7. pipeline runner 严格按源码声明顺序执行，并在编译期拒绝乱序、缺失、重复和未知阶段；
8. public facade 的函数名、参数和返回合同保持不变。

三者的关系不是并列的三种入口：

```text
Transport
  -> CMS public facade
  -> Command entry
       ├─ receipt_pipeline
       │    └─ 可调用 workflow_pipeline
       └─ direct_pipeline
            └─ 可调用 workflow_pipeline
```

## 2. 为什么整体链路可以由 pipeline 约束

pipeline macro 在 concrete Command 中同时声明：

- 这是什么执行协议；
- 允许出现哪些阶段；
- 阶段必须按什么顺序声明和执行；
- 哪些 metadata 与阶段是必需的；
- transaction、Receipt 和 Confirmation 由哪个 runner 管理。

Command 作者仍然实现具体业务函数，例如 `stable_article/1`、`check_publish_gate/3` 和
`publish_article/3`；runner 不理解业务，只负责固定执行骨架。Command 内不需要手工构造公开
`Context`、`Command` struct 或调用 `Runner.run(__MODULE__, ...)`。

示例：

```elixir
@pipeline operation: :article_publish, confirmation: PublishConfirmation

receipt_pipeline execute(article, actor, opts) do
  prepare fn -> article.id end
  gate fn article_id -> check_publish_gate(article_id, actor, opts) end
  lifecycle fn canonical -> check_publish_lifecycle(canonical, actor, opts) end
  change fn canonical -> publish_article(canonical, actor, opts) end
  confirm fn result -> PublishConfirmation.from(result) end
  present fn confirmation -> RevisionResult.build(confirmation, actor) end
end
```

这里每一行都是声明，也会成为 runner 的真实执行步骤。诸如 `check_publish_gate/3` 的具体实现仍是
Command 的私有函数；pipeline 只让主流程保持一眼可读。

## 3. 三种 pipeline

### 3.1 `receipt_pipeline`

适用于重试可能重复产生事实，或者响应丢失后必须恢复首次确认结果的用户写操作。

固定顺序：

```text
prepare?                                      # transaction 外，只做输入归一化/定位
  -> BEGIN
  -> Receipt.claim
  -> gate | load?                             # user 必须 gate；internal 才可用 load；二者不并存
  -> lifecycle?
  -> change | workflow                        # 二选一
  -> confirm                                  # transaction 内生成可持久化 Confirmation
  -> Receipt.finalize
  -> COMMIT
  -> present?                                 # commit 后构造 public domain result

Gate/Lifecycle/change/workflow 明确返回业务拒绝
  -> ROLLBACK
  -> 若声明 on_rejection：BEGIN error transaction # runner 拥有，与已回滚主事务相互独立
  -> on_rejection                                 # 只写允许的 rejection Audit/Activity
  -> COMMIT / ROLLBACK error transaction
  -> 返回原始错误

Receipt 协议错误或内部故障
  -> ROLLBACK / 普通错误返回                  # 不执行 on_rejection
  -> 若 prepare 已取得外部 capability 且声明 cleanup：best-effort cleanup
```

顶层 `@pipeline` metadata：

- `operation`：`receipt_pipeline` 与 `direct_pipeline` 都必需，是稳定的业务动作 identity；
- `confirmation`：只有 `receipt_pipeline` 必需，提供 Confirmation codec；
- `access`：默认 `:user`；`user` 表示必须有 actor 和 Gate，`internal` 表示系统内部入口，
  `open` 表示没有 Gate 权威、也不做 actor admission 的通用 Context 动作。`open` 不是授权旁路，不能用于
  CMS，也不能用来替代用户动作的 actor/Gate 校验；它只能由非 CMS Context 显式声明。

`operation` 不随执行协议改变。一个 `direct_pipeline` 以后升级为 `receipt_pipeline` 时必须保留原 atom，只增加
Receipt、Confirmation 与 recovery 能力，不能因为升级协议创建新的业务动作 identity。这样历史 intent、
Audit/Activity、telemetry 与后续 Confirmation 才能连续。

同一个 Command 模块可以同时暴露直接写入和 Receipt 两个入口，但它们必须是两个静态声明、两个明确函数；
facade 在调用点选择入口，runner 不读取 `command_id`、opts 或 tuple 形状来猜协议。二者同时存在时代表两个
独立且长期稳定的调用合同，因此各自使用唯一 operation（直接入口可使用 `_write` 后缀）。上面的 operation
稳定性规则针对“用 Receipt 替换原 write 合同”的升级，不是要求两个并存入口共用 operation。

`mix cms.pipeline.check` 可以检查当前 application 内 operation 是否存在且唯一，但没有历史 manifest，不能
自行发现跨版本改名。因此 write -> receipt 升级时保持 atom 是明确的 migration compatibility contract，
由该 action 的兼容性测试和变更审查证明；不为此新增中央 operation registry。

`prepare` 只能归一化参数、解析目标 identity 或准备查询条件。它处于 transaction 外，因此它得到的
资源不能替代 transaction 内 Gate 返回的 canonical resource，也不能作最终授权依据。用户写入不再单独
声明主目标 `load`：`gate` 必须在 runner 已开启的 transaction 中一次完成 load、lock、authorize，并把
同一个 canonical resource 交给后续 `lifecycle` 与 `change`。辅助资源查询留在具体阶段函数内部。

`confirm` 位于 transaction 内，因为 Receipt 只能保存已和领域事实原子提交的恢复数据。`present`
位于 commit 后，负责把首次执行或 recovery 得到的 Confirmation 转成相同的 public domain result。

### 3.2 `direct_pipeline`

适用于不需要 Receipt 恢复语义的直接写入。它不是“简化版 Receipt”，也不声明 Confirmation。

固定顺序：

```text
prepare?
  -> BEGIN
  -> gate | load?                             # user 必须 gate；internal 才可用 load；二者不并存
  -> lifecycle?
  -> change | workflow
  -> COMMIT
  -> present?

Gate/Lifecycle/change/workflow 明确返回业务拒绝
  -> ROLLBACK
  -> 若声明 on_rejection：独立 error transaction 中执行
  -> 返回原始错误

内部或基础设施错误
  -> ROLLBACK / 普通错误返回                  # 不执行 on_rejection
  -> 若 prepare 已取得外部 capability 且声明 cleanup：best-effort cleanup
```

`direct_pipeline` runner 拥有 transaction 的开启/回滚/提交；Gate 在该 transaction 内完成 admission 和
canonicalize，Persist 只加入已有 transaction。

`cleanup` 只在 `prepare` 已成功、后续执行返回错误时于主事务外运行，用于释放 Wallpaper upload batch
这类外部 capability。它不是 rejection audit，也不能替换原始错误；callback 异常只进入 telemetry。

`on_rejection` 不是主事务的 after-hook。只有显式声明它的 pipeline 才会在主事务回滚后，由同一个 runner
开启一笔新的、独立的 transaction。callback 只接收原始输入 identity/correlation 与原始错误，只允许
best-effort 调用 `GroupherServer.Activity.log_rejection/3`；不得写领域事实、Receipt、Confirmation 或普通
Outbox，也不得使用已经回滚的 struct。`log_rejection/3` 是 pipeline 目标设计新增的窄 Activity public API，
签名固定为 `log_rejection(resource, action, opts)`：

- `resource` 是 transaction 外已知的稳定审计对象或 identity，不能使用主事务内生成后又回滚的 struct；
- `action` 是被拒绝的领域动作 atom，例如 `:trashed`；
- `opts` 必须包含 `actor`、`rejection_code`、`operation_ref`，可以包含 `source`；
- `outcome: :denied` 由 `log_rejection/3` 内部固定注入，不接受调用方覆盖；
- 返回 `{:ok, event} | {:error, reason}`。

`on_rejection` 不是“transaction 内任何错误”的兜底。runner 只有在 Gate rejection、Lifecycle blocker，或
`change`/`workflow` 明确返回的业务拒绝导致主事务回滚后才执行它。数据库/网络等基础设施故障、callback
崩溃、非法 tagged tuple、Confirmation 构造或 codec 失败，以及 Receipt claim conflict、recovery/decode、
finalize 失败都不代表业务拒绝，不执行 `on_rejection`。transaction 外的 `prepare` 失败和 commit 后的
`present` 失败同样不执行。runner 必须保留失败阶段，但不能只凭阶段名称猜测错误是不是 denial；业务错误
需要明确表达 rejection/blocker 语义。

`on_rejection` 自身失败只记录 telemetry，runner 始终返回原始错误，不能吞掉或替换它。rejection Activity 按
`operation_ref` 幂等，但两种顶层 pipeline 的来源不同：

write transaction 对 Postgrex 锁/查询取消和 DB connection failure 统一返回可重试的
`CMS.ErrorCat.command_resolution_pending()`，这些基础设施错误仍不进入 `on_rejection`；其他未分类异常继续 fail loud。

- 用户 `receipt_pipeline` 原样使用入口 `commandId`。同一 commandId 重试产生相同 `event_ref`，
  `duplicate_event` 表示该 denial 已记录，不新增第二条；审计记录的是同一业务命令的拒绝，transport
  attempt 次数只进入 telemetry。若未来确有 per-attempt 审计需求，必须另增独立 `attempt_ref`，不能改变或
  复用 `commandId` 的含义；
- `direct_pipeline` 没有 `commandId`。runner 必须在每次 `execute` 入口、主事务开始前生成一个新的 UUID
  `operation_ref`，并在主事务回滚后的 `on_rejection` transaction 中原样复用。它代表这一次 pipeline 执行，
  不得由 operation atom、resource identity 或 actor 单独或组合确定性推导；否则不同 actor，甚至同一 actor
  后续发起的独立操作都可能被错误去重。actor 继续作为 Activity 的独立字段保存；
- internal job/workflow 如果已经拥有代表本次外部执行的稳定 UUID，可以显式传入并在自身重试中复用；资源
  ref、operation atom 或它们的 hash 不能代替这次执行的 identity。

`direct_pipeline` 的 `operation_ref` 是内部 Audit/Activity correlation，不是客户端重试协议，也不是
`commandId`。它在 runner 入口生成一次，不能到 `on_rejection` callback 内才生成。

runner 只把显式的 `Pipeline.Rejected` 结果视为可审计业务拒绝；普通 atom、Gate/ErrorCat、Ecto Changeset、协议/基础
设施 tuple 和异常都不会触发 `on_rejection`。`Pipeline.Rejected` 包裹原始业务错误，runner 只用它判断是否执行
`on_rejection`，对外仍返回被包裹的原始错误，避免把数据库故障误记为 rejection。

### 3.3 rejection 处理的长期收口

当前实现已经采用最终形态：Command 只描述“记录什么”，runner 决定“怎样写入”。DSL 的
`on_rejection` 是纯数据构造阶段；Command 不直接调用 Activity、Repo、Persist、Receipt、Outbox 或其他
pipeline。runner 在主事务回滚后调用当前 pipeline adapter 的 `record_rejection/1`；CMS adapter 再通过
Activity Context 写入审计表：

```text
Command on_rejection builder
  -> %Pipeline.RejectionData{...}            # 只提供业务字段

Runner
  -> 校验 RejectionData
  -> 注入 actor / operation_ref，归一化 source
  -> 组装 %Pipeline.RejectionLog{}
  -> adapter.record_rejection/1               # runner 唯一依赖
       -> BEGIN 独立 error transaction
       -> Activity.log_rejection/3            # CMS adapter 的存储实现
       -> COMMIT / ROLLBACK
  -> 始终返回原始业务错误
```

#### 显式 builder 与输入合同

DSL 不接受捕获外层变量的匿名函数，也不分析自由变量后生成隐藏参数。`on_rejection` 必须接受字面量本地
函数引用，且统一为 arity 1：

```elixir
on_rejection &build_rejection/1

defp build_rejection(%Pipeline.RejectionContext{
       arguments: %{article: article},
       error: error
     }) do
  %Pipeline.RejectionData{
    resource: article,
    action: :trashed,
    rejection_code: rejection_code(error)
  }
end
```

macro 展开时必须拒绝匿名函数、远程 capture、动态 capture 和错误 arity，只记录字面量本地
`{module, function, 1}`；builder 可以声明在 pipeline 之后，因此存在性和 visibility 由
`__before_compile__` 使用 `Module.defines?/2` 检查，且只接受本地 `defp/1`。校验通过后再把 MFA 写入
`__pipeline_contracts__/0`。这避免 macro 分析 lexical scope、hygiene、guard 和 pattern binding，MFA 也
天然成为静态检查起点，同时不限制源码定义顺序。

`Pipeline.RejectionContext` 是内部结构，固定提供：失败 `stage`、已从
`Pipeline.Rejected` 解包的原始 `error`、稳定 `operation`、runner 持有的 `operation_ref` 和
`arguments`。`arguments` 就是 pipeline 函数参数组成的原始 map，与当前 runner 的 `input.arguments` 完全
一致；context 不暴露 runner 内部的 `input` 容器，也不提供 Gate/load 得到的 canonical resource、
change/workflow stage result、Receipt 状态、Confirmation 或任何主事务中生成后已回滚的 struct。
transaction 外 `prepare` 失败不构造该 context，也不触发 `on_rejection`。

builder 只返回 `%Pipeline.RejectionData{}`。`RejectionData` 使用 `@enforce_keys`，
包含 Command 拥有的 `resource`、`action`、`rejection_code` 和可选 `source`。`source` 未提供时，runner 对
`access: :user` 使用 `:api`，对 `access: :internal` 使用 `:operations`，并校验最终值属于 Activity 允许集合；
runner 不从形态不统一的 `arguments.opts` 猜测 source。

runner 从入口注入 `actor` 和 `operation_ref` 后组装内部 `Pipeline.RejectionLog`。user pipeline 必须使用非 nil
入口 actor；internal pipeline 使用显式 actor，没有时固定归一化为 `:operations`，不能写入 nil actor。
builder 无权提供或覆盖 actor/operation_ref，因此不需要用“接收后再比较”的方式防止伪造 identity。

`operation` 只保留在 `RejectionContext` 和 runner telemetry 中，用于定位 pipeline，不进入
`RejectionLog`，也不传给当前没有该字段的 `Activity.log_rejection/3`。Activity audit action（例如
`:trashed`）与 pipeline operation（例如 `:article_trash`）是不同语义；未来若需要持久化 operation，必须
单独设计 Activity schema 和 migration，不能透传未知 opt。Activity API、event attrs、schema 和 payload
已统一使用 `rejection_code`，不保留旧字段映射层。

三个内部结构的字段合同固定为：

```elixir
%Pipeline.RejectionContext{
  arguments: arguments,
  stage: stage,
  error: error,
  operation: operation,
  operation_ref: operation_ref
}

%Pipeline.RejectionData{
  resource: resource,
  action: action,
  rejection_code: rejection_code,
  source: optional_source
}

%Pipeline.RejectionLog{
  resource: resource,
  action: action,
  actor: normalized_actor,
  rejection_code: rejection_code,
  operation_ref: operation_ref,
  source: normalized_source
}
```

三个结构都只服务 pipeline runner 的内部边界；必填字段使用 `@enforce_keys`，只有
`RejectionData.source` 可选。它们保留准确的模块文档和 ASCII 流程，避免把内部结构误当成 public API。

运行时要求 `resource` 是已加载的 struct 或包含稳定资源 identity 的 map；裸 id 不是当前合同允许的资源形态。
`action` 和 `rejection_code` 为 atom，actor 非 nil。`operation_ref` 只由 runner
从入口 context 注入 `RejectionLog`，builder 不接受、返回或覆盖该字段。builder 返回非法值、返回错误或
raise，以及 Activity 写入失败，都只记录 telemetry、跳过或回滚 rejection 写入，并始终返回最初的业务错误。

#### 唯一调用图与 purity policy

builder 不能只靠返回结构约束纯度。当前实现已把原先位于 Mix task 内的 BEAM definition 解析、宏展开后
AST、调用边、默认参数、unresolved edge 和可达性遍历抽到唯一共享的
`GraphAnalyzer`。graph task 只负责 topology policy、JSON 和 freshness；check task 在同一事实图上应用
rejection purity policy。禁止复制 graph task 的 private 分析函数形成第二套检查器。

`mix cms.pipeline.check` 在 application 编译完成后，从合同记录的 builder MFA 开始遍历：

- 本地 `def/defp` 按静态边继续遍历；本地或导入 macro 只检查编译后的展开结果，不按 macro 名字猜测；
- 允许结构构造、已建模语言构造和封闭登记的必要纯 MFA；跨模块 helper 与 protocol dispatch 默认拒绝；
- 优先使用 `Atom.to_string/1`、`Integer.to_string/1` 等具体纯函数，不默认放行 `to_string/1`、`inspect/1`
  背后的 `String.Chars`、`Inspect` 动态协议；确有需要时登记精确 protocol MFA 和可接受实现边界；
- rejection builder 内的 `apply/3`、变量模块、无法解析的函数捕获、不存在的本地目标和 unsupported construct
  全部 fail closed；topology 图只允许分析器配置中按精确 MFA 审查过的基础设施 wrapper，不允许模块级或 action
  级泛化白名单；
- Repo、Persist、Activity、Receipt、Command、Outbox、其他 pipeline、进程创建、文件/网络访问、时间、随机数
  和 UUID 生成全部禁止；
- `Application.get_env`、Logger、System、Task、Process、`send`/`spawn` 系列必须作为明确负例，即使跨模块默认
  拒绝已经能够覆盖它们；
- 缺少 debug info 或无法证明完整展开时检查失败。CI 必须在 strip BEAM debug info 之前运行该检查。

purity 只证明 builder 不产生副作用，不证明 builder 是 total function。白名单中的 `Map.fetch!/2` 等纯函数仍可
raise；runner 必须捕获 builder 的 raise/throw、记录 telemetry、跳过 rejection 写入，并继续返回原始业务错误。
因此“通过 purity policy”和“运行时不会失败”是两个不同合同。

`Activity.log_rejection/3` 因此不再是 Command callback 可以调用的受信任终点。runner 只依赖
adapter 的 `record_rejection/1`，CMS adapter 才依赖 Activity Context；Command 调用图不再需要 terminal
MFA 例外。runner 仍负责 best-effort、telemetry 和不替换原始错误的语义。

`cleanup` 与本合同无冲突：它是 runner 调度、用于释放 `prepare` 外部 capability 的独立 effect 阶段，允许
受控 I/O，并有自己的 best-effort/telemetry 合同；它不生成 rejection 数据，也不受 builder purity policy
约束。audit 写入本身也不是纯函数，纯度要求只针对 Command 的 builder，真实写入固定属于 runner。

#### 共存、产物与迁移门禁

一个 pipeline 只能声明一个 `on_rejection` builder；DSL 不再提供旧的 `on_error` 入口，也不保留双 DSL 兼容层。
builder 的存在性由 `__before_compile__` 校验，编译后 purity 由共享 `GraphAnalyzer` 校验，runner 才会执行通过
合同的 builder。

引入 `on_rejection` 时把 `pipeline_contracts.json` 的 `schema_version` 从 1 升为 2；pipeline 字段统一为
`direct_pipeline` 后，`pipeline_coverage.json` 升为 schema 2；coverage 增加 pipeline arity 后升为 schema 3，
`pipeline_graph.json` 在加入 gate-stage 与 mixed-protocol 结果后升为 schema 4。contracts version 2 的 stage 直接
记录 `on_rejection`，并增加 `rejection_builder: {module, function, arity}`；不能把它编码成 `on_rejection`
兼容层，也不提供 v1/v2 双读。checker/graph 遇到未知 schema version 必须失败，`--check` 同时验证 version
和内容 freshness。§4.2、§8.2、graph/check task、runner、`__pipeline_contracts__/0`、生成产物和 freshness
tests 必须在同一批同步；其他 JSON 产物若复制该合同结构，必须同时升级各自明确声明的 schema version。

这条迁移已经完成：Activity 字段/API 已统一为 `rejection_code`，共享 `GraphAnalyzer` 已接入 graph/check，
runner 已实现 context、builder、payload 校验、actor/source 归一化、adapter 的 `record_rejection/1`、独立 transaction 和 telemetry/error
preservation，Article Trash 已迁移并由行为测试覆盖。后续新增 action 直接使用同一最终合同。

测试至少证明：本地 macro 展开到 Repo 失败；未登记跨模块 helper 失败而登记的纯 MFA 通过；`apply/3`、变量
模块、System 时间和 UUID 生成失败；匿名/远程 builder capture 失败；非法 payload 或 builder raise 只产生
telemetry 且不替换原始错误；builder 与 Activity 在主事务 rollback 后执行；cleanup 与 rejection 分别遵守
各自合同。这些都是当前强制合同，不是迁移期建议。

内部系统写入可显式声明：

```elixir
@pipeline operation: :article_archive, access: :internal

direct_pipeline execute(article) do
  load fn -> stable_article(article.id) end
  change fn canonical -> archive_article(canonical) end
end
```

`:internal` 是可审计例外，不是默认绕过 Gate。普通用户写入如果缺少 `gate`，编译失败。

internal pipeline 声明 `load` 时，该阶段必须在 runner 已开启的 transaction 中完成 canonical load + lock，
并把同一个 canonical resource 交给后续 Lifecycle 与写入。`:internal` 只跳过 actor authorization，不跳过
canonicalize、并发锁、Lifecycle 或领域 precondition；普通未加锁 Reader/FrontDesk 查询不能实现这个
`load` 合同。没有既有主目标的 create 可以不声明 `load`。

### 3.4 `workflow_pipeline`

`workflow_pipeline` 用于一个 Command 内部的多个依赖步骤，例如创建社区时依次创建核心记录、根
moderator、doc tree 与 Outbox intent。它可以由 `receipt_pipeline` 或 `direct_pipeline` 调用。

```elixir
workflow_pipeline create_community_workflow(attrs, actor) do
  step :community, fn _results -> create_community(attrs, actor) end
  step :owner, fn %{community: community} -> create_owner(community, actor) end
  step :doc_tree, fn %{community: community} -> create_doc_tree(community) end
  step :event, fn %{community: community} -> enqueue_created(community) end
  return :community
end
```

合同：

- step 名称必须唯一；
- step 按声明顺序执行；
- step 只能读取之前已经完成的命名结果；
- runner 内部维护结果 map，Command 不需要创建或传递公共 `Context`；
- 必须由 `receipt_pipeline` 或 `direct_pipeline` 在已有 runner transaction 中调用；workflow 自己不得开启、
  提交或回滚 transaction；
- 任一步返回 `{:error, reason}`，整个 workflow 回滚；
- step 返回 `Pipeline.Rejected` 或 Gate `Decision{allowed: false}` 时，runner 会把失败阶段归一化为该 step，
  对外返回包裹前的原始错误，并按同一 rejection 规则执行顶层 `on_rejection`；不会把 workflow 和 step 错误重复嵌套；
- workflow 不拥有 Receipt、Confirmation 或 Gate；这些由调用它的顶层 pipeline 负责；
- `return` 必须引用已声明的 step；
- V1 禁止 `workflow_pipeline` 嵌套调用另一个 `workflow_pipeline`。共享逻辑使用普通私有函数或共享 step
  helper；以后只有出现真实需求时，才设计显式 subworkflow、结果命名空间和循环检测。

这部分对应现有 `Ecto.Multi`、手写 `with` workflow 和“已在 transaction 则复用”的共同能力，但
不替换业务函数本身。

### 3.5 Gate 如何加入 runner transaction

目标 API 必须把“谁开事务”和“谁做 admission”拆开：

```text
Pipeline runner
  -> BEGIN
  -> CMS.Gate.check_in_transaction(actor, action, target/context)
       -> assert caller is already in transaction
       -> load canonical resource once
       -> acquire row/advisory lock
       -> authorize with typed Access Context
       -> return {:ok, canonical_resource}
  -> Lifecycle/change reuse the same canonical resource
  -> COMMIT / ROLLBACK
```

`check_in_transaction` 表示一组 join-only Gate API；Article、Comment、Community、Doc branch 仍可保留满足
typed context 所需的具体 arity，实施时不得为了统一名称丢掉 Community/binding/branch context。共同合同是：

- 调用时必须已经处于 runner transaction，缺少 transaction 时 fail closed；
- Gate 加载并锁定主目标一次，完成授权后返回 canonical resource；
- Gate 不再接收业务 callback，也不 BEGIN、COMMIT 或 ROLLBACK；
- `lifecycle`、`change` 和 workflow 复用 Gate 返回值，不再次加载同一主目标；
- create 没有既有资源时，Gate 执行 create admission，并返回后续创建所需的 canonical scope/facts。

`CMS.Gate.with_check`、`with_community_check`、`with_branch_check` 是非 pipeline 调用方使用的独立
transaction-owning Gate API；pipeline 一律调用 join-only API，不能调用这些函数。两类 API 的 transaction
owner 不同，不是新旧兼容关系。

## 4. 阶段合同与编译期检查

### 4.1 声明顺序就是执行顺序

runner 不会偷偷重排：

```elixir
receipt_pipeline execute(article, actor, opts) do
  gate fn article -> check_gate(article, actor) end
  prepare fn -> article.id end
end
```

上例在编译期报错，因为 `prepare` 被声明在 `gate` 之后。这样源码阅读顺序、运行顺序和错误栈保持一致。

### 4.2 必需阶段按 pipeline 类型决定

| Pipeline                             | 必需                                      | 可选                                                                | 禁止                                                                 |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `receipt_pipeline access: :user`     | `gate`、`change` 或 `workflow`、`confirm` | `prepare`、`lifecycle`、`present`、`on_rejection`                   | `load`、重复阶段、同时声明 `change` 和 `workflow`                    |
| `receipt_pipeline access: :internal` | `change` 或 `workflow`、`confirm`         | `prepare`、`load` 或 `gate`、`lifecycle`、`present`、`on_rejection` | `load` 与 `gate` 并存、重复阶段、同时声明 `change` 和 `workflow`     |
| `receipt_pipeline access: :open`     | `change` 或 `workflow`、`confirm`         | `prepare`、`load`、`lifecycle`、`present`、`on_rejection`           | `gate`、重复阶段、同时声明 `change` 和 `workflow`                    |
| `direct_pipeline access: :user`      | `gate`、`change` 或 `workflow`            | `prepare`、`lifecycle`、`present`、`on_rejection`                   | `load`、`confirm`、Confirmation/Receipt-only metadata                |
| `direct_pipeline access: :internal`  | `change` 或 `workflow`                    | `prepare`、`load` 或 `gate`、`lifecycle`、`present`、`on_rejection` | `load` 与 `gate` 并存、`confirm`、Confirmation/Receipt-only metadata |
| `direct_pipeline access: :open`      | `change` 或 `workflow`                    | `prepare`、`load`、`lifecycle`、`present`、`on_rejection`           | `gate`、`confirm`、Confirmation/Receipt-only metadata                |
| `workflow_pipeline`                  | 至少一个 `step`、一个 `return`            | 更多命名 `step`                                                     | `gate`、`confirm`、Receipt metadata、嵌套 workflow                   |

表格描述当前已实现且强制执行的 `on_rejection` 合同；builder 必须是字面量本地 `&name/1`，不能与其他失败
处理阶段并存。

不是所有 Command 都必须填满所有阶段。Lifecycle 只出现在真实存在状态转换或 blocker/version precondition
的动作中；create 可以没有 `load`。

### 4.3 编译期错误与运行时错误

pipeline macro 在当前 Command 编译时直接拒绝：

- metadata 缺失或用于错误的 pipeline 类型；
- `receipt_pipeline` 或 `direct_pipeline` 缺少稳定 `operation`；
- 未知、重复、乱序阶段；
- 缺少当前 pipeline/access 类型的必需阶段；
- 同时声明 `change` 和 `workflow`；
- `receipt_pipeline` 缺少 Confirmation metadata；
- `on_rejection` 不是字面量本地 `&builder/1`，或 builder 不是本模块的 private `defp/1`；
- `access: :open` 的 pipeline 声明 `gate`；
- `access: :open` 的 pipeline 声明 `on_rejection` 但没有 actor/user/author 参数；
- CMS module 使用 `access: :open`；该规则由 CMS adapter 的 `validate_contract/1` 在 pipeline 编译期拒绝；
- 使用 `DefaultAdapter` 的 pipeline 声明 `on_rejection`，因为该 adapter 没有 rejection 持久化边界；
- 使用 `DefaultAdapter` 的 pipeline 声明 `receipt_pipeline`，因为该 adapter 没有 Receipt 执行边界；
- 可静态确定的 callback arity 不正确；
- workflow step 重名或 `return` 指向未知 step；runner 只向 step 暴露已经完成的结果。

`mix cms.pipeline.check` 在整个 application 编译完成后拒绝：

- Confirmation 模块不存在或无法加载；
- Confirmation 未实现 codec behavior，或缺少 `operations/0`、`encode/2`、`decode/2`；
- pipeline operation 不在 Confirmation 声明的闭合 operation 集合中；
- 跨模块 operation、public entry 或 Receipt contract 重复。
- `GroupherServer.CMS.*` pipeline module 的 contract adapter 不是 `GroupherServer.CMS.CommandPipelineAdapter`；

运行时返回 `{:error, reason}`：

- Gate denial；
- Lifecycle blocker/version conflict；
- Persist 或 workflow step 失败；
- callback 没有返回约定的 tagged tuple；
- Receipt intent conflict、Confirmation encode/decode 或 recovery 失败。

`@pipeline` 只为紧接着的下一条 pipeline 声明提供 metadata。macro 读取 metadata 后必须立即调用
`Module.delete_attribute(__CALLER__.module, :pipeline)` 擦除属性，再生成当前声明；不能让同一模块的下一条
pipeline 继承过期 metadata。因此同一模块有多个 action 时必须逐条重新声明；长期仍优先一个业务 action
一个 Command 模块。

Confirmation 必须保持 leaf module，不得反向依赖声明它的 Command。macro 不在展开期间调用
`Code.ensure_compiled!/1`，也不依赖 `@after_compile` 猜测其他模块是否已经编译；这会引入编译期重入、
并行编译等待和顺序敏感。macro 只记录模块引用，跨模块 codec/operation 校验统一由 §8.2 的 Mix task 在
`mix compile` 完成后执行。runtime 仍对 Confirmation encode/decode fail closed。

## 5. 路由函数合同

不是每个 public function 都要成为 pipeline。只做分派的入口可以保留普通函数：

```text
CreateNode.execute
  -> 根据 node type
       ├─ CreateDocument.execute   # pipeline
       ├─ CreateLink.execute       # pipeline
       └─ CreateGroup.execute      # pipeline
```

routing function 只能校验分派所需输入并委托给已声明 pipeline；不得调用 Gate、Lifecycle、Persist、Repo、
`CMS.Command` 或拥有 transaction。

Receipt 和直接写必须拆成两个已声明 pipeline，并由不同名称或不同 arity 的明确入口调用。不能读取可空
`command_id` 或 workflow tuple 决定协议：

```text
public facade
  ├─ *_receipt / 带 commandId 的明确 arity -> receipt_pipeline
  └─ direct/internal 明确 entry            -> direct_pipeline
```

当前实现不得用 nil `command_id` 或 `{:workflow, ref}` 判断访问来源；内部 job/maintenance 使用独立 entry。
`workflow_pipeline` 只能作为顶层
pipeline 的事务内步骤，不能由 routing function、facade 或 resolver 直接调用。

## 6. 迁移前 Command 审计（历史）

本节记录 pipeline 迁移开始前用于确定范围的审计快照，不代表当前覆盖状态。当前 Command、pipeline 和
调用图状态以 §9 所列的 `pipeline_coverage.json`、`pipeline_contracts.json` 和
`pipeline_graph.json` 生成产物为准；文档不复制这些会持续变化的当前数字。

审计范围是 `backend/api/lib/groupher_server/cms/**/commands/*.ex` 的 139 个 Elixir 文件。其中 102 个
文件包含 public write entry；其余是 Support、Confirmation、codec 等辅助模块。文件数不是 action 数：
`CommunityApplications.Commands.Review` 单个模块就暴露多个业务动作。

| 领域                   | public write entry 文件 | pipeline 合同                                                       |
| ---------------------- | ----------------------: | ------------------------------------------------------------------- |
| Articles               |                      24 | Receipt 与 direct/internal 使用不同入口                             |
| Assets                 |                       5 | Receipt 与 replacement workflow 使用不同入口                        |
| Comments               |                       7 | create/reply、state change、moderation；receipt/direct 可覆盖       |
| Communities root       |                       3 | create/update/destroy；含 Receipt 与 workflow identity 混合         |
| Categories             |                       5 | Gate 后直接写；write 可覆盖                                         |
| Moderators             |                       5 | concrete receipt pipeline，Support 只保留阶段 helper                |
| Subscriptions          |                       2 | set-style user writes；write 可覆盖                                 |
| Tags                   |                      11 | user write 与 maintenance workflow identity 并存；拆入口后覆盖      |
| Community Applications |                       4 | Receipt + `Ecto.Multi` + 多结果；receipt 调 workflow 可覆盖         |
| Dashboard              |                       3 | Gate + 多 Persist/Outbox；write 调 workflow 可覆盖                  |
| Doc Cover              |                       8 | Receipt/direct 使用独立 pipeline                                    |
| Doc Tree               |                      15 | routing function 只按 node type 路由；Receipt/internal 使用独立入口 |
| Docs                   |                       3 | publish 类 workflow；顶层 pipeline 调 workflow 可覆盖               |
| Kanban                 |                       4 | Gate 后直接写；write 可覆盖                                         |
| Press                  |                       1 | 直接配置写入；write 可覆盖                                          |
| Wallpaper              |                       2 | Receipt + workflow + Confirmation；receipt 调 workflow 可覆盖       |
| **合计**               |                 **102** | 没有发现需要第四种 pipeline 的业务语义                              |

此外，以下 4 个包含 Receipt action 的模块位于 `Commands/` 目录之外：

- `CMS.Interactions.Reactions.Upvote`；
- `CMS.Interactions.Reactions.Emotion`；
- `CMS.Interactions.Reactions.Report`；
- `CMS.Interactions.Reactions.Collect`。

这些模块由独立的 interaction command contract 管理，不通过可空 identity 降级为 direct write。pipeline
coverage 按已编译 module 的 `__pipeline_contracts__/0` 发现合同，不维护逐 action 名单。

### 6.1 审计发现并反推出来的阶段

| 现有代码事实                                                                      | 对目标合同的要求                                                                                      |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Publish/Create 等在构造 Receipt command 前解析 target 或参数                      | 增加 transaction 外 `prepare?`，但禁止把它当 Gate 权威                                                |
| `RevisionResult.build`、`Confirmation.result`、reaction projection 等在提交后执行 | 增加 `present?`，首次执行与 recovery 必须共用                                                         |
| Article Trash 在失败后 best-effort 写 rejection audit                             | 增加少量显式 `on_rejection`；不得用隐藏全局 hook                                                      |
| Community Application Submit 使用 `Ecto.Multi` 且后续步骤读取多个前序结果         | workflow 使用命名 step 结果，而非单一当前值                                                           |
| create 无既有 target，archive/moderation 等内部动作无 actor Gate                  | create 由 Gate 做 create admission；仅 internal pipeline 可单独 `load`，并用 `access: :internal` 明示 |
| 多个入口按 `command_id`、`{:workflow, ref}` 或 nil 改变执行方式                   | 一个 pipeline 不得动态变型；拆成 pipeline + routing function                                          |
| wrapper 只按 subtype/action 委托其他 Command                                      | 定义 routing function 合同，不强迫 wrapper 伪装 pipeline                                              |
| shared Support 持有 Receipt/Gate/transaction plumbing                             | pipeline 声明回到 concrete Command；Support 只保留阶段 helper                                         |

### 6.2 已关闭的结构缺口

1. Articles、Assets 与 DocTree 不再根据 nil `command_id` 或 workflow tuple 选择协议；Receipt、write 与
   workflow 调用具有独立入口。
2. shared Support 不再拥有 Receipt 选择或 transaction，只保留阶段 helper。
3. CreateNode 等 routing function 只按业务 subtype 路由，不按执行 identity 路由。
4. 多 action 模块逐条消费 `@pipeline`，编译 coverage 能看到每条合同。
5. user pipeline 的 Gate 均为顶层显式阶段；内部 pipeline 必须显式声明 `access: :internal`。
6. 非 `Commands/` interaction 写入由其独立合同覆盖，不进入 concrete Command 目录清单。

## 7. 分层所有权

| 层                              | 必须负责                                                 | 禁止负责                                                 |
| ------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| Transport/resolver              | 外部参数与认证上下文、transport result                   | Gate、事务、Persist、Receipt 分支                        |
| CMS public facade               | 稳定业务 API、委托 Command/routing function              | Repo/Persist、Gate 编排、执行协议细节                    |
| Concrete Command                | pipeline 声明、具体业务函数、领域步骤                    | 通用 runner/Receipt 存储算法                             |
| Pipeline macro/runner           | 阶段校验、固定顺序、transaction、结果传递                | 猜测 Gate action、Lifecycle transition 或业务返回值      |
| `CMS.Command` / Receipt runtime | claim/finalize、intent、Confirmation codec 与恢复        | 领域 Gate/Lifecycle 规则                                 |
| Gate                            | actor/action/resource admission、canonical resource/lock | 状态转换、领域写入、展示投影                             |
| Lifecycle                       | actor-independent state、transition、blocker、version    | actor policy、GraphQL、普通展示字段                      |
| Persist                         | 已有 transaction 内的数据库 mechanics                    | Gate、Lifecycle 决策、transaction owner、Receipt、Outbox |
| Effects/Outbox                  | 与领域事实同 transaction 保存 effect intent              | transaction 内直接调用外部 provider                      |
| Present/FrontDesk               | commit 后构造 canonical result、关系加载                 | Receipt claim、幂等判断                                  |

public facade 仍是 GraphQL、CLI、MCP、Agent 等入口共用的唯一业务 API。各 transport 在调用时完成自己的
输入转换即可，不新增逐 action 的 `ParamsFormat` 或另一套 facade 参数合同。

## 8. 合同如何落地

pipeline 只解决 Command 内部结构和顺序，不能单独证明 transport 到 Command 的调用拓扑，也不能证明
数据库语义。完整门禁分成五层，执行关系如下：

```text
Command source
  -> Elixir compile
       -> pipeline macro contract                # 单个 Command 的 metadata、阶段和顺序
       -> __pipeline_contracts__/0 in BEAM       # macro 生成

Compiled backend application
  -> mix cms.pipeline.check
       -> 汇总所有 __pipeline_contracts__/0
       -> operation/entry 唯一性、routing function 拓扑、internal 可达性

Repository source
  -> 现有 Node architecture gates              # 独立检查 resolver/facade/Persist 等源码边界

  -> production runtime
       -> Gate/Lifecycle/Receipt fail closed

  -> ExUnit integration/transaction tests
       -> rollback、recovery、并发与最终结果
```

这五层不是同一种 lint 的不同名字。尤其是 pipeline coverage 和全局 pipeline 检查完全属于 Elixir
backend：不交给 JavaScript，不生成供 Node 消费的 JSON，也不塞进 `pnpm docs:check`。编译期 contract、
Elixir 全局检查、现有 repository gates、运行时校验和行为测试分别证明不同事实，不能互相替代。

### 8.1 编译期 pipeline contract

macro 在 concrete Command 编译时检查 metadata、阶段集合、顺序、重复、基础 arity 和 workflow step
引用。它能阻止“漏 Gate”“Receipt 没 Confirmation”“声明顺序与执行顺序不一致”等局部结构错误。

这些规则属于 pipeline 本身，不由 JavaScript 正则重复实现。macro 同时为每个含 pipeline 的模块生成
`@doc false` 的 `__pipeline_contracts__/0`，返回只含静态数据的 list，例如：

```elixir
def __pipeline_contracts__ do
  [
    %{
      module: __MODULE__,
      name: :execute,
      arity: 3,
      pipeline: :receipt_pipeline,
      operation: :article_publish,
      access: :user,
      confirmation: PublishConfirmation,
      stages: [:prepare, :gate, :lifecycle, :change, :confirm, :present]
    }
  ]
end
```

这是编译进 BEAM 的模块 metadata，不是让 lint 解析 BEAM 指令，也不是另外维护 action 表。macro 是唯一
producer；Command 作者只写 `@pipeline` 和 pipeline body。宏展开时把 `@pipeline` 的值消费后通过
`Module.delete_attribute/2` 擦除，避免下一条声明继承旧 metadata。

### 8.2 `mix cms.pipeline.check` 与 contracts

`mix cms.pipeline.check` 在 `mix compile` 成功后运行。contracts、coverage 与 graph 三个 task 共用唯一的
production module discovery：扫描当前 compile path 的 BEAM，但只接受 compiler source path 位于
`backend/api/lib/` 下的模块。`test/`、`test/support/` 或其他随环境一同编译的 helper 不得进入任一正式产物。
Mix project 成功加载后，项目根必须从 `Mix.Project.project_file/0` 推导；源码 glob、manifest 路径和报告中的
相对路径不得依赖 task 执行期间变化的 current working directory。这不承诺 Mix 能从不包含 `mix.exs` 的任意
子目录启动。
检查器加载 production 集合中导出 `__pipeline_contracts__/0` 的模块，调用该函数汇总 contracts，校验
operation/Confirmation，并从 builder MFA 进入共享 `GraphAnalyzer` 的编译后调用图执行 purity policy。默认模式生成
`backend/api/priv/pipeline_contracts.json`；`--check` 模式只比较现有
文件并在产物过期或缺失时失败。因此 CI 顺序固定为 `mix compile --warnings-as-errors` →
`mix cms.pipeline.check` → `mix cms.pipeline.check --check` → ExUnit。

当前 task 已实现 contracts、Confirmation 跨模块校验、operation 唯一性，以及从 `rejection_builder` MFA
开始的编译后 purity 检查。本地 helper 沿共享图传递遍历，宏按编译后的展开结果检查；`apply/3`、未知本地
目标、跨模块 helper、动态调用与缺少 debug definitions 均 fail closed。Activity 写入不属于 builder 的允许
终点，只能经 runner 的 pipeline adapter 执行。源码 AST 不再维护第二套辅助函数事实模型。

`mix cms.command.pipeline` 从 resolver 和全部 concrete CMS facade root 追踪路由函数、普通 helper、Command
与 pipeline。正式检查读取已编译模块的 Elixir debug definitions，因此 `use`、import 和自定义 macro 生成的
真实函数都按展开后的定义参与图分析；缺少编译展开信息的受检模块不得使用未登记 macro。每次运行都执行
fail-closed 校验，CI 使用 `--check` 同时证明 freshness 与拓扑。

该 Mix task 检查：

- Confirmation module/behavior/callback/operation 的跨模块完整性；
- 已登记 pipeline 的 operation/Confirmation 合同和 contracts 生成；
- concrete pipeline entry 必须出现在编译产出的 contracts 中；
- 编译后图中的 `apply/3`、未知本地目标、动态边、缺少 debug definitions 与无法完整展开直接失败；
- `on_rejection` builder 及其同模块 helper 的副作用调用必须失败；Activity 写入只能经 runner 的 adapter 发起；
- 同一 operation 的重复登记必须失败。
- `mix cms.command.pipeline` 生成 `backend/api/priv/pipeline_graph.json`，记录 root、静态边、pipeline、
  unresolved/dynamic/custom-macro 边、internal 可达性、顶层 pipeline 传递互调、workflow 入口和绕过
  pipeline 的 Command 写边，以及非 `gate` 阶段可达 Gate、单一 Command entry 同时可达 receipt/direct 的违规；
- graph task 在 parse/unresolved、uncovered Command、unreached user pipeline、internal reachability、top-level
  mutual call、非法 workflow caller、非 gate 阶段 Gate、mixed protocol entry 或 unpipelined Command write 任一
  非零时失败。

当前静态分析的边界是“共享 GraphAnalyzer 能从 BEAM debug definitions 建模的展开后 Elixir AST 与封闭 policy
配置”，不是运行时反射式 call graph：
新增自定义 macro 或动态调用必须先给分析器增加明确模型和正反例，不能静默跳过。Gate action 的业务语义、
真实数据库锁与回滚仍由 runtime/integration test 证明。

internal 可达性是阻断规则，不只是约定：

- 从 resolver 或 user-facing public facade 出发的任意调用路径，不得抵达 `access: :internal` pipeline；
- routing function 不得根据 nil `command_id`、`{:workflow, ref}` 等运行时值把 user entry 路由到 internal pipeline；
- top-level pipeline 不得调用另一个 top-level pipeline；共用步骤必须进入 `workflow_pipeline`；
- `workflow_pipeline` 只能由 `receipt_pipeline`/`direct_pipeline` 的 `workflow` 阶段调用；
- internal job/maintenance root 与 user-facing root 使用不同 entry。检查器复用现有 Context/Facade/Job
  边界识别 root 类型，不维护逐 action allowlist。

Gate 阶段同样不是命名约定。runner 在调用每个 callback 时写入并在 `after` 中恢复唯一 `StageContext`；join-only
Gate API 同时要求“已在 runner transaction 内”与“当前 stage 恰为 `:gate`”。编译后图从 pipeline entry 的
stage callback 出发传递遍历普通 helper，任何 `change`、`workflow` step 或其他阶段可达
`Gate.check_*_in_transaction` 都阻断 CI。复杂写入必须在 gate 阶段一次性取得足够的 canonical/授权上下文，后续
workflow 只调用明确的 `*_after_gate` 领域写入入口，不能在写入阶段偷偷二次授权。
分析器还必须把 BEAM 中提取到的 stage 集合与 contract 声明逐项比对；少识别或多识别任一 callback 都产生
`stage_analysis_errors`、把 `analysis_status` 标为 `incomplete` 并使 strict check 失败，不能把“没有看到调用边”
误当成“阶段安全”。

call-edge 分析必须 fail closed，不能静默忽略动态调用：

- 普通直接调用、`&Module.fun/arity`、可解析的本地函数捕获，以及所有分支目标均为字面量模块/函数的有限
  `case` 可以进入调用图；
- `apply/3`、变量模块调用、运行时拼接模块、无法解析目标的函数捕获或 callback，在受检边界内直接违规；
- 源码级分析不能假设自定义 macro 没有调用边。正式图以编译后的 Elixir debug definitions 为准，从宏展开后的
  真实函数提取调用边；fixture 或缺少 debug definitions 的模块只能使用检查器登记的标准宏，其他 `use`
  直接失败。这个登记集合是分析器能力配置，不是逐 action allowlist；
- 受检边界包括 resolver、public facade、routing function、顶层 pipeline、`workflow_pipeline`、`on_rejection`，以及
  从这些 root 可达的普通 helper；
- 只有分析器能够穷举并证明所有目标均满足同一边界时，间接调用才可放行；不接受“运行时应该不会走到”
  作为例外理由。

fail-closed 还要求分析器先证明编译定义覆盖完整，而不只是处理已经识别出来的调用：BEAM debug definitions
缺失、definition 解码失败，或从受检 root 可达的 executable AST node 无法被归类时，整个检查必须失败。
每个可达 executable node 必须被显式归类为已知非调用构造、已解析
call edge、明确禁止的动态调用或 unsupported construct；unsupported construct 一律违规。AST visitor
禁止使用无诊断的 `_node -> acc` 一类兜底分支静默跳过，错误必须报告 source file、line 和无法处理的 AST
类型。`defdelegate`、pipeline DSL、字面量函数捕获等均需有显式规则。

当前 `GraphAnalyzer` 只允许 builder 返回结构所需的封闭纯函数；跨模块 helper、Repo、Persist、Activity、
Receipt、Command、Outbox、进程/时间/随机数和动态调用均 fail closed。`Activity.log_rejection/3` 不再是
Command 侧的信任终点，而是 runner 的固定写入动作。

检查器 fixtures 覆盖本地纯 helper 通过、未登记跨模块 helper 失败、本地 macro 展开到 Repo 失败、动态调用
失败和非法 builder capture 失败；`Activity.log_rejection/3` 的参数、固定 outcome 与独立 transaction 由
Activity/runner ExUnit 覆盖。任何未解析的间接调用仍按违规处理。
另需持续覆盖 debug definitions 缺失、definition 解码失败与未知 executable node，证明它们都会阻断检查，
而不是产生不完整调用图后继续通过。

task 不重新判断单模块阶段顺序，那是 macro 的职责；也不能根据文件名、函数名或是否出现
`command_id` 猜 pipeline 类型。它同样不能判断 Gate action 是否语义正确，或数据库是否真的原子回滚。

### 8.3 现有 repository architecture gates

现有 Node 脚本继续独立检查源码边界：resolver 只能调用 public facade，Persist 不得反向调用 Gate、
Lifecycle、Receipt、Outbox 或创建 transaction，production code 不得制造入口 `commandId` 等。它们既不
读取 `__pipeline_contracts__/0`，也不消费 pipeline coverage，更不负责 pipeline 顺序或 internal
reachability。

### 8.4 生产运行时校验

runner 和领域权威在真实请求中继续 fail closed：

- runner 断言 join-only Gate 在当前 transaction 内执行，并拥有主事务与独立 error transaction；
- `receipt_pipeline` 复用入口 `commandId` 作为 `operation_ref`；`direct_pipeline` runner 在主事务前生成并
  持有本次执行的 UUID，跨回滚原样传给 `on_rejection`；
- Gate 使用 actor、action、canonical resource 和 typed context 做 admission；
- Lifecycle 校验状态、transition、blocker 和 expected version，不接管 actor policy；
- Receipt 校验 identity/fingerprint、claim/finalize 和 Confirmation codec；
- workflow step 或 callback 返回非法形状时停止执行并回滚；
- `access: :internal` 只改变 pipeline 的 Gate 必需性；声明 `load` 时仍在当前 transaction 内 canonicalize 并
  加锁，也不绕过 Lifecycle 或领域 precondition。

### 8.5 数据库行为测试

以下必须由 integration/transaction test 证明：

- 普通 Gate rejection 不产生领域事实、Audit 或 Outbox；显式 `on_rejection` 场景只在主事务回滚后写允许的
  rejection Audit/Activity；
- Receipt claim conflict、recovery/decode/finalize、Confirmation 构造/codec、基础设施和未分类内部错误均
  不触发 `on_rejection`；只有明确的业务 rejection/blocker 才触发；
- 同一 `commandId` 重试 receipt denial 时只保留一条幂等 Activity；transport attempt 次数只进入 telemetry；
- 两个 actor 对同一资源执行相同 write action，必须产生不同 `operation_ref` 和两条 rejection Activity；
- 同一 actor 两次独立执行相同 write action，也必须产生不同 `operation_ref` 和两条 rejection Activity；
- Lifecycle/version 失败回滚 Persist、Receipt 和 effect intent；
- `on_rejection` 使用新的 transaction；其失败不替换主错误，也不能复活主事务中的任何写入；
- 同一 `commandId` 不重复执行，并恢复相同 public result；
- 相同 `commandId` 与不同 intent params 冲突；
- direct pipeline 重复执行满足对应业务的收敛语义；
- Outbox 使用入口 identity，且与领域事实原子提交；
- workflow 任一步失败会回滚所有已完成 step；
- 并发操作满足锁、唯一约束和最终状态合同。

Backend CI 的顺序固定为：

```text
cd backend/api
mix compile --warnings-as-errors
mix cms.pipeline.check
mix cms.pipeline.coverage
mix cms.command.pipeline
mix cms.pipeline.check --check
mix cms.pipeline.coverage --check
mix cms.command.pipeline --check
mix test ...
```

`mix cms.pipeline.check` 生成 `pipeline_contracts.json`，`mix cms.pipeline.coverage` 生成
`pipeline_coverage.json`，`mix cms.command.pipeline` 生成 `pipeline_graph.json`；三个 `--check` 都校验对应
产物没有相对当前编译产物过期。CI 应把三个 JSON 作为生成产物提交或在专门的 freshness job 中比较。Mix 负责判断
增量编译的 stale module，各 task 负责自己的 BEAM metadata、覆盖清单或拓扑产物一致性。

## 9. 当前自动化覆盖

以下表格只描述 2026-10-18 已存在的实现，不把本文目标当作已落地证据：

| 当前门禁                                         | 扫描范围与已实现能力                                                                                                                                     | 不能证明的内容                                                        |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `check-resolver-boundary.mjs`                    | 扫描完整 resolver 目录；禁止 Repo、Ecto Query、ORM、内部 Store/Writer/Commands/Query、持久化 struct 泄漏                                                 | 不验证 facade 后续是否进入正确 pipeline                               |
| `check-cms-facade-boundary.mjs`                  | 检查固定 10 个 facade 的 Repo/Ecto/外部 effect/`%CMS.Command{}` 边界，并验证固定 7 个 Command 文件具有 `execute`                                         | 不是自动发现；不覆盖全部 facade、全部 Command 或 delegation 关系      |
| `check-command-identity.mjs`                     | 扫描 tracked 与 non-ignored source；自动发现 CMS Persist 文件，检查常见 `command_id` 派生、Persist 反向依赖，以及 resolver/root facade 的 direct Persist | 不是数据流分析；不识别 pipeline、routing function 或 Receipt 业务分类 |
| `check-cms-context-module-boundary.mjs --strict` | 扫描完整 CMS tree；检查 transaction owner、direct Outbox、Command -> Writer、Job -> user Command、Workflow user action 等路径约束                        | owner 主要由目录/文件名推导，不等于 pipeline coverage                 |
| `check-backend-context-v2.mjs --fully-strict`    | 检查 Context/Facade/Owner 布局、跨 Context internal 调用、Facade infrastructure、Outbox owner、typed Job 与 transaction error                            | 是通用 Backend Context 门禁，不理解 CMS pipeline 阶段                 |
| `CMS.Command.execute` runtime                    | 已校验 command identity、Receipt intent 和 Confirmation codec                                                                                            | 只能保护已经进入它的调用，不能发现本应使用 Receipt 却绕开的 action    |

当前已经实现：

- pipeline macro/runner、编译期阶段/顺序检查、`__pipeline_contracts__/0`；
- `mix cms.pipeline.check` 的 BEAM coverage、JSON manifest freshness、Confirmation/operation 校验；
- pipeline module 源码读取/parse fail-closed、`apply/3` fail-closed；
- Gate policy denial 到 `Pipeline.Rejected` 的明确标记，以及普通错误不触发 `on_rejection`；
- `on_rejection` 对 `Repo`、Persist、Receipt、Command、Outbox 的传递式普通 helper 调用阻断；
- `Activity.log_rejection/3` 窄入口、`Gate.check_in_transaction` join-only API 与 runner 独立 error transaction；
- 93 个 concrete Command 全部声明 pipeline；Article/Comment/Community/Assets/Dashboard/DocCover/DocTree/
  Docs/Kanban/Press/Wallpaper/Community Application 等现有 Command 路径均已迁移；
- Community Application Submit 提供真实的命名 `workflow_pipeline`；Wallpaper publish 使用
  `prepare + cleanup` 管理 transaction 外 capability；
- strict graph 对 facade/routing function delegation、user root 到 internal pipeline、顶层 pipeline 互调、workflow
  caller、普通 helper 静态边和 unpipelined Command write 进行阻断。

仍由 runtime/测试而非静态图证明的内容：

- Gate action 是否选对、Lifecycle transition 是否符合业务规则；
- 数据库锁、唯一约束、transaction rollback、Receipt recovery 与外部 provider 的真实行为；
- 分析器 policy 尚未建模的新 macro/动态构造；这类构造进入受检路径时必须先扩展分析器，不能靠 action
  allowlist 放行。

覆盖清单由 `mix cms.pipeline.coverage` 生成到
`backend/api/priv/pipeline_coverage.json`。它只盘点
`cms/**/commands` 下导出 `execute/*` 或声明 pipeline contract 的 concrete Command，并把声明了
`__pipeline_contracts__/0` 的模块标为 `covered`。任何 `uncovered` concrete Command 都直接使任务失败；
数字以 JSON 产物为准。

跨模块调用图由 `mix cms.command.pipeline` 生成到 `backend/api/priv/pipeline_graph.json`。root、边和 pipeline
数量只以生成产物为准，不在文档复制快照；uncovered、unreached user pipeline、unresolved、internal
violation、top-level mutual call、invalid workflow call、gate-stage violation、mixed-protocol entry 和
unpipelined Command write 必须均为 0。CI 的
`--check` 同时验证内容与新鲜度，所有数组在编码前按稳定 key 排序。

当前相关脚本：

- `scripts/check-command-identity.mjs` 与 `scripts/check-command-identity.test.mjs`；
- `scripts/check-resolver-boundary.mjs` 与 `scripts/check-resolver-boundary.test.mjs`；
- `scripts/check-cms-facade-boundary.mjs` 与 `scripts/check-cms-facade-boundary.test.mjs`；
- `scripts/check-cms-context-module-boundary.mjs` 与
  `scripts/check-cms-context-module-boundary.test.mjs`；
- `scripts/check-backend-context-v2.mjs` 与 `scripts/check-backend-context-v2.test.mjs`。

它们当前由 root `pnpm docs:check` 聚合执行。这个命令名是历史遗留：其中既有文档检查，也有阻断合并的
architecture gates。Backend CI 另外运行 `mix compile --warnings-as-errors`、`mix cms.pipeline.check --check`、
`mix cms.pipeline.coverage --check`、`mix cms.command.pipeline --check` 和 ExUnit。三个 `--check` 分别校验
合同、覆盖清单和图产物 freshness；graph 同时阻断 uncovered、unresolved 和拓扑违规。`pnpm docs:check` 不读取 pipeline coverage，
也不作为 pipeline compile/check 的入口。

## 10. 已执行的迁移顺序

1. 实现编译期 DSL、`__pipeline_contracts__/0`、runner 单元测试和 `mix cms.pipeline.check`，包括
   Confirmation 跨模块校验、parse/AST 覆盖完备性、动态调用 fail-closed、固定 MFA 信任集与 `on_rejection`
   调用图规则；
2. 增加 Gate join-only API，并明确区分非 pipeline 的 transaction-owning Gate API；
3. 用简单 `direct_pipeline` 验证 Gate、transaction、canonical resource 只加载一次和错误返回；DiscardDraft、
   UpdateDraft 和 Kanban 作为首批真实迁移；
4. 用一个完整 `receipt_pipeline` 验证 claim/finalize、Confirmation、recovery 和 `present`；
5. 增加 `Activity.log_rejection/3`，再用 Article Trash 验证主事务回滚后 `on_rejection` 的独立 transaction、固定
   MFA 终点与原始错误保留；
6. 用 Community Application Submit 验证命名 step 的 `workflow_pipeline`，并确认 workflow 不嵌套；
7. 把 runtime identity 混合入口拆成 external entry 与 internal entry，再迁移 shared Support 执行协议；
8. `Commands/` 外的 interaction reaction 由独立 interaction command contract 覆盖，不进入 pipeline
   coverage 或 pipeline graph；不要把它们误报成 concrete pipeline migration；
9. 启用 facade/routing function 拓扑、operation 唯一性与 internal 可达性阻断检查；
10. 已完成 CMS concrete Command 迁移；Backend 第一阶段另完成 Accounts/Messaging 的 21 个显式 Command，均以
    pipeline 行为测试和 backend suite 验收。后续只审计未放在 `Commands/` 的其它 Context 写入口。

迁移期间 public facade 保持不变，旧实现按 action 替换为 pipeline，没有建立第二套业务入口。

### 10.1 术语收口

当前合同和实现只使用 `receipt_pipeline`、`direct_pipeline`、`workflow_pipeline`。泛指业务流程时写
“领域流程”，只在明确指向 DSL 时使用 `workflow_pipeline`，避免一个词同时表示业务概念和执行机制。

### 10.2 Backend 通用 Command Pipeline（第一阶段已实施）

通用 DSL、runner、`GraphAnalyzer`、`Rejected`、rejection context/data/log 和 adapter behavior 已位于
`GroupherServer.CommandPipeline`。CMS 不再拥有 runner；它只通过显式 adapter 提供以下边界能力：

- Gate `Decision -> Rejected` 转换与 Gate join-only callback；
- Receipt claim/finalize 与 Confirmation codec；
- `record_rejection/1 -> Activity.log_rejection/3` 的存储实现；
- CMS 专属的 pipeline graph root、Gate/Lifecycle/Persist policy。

这次提升不是移动 namespace 后让所有写函数套宏。已经迁移的 Accounts/Messaging Command 使用通用 runner；其
CMS Receipt 借用、Activity 记录和其他跨 Context 边界仍通过显式 adapter 或已有 Context facade。后续新增
Context 必须先按“业务 Command，而非任意数据库写入”审计：

1. 枚举 public facade、`Commands/`、job/worker/maintenance 和现有 transaction owner；
2. 对每个动作记录幂等 identity、是否需要首次结果恢复、授权权威、锁、事务范围、post-commit effect 和失败补偿；
3. 需要客户端重试与结果恢复的动作归入 `receipt_pipeline`；不需要 Receipt、每次调用都是独立尝试的动作归入
   `direct_pipeline`；同一顶层 transaction 内的命名步骤才归入 `workflow_pipeline`；
4. advisory lock、跨 Context transaction、消息投递等现有语义不能为迁移而丢失，必要时先补 runner adapter，
   不允许在 Command 里留兼容分支；
5. leaf Persist、Activity recorder、Outbox producer、查询函数和纯 helper 不是顶层 Command，不应被强制包装成
   pipeline。

首批审计范围 Accounts 与 Messaging 的显式 `Commands` 已完成迁移。`Accounts.CollectFolders` 的 CMS Receipt
借用、Messaging 的 post-commit effects、Achievements 的 advisory lock 都已由行为测试验证；它们是迁移验证
样本，不是用 CMS 默认行为覆盖。当前 CI 产物仍只报告 CMS pipeline coverage，不得把它误写成全 Backend
coverage；通用 runner 的非 CMS contracts 由各 Context 的行为测试和编译检查覆盖，当前尚未生成 Backend 级
contracts、coverage 或 graph 产物。

当前第一阶段的迁移清单如下；Accounts/Messaging 行记录的是已验证结果，其他 Context 仍是审计范围：

| Context             |              显式 Command | 初步分类                                                                         | 迁移前必须证明                                                                    |
| ------------------- | ------------------------: | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Accounts            |                        16 | 已迁移：14 个 `direct_pipeline`，CollectFolders Add/Remove 为 `receipt_pipeline` | CMS Receipt 借用、Ecto.Multi 清理、OAuth effect、advisory lock 均有行为测试       |
| Messaging           |                         5 | 已迁移为 `direct_pipeline`                                                       | transaction 后通知/effect 的提交边界与失败语义不变                                |
| 其他 Context 写入口 | 尚未形成完整 Command 清单 | 先发现再分类                                                                     | 不能只扫描 `Commands/`；job/workflow/maintenance 和 facade 内语义写入都要纳入审计 |

这 21 个显式非 CMS Command 已全部进入三种顶层 pipeline：需要恢复结果的用 receipt，不需要的用 direct；
复杂步骤可放进 workflow。当前没有发现需要第四种顶层 pipeline 的业务语义。未放在 `Commands/` 的
job/maintenance/facade 写入口仍按上述清单规则逐项审计，不能因为显式 Commands 已迁移就自动视为覆盖。

## 11. 与 Ash Action 的关系

这里借鉴 Ash Action 的核心不是再建一张中央规则表，而是让 concrete Command 的声明成为真正被 runtime
执行的合同：

- pipeline 类型决定执行协议；
- metadata 和阶段在编译期校验；
- runner 控制真实顺序和 transaction；
- Gate、Lifecycle、Persist 仍各自保持单一权威；
- 静态检查继续约束 pipeline 之外的跨层拓扑。

这比“只用 lint 曲线模拟 Action Contract”更完整：pipeline contract 负责 Command 内部允许哪些阶段以及
按什么顺序执行，`mix cms.pipeline.check` 负责跨模块 pipeline 拓扑，现有 repository gates 负责其他源码
边界，integration test 负责数据库原子性和恢复语义。

## 12. 验收标准

pipeline 实现和后续迁移必须满足：

- external/user facade 的函数名、参数和返回合同不变；internal entry 必须显式使用 `_internal` 命名；
- 源码声明顺序就是 runner 执行顺序，禁止静默重排；
- Command 不手工创建公开 Context/Command struct 再调用 runner；
- user pipeline 缺 Gate 时编译失败，内部例外必须显式声明；
- user pipeline 的 Gate 在 runner transaction 中 load/lock/authorize 一次，并把 canonical resource 传下去；
- internal pipeline 的 `load` 在 runner transaction 中完成 canonical load + lock，只跳过 authorize；
- external/user root 无法直接或间接抵达 internal pipeline；top-level pipeline 不互调，workflow 不嵌套；
- resolver/facade/routing function/pipeline/`on_rejection` 边界里的动态或间接调用必须可静态穷举，否则检查失败；
- 正式受检模块必须提供可读取的宏展开后 debug definitions；缺少展开信息时，未登记 macro 必须失败；
- 受检源码必须完整解析，所有可达 executable AST node 必须被显式分类；partial/recovered AST、unsupported
  construct 或无法证明覆盖完整时检查失败；
- Receipt claim/finalize、领域事实、Confirmation 和 effect intent 原子提交；
- 顶层 receipt/direct pipeline 都声明稳定 `operation`；direct 升级为 receipt 时 operation atom 保持不变；
- `on_rejection` 只由明确的业务 rejection/blocker 触发；Receipt 协议、Confirmation、基础设施与内部错误均不触发；
- `on_rejection` 由 runner 在回滚后的独立 transaction 中执行，只能追加 rejection Audit/Activity，且不替换原始
  错误；receipt 按 commandId 幂等，write 使用 runner 在每次执行入口生成并跨回滚保留的新 UUID；
- `on_rejection` callback 及 helper 的调用图不能抵达 Repo、Persist、Receipt、Outbox 或其他 pipeline；
- `on_rejection` builder 只允许纯数据转换；runner 只调用 adapter 的 `record_rejection/1`，CMS adapter 再调用
  `GroupherServer.Activity.log_rejection/3`。builder 不能通过模块名、behavior 或 action annotation 获得写入权限；
- Confirmation 跨模块合同只在完整 application 编译后由 `mix cms.pipeline.check` 校验，不在 macro 中调用
  `Code.ensure_compiled!/1` 或依赖 `@after_compile`；
- 首次执行与 recovery 经过同一个 `present` 生成相同业务结果；
- workflow step 结果、回滚和 return 目标都有测试；
- routing function 和 shared helper 不获得 Gate、Persist 或 transaction 权威；
- 每迁移一个 action，同时补 pipeline 编译测试和领域行为测试；
- Backend CI 独立运行 `mix cms.pipeline.check --check`、`mix cms.pipeline.coverage --check` 和
  `mix cms.command.pipeline --check`；Node gate 和 `pnpm docs:check` 不消费 pipeline coverage；
- 文档的“当前自动化覆盖”随代码落地同步更新。
