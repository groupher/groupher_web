# CMS Command Pipeline Contract

> 状态：current
>
> 本文只定义当前运行时合同。迁移过程、阶段性数量和历史决策见
> [CMS Command、Gate、Lifecycle 与 Persist 写入边界收口](../migrations/cms-command-gate-lifecycle-persist-boundary.md)。

## 1. 适用边界

Command pipeline 只约束可独立调用的顶层业务写入动作。一个入口在承担以下职责时，才应成为 pipeline：

- canonical domain state；
- 稳定的业务 identity；
- canonical load、锁和主事务；
- retry、ambiguous commit recovery 或补偿；
- Gate admission、Lifecycle transition 与写入顺序。

以下能力保留自己的 owner，不为统一形式迁入 pipeline：

- Persist、Query、Store 等事务内 leaf；
- durable Workflow、Oban job 和 scheduler maintenance；
- projection、cache、search 与 outbox delivery；
- seeds、schema、migration 和 infrastructure helper。

非 Command 写入口的当前结论见
[Backend non-Command write-entry audit](../migrations/backend-non-command-write-entry-audit.md)。它不是待迁移清单。

## 2. 固定调用链

```text
Transport adapter
  -> public Context facade
  -> Commands.<BusinessAction>.execute
  -> receipt_pipeline | direct_pipeline
       -> prepare              optional, transaction 外
       -> load | gate          transaction 内
       -> lifecycle            optional, transaction 内
       -> change               required, transaction 内
       -> confirm              receipt only, transaction 内
       -> commit
       -> present              optional, transaction 外
       -> on_rejection         optional, rollback 后独立 effect
       -> cleanup              optional,失败后的外部资源清理
```

复杂领域流程仍然是普通 `Workflow` 模块或函数，由 `change` stage 调用。Pipeline DSL 不提供
`workflow_pipeline`，也不提供独立 `workflow` stage。

## 3. 两种执行协议

### 3.1 `receipt_pipeline`

用于客户端需要可靠重试和 ambiguous commit recovery 的业务动作：

```text
commandId + fingerprint
  -> Receipt lookup / claim
  -> Runner transaction
  -> immutable Confirmation
  -> commit
  -> canonical result rebuilt from Confirmation
```

强制合同：

- 参数中必须存在 `command_id`；
- `@pipeline` 必须声明 `operation`、`target`、`params` 和 `confirmation`；
- transaction 内必须生成可持久化的 Confirmation；
- replay 返回与首次成功相同的业务结果，不暴露 replay 状态；
- `present` 只能使用已提交的 Confirmation 重建结果。

### 3.2 `direct_pipeline`

用于不需要客户端 Receipt recovery、但仍需要统一 Gate/事务边界的顶层动作：

```text
fresh operation_ref
  -> Runner transaction
  -> canonical domain result
  -> commit
  -> optional present
```

`direct_pipeline` 不得声明 Confirmation，也不能根据 nil `command_id` 在运行时变成 receipt 执行。

## 4. Stage 合同

| Stage          | 事务   | 职责                                                                      |
| -------------- | ------ | ------------------------------------------------------------------------- |
| `prepare`      | 外     | 解析外部输入、准备 capability、调整 target/params；不得写 canonical state |
| `load`         | 内     | internal pipeline 加载 canonical resource；与 `gate` 互斥                 |
| `gate`         | 内     | actor-aware admission；返回并复用 canonical resource                      |
| `lifecycle`    | 内     | actor-independent transition、blocker、version/concurrency guard          |
| `change`       | 内     | 唯一业务变化 stage；可调用 domain Workflow 和事务内 Persist leaf          |
| `confirm`      | 内     | receipt pipeline 生成 immutable recovery anchor                           |
| `present`      | 外     | 提交后构造 public result；不得依赖回滚 struct                             |
| `on_rejection` | 回滚后 | 独立写 rejection audit；失败不能替换原业务错误                            |
| `cleanup`      | 外     | 失败后 best-effort 清理外部 capability；不得修改 canonical state          |

声明顺序就是执行顺序。同一 stage 只能出现一次，且每个 pipeline 必须包含 `change`。

少量使用不意味着可以合并 stage。`lifecycle`、`on_rejection`、`cleanup` 和 `load` 都有独立的事务时机或
authority，不能为了减少 DSL 名称塞进 `change`。

## 5. Gate 与 Lifecycle

### Gate

- Gate 拥有 actor/action admission，不拥有资源状态迁移；
- user pipeline 必须声明 `gate`，且参数中必须有 `actor`、`user` 或 `author`；
- Gate callback 在 Runner transaction 内加载、锁定并授权 canonical resource；
- 后续 stage 必须复用该资源，不得按 ID 再加载另一份；
- join-only Gate API 只能从 `gate` stage 调用；
- typed `Gate.Context.Access.*` 和 `Gate.Context.Scope.*` 保持 fail closed。

### Lifecycle

- Lifecycle 拥有资源状态、允许的 transition、blocker 和 version guard；
- Lifecycle 不判断 actor role 或 permission；
- Gate 可以消费 Lifecycle state 做 admission，但不能成为第二份 state authority；
- transition/write 必须自己执行当前状态和并发保护。

## 6. 事务所有权

Runner 是顶层 Command 主事务的唯一 owner：

```text
Runner transaction
  -> Gate join-only admission
  -> Lifecycle / change
  -> Persist leaf
  -> Confirmation
```

规则：

- Command stage 内不得自行开启另一条顶层业务事务；
- Persist、Store 和 domain leaf 加入调用者已有事务；
- pipeline 内需要执行 `Ecto.Multi` 时，使用 join-only transaction helper；
- join-only helper 在没有调用者事务时必须失败；
- Workflow、maintenance 和 job 在脱离 pipeline 独立运行时，可以拥有自己的事务入口；
- `present`、`on_rejection`、`cleanup` 不在已经回滚的主事务内执行。

## 7. Access 类型

`@pipeline access` 只有三种：

- `:user`：需要 actor 和 Gate；
- `:internal`：可信 job/maintenance entry，不伪造用户；
- `:open`：通用 Backend pipeline 没有 actor admission；CMS pipeline 禁止使用它。

同一业务动作如果同时存在 user 和 internal 入口，应使用不同的 pipeline function，而不是根据运行时参数切换
access、identity 或执行协议。

## 8. Rejection 与错误

- 普通 `{:error, reason}` 直接回滚并返回；
- 只有显式 `CommandPipeline.Rejected` 才触发 `on_rejection`；
- Gate Decision 在 adapter 边界转换为明确 rejection；
- rejection builder 只能构造数据，不能偷偷执行 Repo 写入；
- rejection audit 在主事务回滚后独立执行；
- audit/cleanup 失败通过 telemetry 暴露，但不替换原业务错误。

## 9. 编译合同与门禁

每个 pipeline 编译为 `__pipeline_contracts__/0` metadata。当前自动化只保留两层：

```bash
mix cms.pipeline.check --check
mix cms.command.pipeline --check
```

`cms.pipeline.check` 验证编译合同、adapter ownership、Confirmation 和 rejection builder purity，并维护：

```text
backend/api/priv/pipeline_contracts.json
```

`cms.command.pipeline` 从 facade、Command 和 Repo 调用图验证：

- public entry 可以到达 pipeline；
- user pipeline 不会路由到 internal pipeline；
- pipeline 不嵌套调用另一个顶层 pipeline；
- Gate join-only API 只出现在 `gate` stage；
- 受约束写路径不会绕过 pipeline；
- 动态或无法解析的调用 fail closed。

完整 graph 是本地诊断产物，不作为需要提交的第二份 registry。

不再维护单独的 pipeline coverage manifest。Pipeline contract 与 graph 已经覆盖编译事实和入口可达性；一个只扫描
“已经声明 pipeline 的模块”的 coverage gate 无法发现遗漏候选。

## 10. 新入口决策

新增写入口时依次判断：

1. 它是否是可独立调用的完整业务动作？
2. 它是否拥有 canonical state、identity、锁/事务或 retry/recovery？
3. 它是否需要 user Gate，还是可信 internal access？
4. 客户端是否需要 ambiguous commit recovery？
5. 它是否其实只是 leaf、delivery、maintenance 或 durable workflow？

只有前两项成立时才创建 pipeline；第 4 项成立使用 receipt，否则使用 direct。第 5 项成立时保留原 owner。

## 11. 非目标

- 不建立全 Backend Command Bus；
- 不把所有数据库写入改造成 Command；
- 不把 Workflow、job、maintenance、projection 或 delivery 包装成 pipeline；
- 不建立依靠目录名和启发式规则的全仓 Command inventory；
- 不把 Gate、Lifecycle、Persist 合并成通用 optional context；
- 不把 domain Workflow 重写成 pipeline DSL。

## 12. 验收

涉及 pipeline 合同的修改至少运行：

```bash
cd backend/api
mix format --check-formatted <changed files>
mix compile --warnings-as-errors
mix cms.pipeline.check
mix cms.pipeline.check --check
mix cms.command.pipeline --check
mix test test/groupher_server/cms/command/pipeline_compile_test.exs
mix test test/groupher_server/cms/command/pipeline_runner_test.exs
mix test test/groupher_server/cms/pipeline_static_check_test.exs
```

再按受影响领域运行 focused tests。具体 pipeline 数量以生成的 `pipeline_contracts.json` 为准，不在本文维护时点数字。
