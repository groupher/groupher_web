# Policy Boundary Fix Plan

> 状态：implemented（2026-10-19）

本批次已完成文档合同对应的 runtime 收口：Community passport facts 上移 Gate loader、
Community Application 准入统一为 `Admission`、publish throttle 收回
`Gate.RateLimit.Publish`、Comments required jobs 改名、NameRules/NameAvailability 拆分、
PublicCache 改为 DeliveryConfig，并加入 legacy-owner report/check 脚本。下文保留问题、目标和
迁移证据，供后续审计与回归使用。

本文记录本批次迁移前 `Policy` 命名或职责偏离 [`policy.md`](../architecture/policy.md) 的模块、目标和验收证据。它不是对所有包含“规则”的代码做机械改名。Gate Access/Scope 和 ViewTracker Policy 的模型保留；Gate Access 中已发现的隐式 loader 已在本批次清理。

## 1. 目标

- Policy 收口为基于已加载事实的准入决定；
- 数据加载、配置读取、副作用和持久化回到各自 owner；
- 删除含义过宽的通用 `CMS.Policy` context；
- 默认保持公开成功/拒绝语义和错误协议，并分批迁移；Community 缺失 facts 改为 fail closed、
  Application 重复决策消除和 publish throttle reset 修复属于明确登记、带回归测试的受控行为修正。

## 2. Inventory

| 优先级 | 迁移前模块                                                                                             | 问题                                                                                  | 目标方向                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| P0     | `CMS.Gate.Access.Policy.Community` / `Communities.Passport`                                            | Community Policy 在 facts 缺失时通过 Passport 间接访问 ORM                            | Passport facts 上移 Gate Access Load，Policy 缺失 facts 时 fail closed                         |
| P0     | `CMS.CommunityApplications.Policy` / `Gate.Access.Policy.Application` / Submit                         | Gate 和 Command 重复查询并决策，持久化 snapshot 不一定等于 Gate decision              | `CommunityApplications.Admission` 一次组织配置、具名查询和 Policy input，并返回可复用 decision |
| P0     | `CMS.Gate.RateLimit.Publish` / `CMS.Policy` / `CMS.Policy.Config` / `CMS.Policy.Model.PublishThrottle` | 真实 owner 与 delegate namespace 并存；`load_publish_throttle/1` 会写库且重置条件可疑 | 保留 `Gate.RateLimit.Publish` 为唯一入口，收口 Config/Model 并明确 reset 语义                  |
| P0     | `CMS.Comments.JobPolicy`                                                                               | 名为 Policy，但函数直接 enqueue required job 并转换错误                               | 改为 `RequiredJobs` 或 `JobContract`                                                           |
| P1     | `CMS.Communities.NamePolicy`                                                                           | normalization、规则、claim/community 查询和 cooldown 查询混在一起                     | `NameRules` + `NameAvailability`                                                               |
| P2     | `PublicCache.Policy`                                                                                   | 只返回 timeout/retry/tag-count 配置，不作 allow/deny                                  | 改为 `DeliveryConfig`                                                                          |
| P2     | `CMS.Communities.Enable`                                                                               | 以 policy decision 描述 enablement，但通过 `FrontDesk.community` 隐式查询             | **deferred follow-up**：本批不改名；后续抽离明确 loader，不机械改名                            |

### 2.1 Gate Community Passport loader

迁移前的 `Gate.Access.Policy.Community.passport_rules/1` 优先读 user 上的 embedded passport；缺失时会调用 `Communities.Passport.get_passport/1`，后者执行 `ORM.find/2` 和 `ORM.find_by/2`。这使 Policy 拥有了一条不可见的查询分支。

目标链路：

```text
Access.Check(actor, action, community)
          |
          v
Load.Query.community(actor, community)
├── load canonical Community
├── load canonical CommunityLifecycle
├── load and normalize passport rules once
└── Context.Access.Community{
      community,
      community_lifecycle,
      passport_rules
    }
          |
          v
Gate.Access.Policy.Community
├── consume context.passport_rules
└── missing required facts -> fail closed
```

迁移必须显式包含：

1. 扩展 `Gate.Context.Access.Community`，将 `passport_rules` 加入 struct、`@enforce_keys` 和 type；
2. 将 `Load.Query.community/2` 改为接收 actor 的 loader；
3. 更新 `Access.Check` 到 loader 的调用链；
4. inventory 并迁移生产代码和测试中所有手动构造 `%Context.Access.Community{}` 的位置；
5. 保留 embedded passport 优先级和 `PermissionRegistry.normalize_rules/1` 语义，但不在 Policy 中保留 fallback query。

迁移前 Community Policy 中对 `:lifecycle_not_loaded` 的 `community.pending == 0` fallback 也必须删除。Canonical loader 已在 lifecycle 缺失时返回 `lifecycle_not_found`；Policy 再根据 legacy `pending` 字段放行，会掩盖残缺 Context 和绕过 loader 的调用。这不登记为长期 exception：缺失 `community_lifecycle` 一律返回稳定 denial/error。

验收需包含 embedded passport、DB passport、无 passport、passport loader 失败、lifecycle 缺失和手动残缺 Context 六类测试，并对 Gate 入口做 query-count 断言。

## 3. P0：Publish throttle 退出通用 CMS.Policy

### 3.1 迁移前问题

当前结构：

```text
CMS.Policy
├── record/1
├── load_publish_throttle/1
└── mock_publish_throttle_attr/3
      |
      v
Gate.RateLimit.Publish
      |
      +-> CMS.Policy.Config
      +-> CMS.Policy.Model.PublishThrottle
      +-> Repo/state mutation
```

这里的核心能力是 publish throttle，不是一个可以承载所有 CMS rule state 的通用 Policy context。`record/1` 和 model persistence 也不是
Policy decision。

`CMS.Policy` 本身只是 delegate，生产实现和真实 owner 是 `CMS.Gate.RateLimit.Publish`。另外，`load_publish_throttle/1` 会根据时间窗口更新计数器，不是纯 load。当 day/hour 计数同时过期时，当前分支可能返回未清零的旧 record，需要在迁移前用测试固定正确语义。

### 3.2 目标

```text
CMS.Gate.RateLimit.Publish
├── Config
├── Model.PublishThrottle
├── load_current/1
├── reset_window_if_needed/2
├── check/2
└── record/1
```

若需要纯规则，应单独放在内部：

```text
loaded throttle facts + configured limits
                  |
                  v
       PublishThrottle.Decision
                  |
             allow / deny
```

### 3.3 迁移

1. 全量 inventory `CMS.Policy.*` 与 `CMS.Gate.RateLimit.Publish` caller；
2. 为 interval/hour/day 单独过期和同时过期补回归测试；
3. 拆分 load/reset，或明确命名为 `load_and_reset/1`；
4. 将 Config/Model 移入 `Gate.RateLimit.Publish` capability；
5. 迁移调用方和测试；
6. 删除 `CMS.Policy` 通用 delegate/context，不建立第二个长期 facade。

## 4. P0：Comments.JobPolicy 改为 required-job contract

### 4.1 迁移前问题

`CMS.Comments.JobPolicy.audition/1,2` 会直接调用 `Jobs.audition/1`，并把 enqueue 失败转换成 Comments ErrorCat：

```text
Comment mutation transaction
        |
        v
Comments.JobPolicy
├── enqueue Oban job
└── map infrastructure failure
```

它表达的是“事务提交前必须成功 enqueue”的工作流合同，不是基于事实作 allow/deny 的 Policy。

### 4.2 目标

推荐命名：

```text
CMS.Comments.RequiredJobs.audition/1
```

或：

```text
CMS.Comments.JobContract.enqueue_audition/1
```

目标模块可以继续拥有当前稳定错误映射和测试注入函数，但 moduledoc 应明确它是 transaction-required effect，而非 admission policy。

### 4.3 迁移

1. 新增具名模块并保持函数返回合同；
2. 迁移 Comments command/workflow caller；
3. 更新测试和文档；
4. 删除 `JobPolicy` alias，不保留长期兼容层。

## 5. P0：Admission 一次组织 CommunityApplications 准入输入

### 5.1 当前问题

`can_apply/2` 同时：

- 从 Application env 读取 feature flag；
- 使用 `Repo.exists?` 查询 blocking application；
- 组合 allow/deny result；
- 将 denial 映射为 ErrorCat。

Submit 在迁移前的当前实现中会产生两次决策；以下是 legacy/current-before-migration 链路，不是目标合同：

```text
Gate.check_application_create_in_transaction
  -> Gate.Access.Policy.Application.check_create
      -> Policy.can_apply(user)                 # 第一次

Submit.prepare_new_submission
  -> Policy.can_apply(user)                     # 第二次
      -> persisted policy_snapshot
```

这会产生重复 `Repo.exists?`，而且 Gate 准入与 persisted snapshot 可能来自不同事实快照。`LogoUploads.create_intent/2`、`CommunityApplications.can_apply/1` 和 `state/1` 也直接调用该 Policy，不能只修 Submit。

```text
user
  -> Policy
      ├── read config
      ├── Repo.exists?
      └── decide
```

隐藏查询让调用方无法控制事务快照、query budget 或准入输入复用，也使规则测试依赖数据库。

### 5.2 目标

```text
CommunityApplications.Admission.check(action, actor)
├── Config.application_admission()
├── Query.active_application_exists(actor.id)
├── build %CommunityApplications.Policy.Input{
│     feature_enabled,
│     active_application_exists
│   }
└── Policy.check(actor, action, input)
          |
          v
decision
├── allowed / denial reason
└── snapshot projection via Decision.snapshot/1
```

`CommunityApplications.Admission` 是普通 Elixir 编排代码：它显式读取 typed config，调用具名 Query，构造 `%Policy.Input{}`，再调用纯 Policy。首期不建立 `CommunityApplications.Facts` 或通用 facts loader。只有未来同一组输入包含多个查询并被多个准入流程独立复用时，才重新评估具名 loader。

Policy 保留 feature flag 与 single-active-application 的组合规则；Admission 在调用方的事务/锁边界内只组织一次输入和决策，Gate/Command 复用同一 decision。`CommunityApplications.Config` 是读取 Application env 的唯一 owner；Query、`Policy.Input` 和 Policy 都不自行读 env。`denial_error/1` 移到 Admission 或领域 Error/facade。

Config 返回合同冻结为：

```elixir
CommunityApplications.Config.application_admission()
# => {:ok, %CommunityApplications.Config.Admission{}}
#  | {:error, reason}
```

`Config.Admission` 是 Admission 编排层的 typed input；配置读取、shape 校验或值校验失败都通过 `{:error, reason}` 返回，不伪装成 Policy denial。

Decision 的唯一内部形状冻结为：

```elixir
%CommunityApplications.Decision{
  allowed: boolean(),
  reason_code: atom() | nil,
  retry_at: DateTime.t() | nil,
  metadata: map()
}
```

Decision 不再内嵌另一份 `snapshot` map。持久化边界通过 `Decision.snapshot/1` 从同一 struct 生成现有 `policy_snapshot` 形状：

```elixir
Decision.snapshot(decision)
# => %{
#   allowed: decision.allowed,
#   reason_code: decision.reason_code,
#   retry_at: decision.retry_at,
#   metadata: decision.metadata
# }
```

内部返回合同：

```elixir
CommunityApplications.Policy.check(actor, action, %CommunityApplications.Policy.Input{})
# => {:ok, %CommunityApplications.Decision{allowed: true}}
#  | {:error, %CommunityApplications.Decision{allowed: false}}

CommunityApplications.Admission.check(:application_create, actor)
# => {:ok, %CommunityApplications.Decision{allowed: true}}
#  | {:error, ErrorCat.error()}

CommunityApplications.Admission.check(:application_logo_upload_create, actor)
# => {:ok, %CommunityApplications.Decision{allowed: true}}
#  | {:error, ErrorCat.error()}
```

`Policy.check/3` 的 denied Decision 作为 `{:error, reason}` 保留 `reason_code`、`retry_at` 和 `metadata`；Admission facade 将它映射为领域 ErrorCat。Application create 尚无 canonical resource，不进入普通 `Gate.access_check/3`。删除 `Gate.Access.Policy.Application.check_create/1`，不保留 thin delegate；`Gate.Access.Policy.Application` 只继续处理已存在 Application resource 的 reviewer/applicant `check_access/3`。这不是裸 struct 业务返回例外。

错误形状在边界上分开：

```text
Config/Query {:error, reason}
  -> config / infrastructure / query error

Policy {:error, %Decision{allowed: false}}
  -> intentional business denial

Admission
  -> map denied Decision to ErrorCat
  -> expose {:ok, decision} | {:error, ErrorCat.error()}
```

CommandPipeline 的 gate stage 直接调用 Admission，再把 decision 与 actor 包装进 stage value
显式传递，不写入 `StageContext` 或 process state。Admission 本身仍只返回 Decision：

```elixir
CommunityApplications.Admission.check(:application_create, actor)
# => {:ok, %CommunityApplications.Decision{allowed: true}}

# gate stage value
%{actor: actor, application_decision: decision}
```

Pipeline 传递链路：

```text
gate callback
  -> %{actor, application_decision}
  -> workflow callback
  -> submit_workflow(attrs, actor, application_decision, command_id)
  -> prepare_new_submission(..., application_decision)
  -> policy_snapshot = Decision.snapshot(application_decision)
```

`prepare_new_submission` 不再调用 `Policy.can_apply/1`。`submit_command_lookup` 的 replay hit 当前发生在 Gate 之后，因此会重新执行 admission；首期保留这一现有语义，若要让已成功命令在新规则下仍能直接 replay，必须另立 Command Receipt 合同变更。

其他入口分开处理：

- `LogoUploads.create_intent/2` 首期冻结为独立 domain admission facade：`CommunityApplications.Admission.check(:application_logo_upload_create, actor)` 完整执行 `Config.application_admission() -> Query.active_application_exists(actor.id) -> %Policy.Input{} -> Policy.check(actor, action, input)`；
- `:application_logo_upload_create` 是 CommunityApplications 内部 domain admission action atom，不加入 `Gate.Const.gate_action`、生成的 `GateAction` 或 `packages/contracts`，也不对应 Passport grant；
- `can_apply/1` 和 `state/1` 的只读 facade 同样复用 `Admission` 的
  `Config -> Query -> Policy.Input -> Policy` 编排（读取 Decision 时使用
  `Admission.evaluate/2`），不让 Query、`Policy.Input` 或 Policy 自己读 env。

Pipeline create admission、Logo Admission 和只读 facade 的 config/query/policy 链路必须保持一致，并由 `CommunityApplications.Admission` 统一编排。Config/Query 的读取或校验错误与 `Policy.check/3` 的 intentional business denial 只在 Admission 边界区分和转换。

LogoUploads 不声称运行在 CommandPipeline Gate stage。若未来将 upload intent 迁入正式 CommandPipeline，再单独决定是否将该 action 升级为共享 Gate contract。

Admission 是可直接阅读的普通逻辑，目标骨架如下：

```elixir
def check(action, actor) do
  with {:ok, config} <- Config.application_admission(),
       {:ok, active?} <- Query.active_application_exists(actor.id) do
    input = %Policy.Input{
      feature_enabled: config.enabled,
      active_application_exists: active?
    }

    case Policy.check(actor, action, input) do
      {:ok, decision} -> {:ok, decision}
      {:error, denied_decision} -> {:error, denial_error(denied_decision)}
    end
  end
end
```

删除 `Gate.check_application_create_in_transaction/1`、
`Gate.with_application_create_check/2` 和 `Gate.Access.Policy.Application.check_create/1`，不为
尚不存在 canonical resource 的 create admission 扩展 Gate facade。Pipeline runner 继续拥有
事务和 gate stage；Admission 只在该边界内组织 Config、Query、`%Policy.Input{}` 和纯 Policy decision。

### 5.3 迁移

1. 为当前规则补纯 decision matrix 测试；
2. 抽出 `Query.active_application_exists/1` 和 typed feature config loader；
3. 建立 `CommunityApplications.Decision` 和唯一的 `Decision.snapshot/1` 持久化投影；
4. 建立 `Policy.Input` 和普通 `CommunityApplications.Admission` 编排函数，不建立通用 `Facts.load`；
5. 删除 `Gate.Access.Policy.Application.check_create/1`、`Gate.check_application_create_in_transaction/1`
   和 `Gate.with_application_create_check/2`，不保留 thin delegate；CommandPipeline gate stage 在
   自己的事务边界内直接调用一次 `Admission.check(:application_create, actor)`，并返回
   `%{actor: actor, application_decision: decision}`；
6. 更新 Submit gate/workflow 签名，删除第二次 `can_apply` 并用 `Decision.snapshot/1` 生成 `policy_snapshot`；
7. 更新 Pipeline gate/workflow callback，显式传入同一 authorized value；
8. 为 LogoUploads 增加 `:application_logo_upload_create` action，同时迁移只读 `can_apply/state` caller；
9. `Policy.check/3` 改为返回 `{:ok, allowed_decision} | {:error, denied_decision}` 的纯函数，ErrorCat 映射移出 Policy；
10. 删除 Policy 内的 Repo/Application env 依赖。

## 6. P1：Communities.NamePolicy 拆 Rules 与 Availability

### 6.1 迁移前问题

当前模块同时拥有：

```text
normalize + format pattern + reserved names
               +
CommunitySlugClaim query + Community query + cooldown query
```

格式和 reserved name 是纯规则；跨表占用与 cooldown 是 availability 查询。将两者都称为 Policy，使调用方看不出 `check/2` 会访问数据库。

### 6.2 目标

```text
Communities.NameRules
├── normalize/1
├── format_check/1
└── reserved_slugs/0

Communities.NameAvailability
├── check/2
├── load blocking claim
├── load existing Community
└── evaluate cooldown
```

若 availability 最终需要组合复杂 allow/deny facts，可在内部增加纯 `NameDecision`，但不要为保持旧名字而强行保留 Policy。

### 6.3 迁移

1. 固定 normalize、reserved、claimed、disputed、cooldown 的行为测试；
2. 将纯格式规则移到 `NameRules`；
3. 将 Repo queries 移到 `NameAvailability`；
4. 迁移 Community/Application caller；
5. 删除 `NamePolicy`，不建立双重 runtime authority。

## 7. P2：PublicCache.Policy 改为 DeliveryConfig

### 7.1 迁移前问题

当前模块仅从 Application env 返回：

```text
timeout_ms
max_attempts
retry delays
max_tags_per_request
delivery lease
pending SLO
```

它没有 actor、action、facts 或 allow/deny decision，本质是 runtime delivery config。

### 7.2 目标

```text
GroupherServer.PublicCache.DeliveryConfig
```

保留现有默认值和 getter，迁移 caller 后删除旧模块。若未来出现“某次 purge 是否允许投递”的业务决定，再建立消费 delivery facts 的
纯 Policy，不能让 Config 预占该名字。

这一迁移必须同时更新：

- `backend/api/config/config.exs` 中的 Application env key；
- `public_cache.ex`、`workflow.ex`、`tags.ex` 等 caller；
- override/default 配置测试，防止改名后 override 静默失效。

## 8. 明确不修的模块

以下模块的整体模型符合 [`policy.md`](../architecture/policy.md)，本计划不改名：

- `CMS.Gate.Access.Policy.Article` 与 `Comment`；
- `CMS.Gate.Scope.Policy` behavior 与各 resource Scope implementation；
- `CMS.ViewTracker.Policy`；
- `Accounts.ProfileViewTracker.Policy`。

`Gate.Access.Policy.Community` 保留 Policy 名字，但其 Passport 隐式加载必须迁出。`Gate.Access.Policy.Application` 是 Application 专用入口，当前不在 `Gate.Access.Policy` facade 中，应随 §5 一起改造。

以下只是局部术语，不因为出现小写 `policy` 就机械改名：

- `CMS.Command.IntentCodec` 的 closed encoding policy；
- process manager 的 start policy；
- cache header 或 job uniqueness 文档中的 policy 描述。

`CMS.Communities.Enable` 也不做机械改名；它通过 `FrontDesk.community` 做隐式查询的问题，作为后续 loader 边界清理项。

## 9. 实施顺序

```text
Phase A
  -> inventory callers, config keys and affected contract docs
  -> add behavior/query-count baselines for Gate and throttle
  -> rename Comments.JobPolicy
  -> rename PublicCache.Policy

Phase B
  -> move Community passport loading into Gate Access Load

Phase C
  -> split CommunityApplications admission orchestration from decision
  -> remove duplicate CommunityApplications decision

Phase D
  -> replace generic CMS.Policy with Gate.RateLimit.Publish capability

Phase E
  -> split NameRules from NameAvailability

Phase F
  -> add report-only lint for direct and known indirect loaders
  -> promote each completed legacy-owner rule to a blocking gate
  -> document justified exceptions, if any
```

每个实施批次都必须同步更新其 current contract 和直接关联的历史 owner 说明；Phase F 只做全局
收口，不延迟前述文档更新。先做等价移动与 caller 迁移，再做纯化；不要把改名、事务变化和
业务规则变化塞进同一批。

## 10. 验收标准

- 新 Policy 模块默认不 import/alias `Repo`、ORM、Jobs 或 provider client，也不直接读 Application env；
- report-only lint 同时报告 `Passport`、`FrontDesk` 和已知 Query/domain loader facade，不仅搜直接 alias；
- 除明确登记的 Community fail-closed 修复外，Gate Access/Scope 行为和 ErrorCat 不变；
- `Context.Access.Community` 必须携带 normalized `passport_rules`，`Access.Check` 必须将 actor 传入 Community loader；
- Community Policy 不再通过 Passport 隐式查库，passport/lifecycle facts 缺失时 fail closed，不再 fallback 到 `community.pending`；
- Community application 准入规则有纯 decision matrix 测试；
- `CommunityApplications.Policy.check/3` 统一返回 `{:ok, allowed_decision} | {:error, denied_decision}`，不返回裸 Decision struct；
- `CommunityApplications.Admission` 只读取一次 Config、执行一次具名 blocking-application Query 并构造 `%Policy.Input{}`，不存在 `CommunityApplications.Facts` 模块；
- `Gate.Access.Policy.Application.check_create/1`、`Gate.check_application_create_in_transaction/1`
  和 `Gate.with_application_create_check/2` 已删除且没有 thin delegate，create admission 的唯一 owner
  是 `CommunityApplications.Admission`；
- Community application Submit 只执行一次 Admission decision，Pipeline gate stage 返回的
  `%CommunityApplications.Decision{}` 被 workflow 显式消费，且 `Decision.snapshot/1` 是 persisted
  snapshot 的唯一来源；
- Logo upload intent 通过 `CommunityApplications.Admission` 使用内部 `:application_logo_upload_create` action，返回 `{:ok, decision} | {:error, ErrorCat.error()}`，不进入共享 GateAction 或 Passport contract；
- name availability 的 query 行为与当前 claimed/disputed/cooldown 语义一致；
- Comments required audition enqueue 的事务失败合同不变；
- publish throttle 的 interval/hour/day 窗口都有回归测试，同时过期时不返回旧计数；
- PublicCache delivery 默认值和 override 行为不变；
- `CMS.Policy`、`CMS.Policy.Config`、`CMS.Policy.Model.PublishThrottle`、`Comments.JobPolicy`、`Communities.NamePolicy` 和 `PublicCache.Policy` 旧 namespace/模块最终删除；
- active runtime、测试和当前合同文档中的旧 Policy owner 引用归零；
- `docs/architecture/policy.md` 不再将已完成的 Community/Application 偏差描述为当前实现；
- 没有长期 alias、双写或双重 runtime authority。

旧 namespace 检查拆成两类。

阻塞门禁只扫 active runtime、测试、配置和明确的 current contract 文档：

```bash
rg 'CMS\.Policy|PublicCache\.Policy|Comments\.JobPolicy|\bNamePolicy(?:\b|Test\b)' \
  backend/api/lib \
  backend/api/test \
  backend/api/config \
  docs/architecture/policy.md \
  docs/apply/v1.md \
  docs/feature/gate/v2.md \
  docs/deploy/cloudflare.md \
  docs/feature/interaction/v4.md
```

该命令在迁移完成后必须零命中。`CMS\.Policy` 已覆盖 `CMS.Policy.Config` 和 `CMS.Policy.Model.PublishThrottle`，不再重复列出子 namespace；`\bNamePolicy(?:\b|Test\b)` 同时覆盖完整 `Communities.NamePolicy`、alias 后的裸 `NamePolicy` 和 `NamePolicyTest`。

报告门禁复用同一组 legacy owner patterns，扫描整个 `docs` 和历史架构记录，输出 file + line + matched owner 供人工确认，不使用“命中即失败”。它必须：

- allowlist 本 migration plan 中的目标描述；
- 仅在存在 superseded/current-owner 上下文时允许历史引用；
- 将 `backend/api/priv/pipeline_graph.json` 等生成产物分类报告，不混入源码阻塞门禁。

两类检查现已落成 `scripts/check-policy-boundary.mjs` 与对应测试：
`pnpm check:policy-boundary` 阻塞 active runtime/current contract 命中，
`pnpm report:policy-boundary` 同时输出历史文档和生成产物命中供审计，不长期依赖复杂 shell 命令。

### 10.1 本次审计证据（2026-10-19）

本批次的实现与合同检查结果如下：

- `mix compile --warnings-as-errors`：通过；
- 本批涉及的 Policy Elixir 文件执行 `mix format --check-formatted`：通过；当前混合工作树的全量
  glob 检查仍会命中既有的非 Policy 未格式化文件，不作为本批回归结论；
- `node scripts/check-documentation.mjs`：通过；
- `node scripts/check-policy-boundary.mjs --check`：通过，active findings `0`；
- Policy 相关定向测试：`73` 个通过；
- `mix cms.command.pipeline`：通过并重新生成被 gitignore 的
  `backend/api/priv/pipeline_graph.json`，当前报告无 unresolved、unreached 或 mixed-protocol
  结果，生成物不作为源码阻塞门禁依据；
- 完整 `mix test` 未作为本批次的通过结论：当前环境出现 Postgrex `too_many_connections`、超时和
  非 Policy 的 command/analysis 失败，需在 CI 或降低 `--max-cases` 后重新跑完整套件。

其中 `CMS.Communities.Enable` 仍是明确的 deferred follow-up，不属于本批 P0/P1 与 PublicCache
收口范围；后续抽离 loader 时应单独补齐实现、测试和合同证据。

## 11. 文档同步清单

当前合同文档必须随模块迁移同批更新：

- `docs/architecture/policy.md`；
- `docs/apply/v1.md`；
- `docs/feature/gate/v2.md`；
- `docs/deploy/cloudflare.md`；
- `docs/feature/interaction/v4.md`。

`docs/apply/v1.md` 已冻结为 `Admission config/query/input -> pure Policy decision -> CommandPipeline
gate stage -> workflow`，避免被误读为通用 Policy context，也不为 Application create 扩展普通
resource Gate facade。

以下是历史专项设计，但仍包含有效约束；保留历史描述，同时更新有效模块引用或注明当前 owner：

- `docs/architecture/public-cache-invalidation.md`；
- `docs/architecture/article-stats-target.md`。

历史架构文档 `backend-module-reorganization.md` 和 `cms-facade-directory.md` 不重写历史，但应增加 superseded 说明并链接到当前 Policy 合同。
