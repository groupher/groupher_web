# PR 594 review remediation

状态：`implementation-complete / awaiting GitHub verification`

本文记录 PR 594 未解决 review thread 的核实结果、长期修复方式和完成证据。它是本次收敛工作的执行清单，不是新的架构 authority；规则仍以 `docs/rules/` 和对应 current architecture/feature 文档为准。

## 完成标准

- 当前代码不再命中已确认的生产逻辑、迁移安全和数据一致性问题。
- checker 对真实语法工作，不依赖可被字符串、注释、sigil 或动态调用绕过的裸文本匹配。
- current 文档只引用 current authority；historical 文档不再反向声明权威性。
- 每项修复有针对性测试或可重复的静态检查。
- GitHub review thread 获得带验证证据的回复；已处理 thread 关闭。
- 推送后的 GitHub Actions 全部通过，并再次检查新增 review。

## A. 发布阻断问题

| Thread                                                 | 核实结果                                                                        | 长期修复                                                                                                                 | 验证                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Account follow event 参数反转                          | 成立。enqueue 把 follower 写入 `user_id`，Worker 却把它当通知接收者             | 统一 payload 语义为 target user + actor user，并用 Worker 测试锁定接收者                                                 | follow/undo-follow Worker 测试                |
| legacy Job cleanup 删除仍存活的 Worker                 | 成立。migration 按 worker 名整类删除，当前 Worker 仍处理 version 1 contract     | 只删除可识别的旧 payload shape，不删除当前 versioned contract                                                            | migration SQL 审查 + contract 测试            |
| Outbox status rename 不支持滚动发布                    | 成立。旧 release 无法解码新值，新 release 无法解码旧值                          | 不在普通 migration 中原地重写仍被运行时代码使用的枚举；撤销危险 migration，保留兼容 vocabulary 或采用显式停机/两阶段迁移 | migration 测试与 Outbox 状态测试              |
| Community analysis provisioning 把字符串 ID 当 slug    | 成立。Outbox `resource_id` 是字符串，FrontDesk binary locator 是 slug           | 在 durable contract 边界严格解析整数 ID，再调用根 Facade                                                                 | Community workflow 测试                       |
| Article update / main Doc publish 漏 projection intent | 成立。部分路径直调 persistence target，没有经过负责 enqueue 的 publish workflow | 所有正式 publish 从统一 `Articles.Workflow.publish` 进入；Target 只保留 persistence transition                           | ordinary update、main Doc publish outbox 测试 |

## B. 重试、幂等和数据一致性

| Thread                                        | 核实结果             | 长期修复                                                                                                       |
| --------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| Article projection retry 重复 activity        | 成立                 | activity 使用稳定 event identity 幂等写入，或把各投递拆成可独立重试的 effect；不得以“忽略错误”掩盖失败         |
| Interaction retry 重复已读 notification       | 成立                 | notification 以 outbox event/effect identity 幂等，不以 unread 状态判断是否已发送                              |
| deleted Comment effect 永久重试               | 成立                 | 已删除资源是幂等完成 `{:ok, :pass}`，非法 contract 才失败                                                      |
| contribution cache enqueue 静默失败           | 成立                 | 经 `Jobs.enqueue_best_effort/3` 记录有限、无敏感信息的失败日志                                                 |
| Binding move 删除 destination-local 数据      | 成立                 | destination 已存在 binding 时保留 destination owner 数据，合并/删除 source binding，不删除 destination binding |
| Binding move 后 metric community 仍是 source  | 成立                 | move transaction 内同步 binding-scoped metric scope，或以 binding 为唯一归属并重建冗余 community 字段          |
| metric foreign-key cascade 缺少 leading index | 成立                 | 两张 metric 表增加 `binding_id` leading index                                                                  |
| `binding_id` 与 `community_id` 冲突被静默接受 | 成立                 | 同时提供时必须一致，否则返回明确错误                                                                           |
| Analysis 直接查询 CMS binding table           | 成立                 | 通过 CMS 根 Facade 暴露稳定 binding resolver；Analysis 不依赖 CMS schema                                       |
| Press receipt replay 可能漏 invalidation      | 成立但只影响升级窗口 | durable intent 必须与 receipt 的业务提交位于同一 transaction；不能依赖只在首次 action 后运行的 after-step      |

## C. Job contract 与 checker

| Thread                                              | 核实结果 | 长期修复                                                                        |
| --------------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| transaction callback 裸文本误判嵌套 `{:error, ...}` | 成立     | 检查 transaction callback 的顶层返回语义，并用正反 fixture 锁定                 |
| payload key 扫描注释和字符串                        | 成立     | 先屏蔽 Elixir comment/string/sigil，再检查 map key 语法                         |
| `apply/3` 绕过动态 callback 禁令                    | 成立     | Worker/job path 禁止持久化 contract 驱动的 `apply/3`                            |
| sigil interpolation 吞掉后续模块                    | 成立     | sigil delimiter scanner 正确跨过 `#{...}`，包括表达式内字符串和嵌套括号         |
| docs checker 不识别 `~~~` fence                     | 成立     | 同时识别 backtick/tilde fence 及 fence 长度                                     |
| Markdown link parser 不支持 title/括号              | 成立     | 解析 destination、可选 title 和 balanced parentheses，不用单个 `[^)]` 正则      |
| maintenance Job 被要求虚构 resource ID              | 成立     | 只有引用业务资源时才要求稳定 ID；无资源 maintenance contract 可省略             |
| “禁止模块名”误伤 Oban worker routing metadata       | 成立     | 禁止范围限定为业务 payload/callback；Worker 名是队列系统 routing metadata       |
| queue pause 被描述为可阻止旧 writer enqueue         | 成立     | rollout 必须先发布 compatible writers，再清理旧 payload；暂停消费不等于停止写入 |
| snapshot 示例与函数 contract 不一致                 | 成立     | article/comment 示例使用 `%{thread: ..., ids: ...}`                             |

## D. 文档、示例和测试

- 强化 `Repo.transact_result/1` 测试：callback 先写数据库再返回 error，断言数据确实回滚。
- 修正 Job moduledoc 示例中缺少的 `version: 1`。
- 修正 resource-loading 文档里的真实调用链和 Article + Community stable identity。
- Read/Write owner migration 文档明确 contributes/cache 只在缺失时建立。
- `cms-outbox.md` 区分 Command Receipt 的 `completed retry` 与 Outbox `done` 状态。
- Gate README 使用真实 `scope/4` 和 `with_check/4`。
- FrontDesk current README 接收仍然有效的 `view` 与稳定单资源 projection 规则；所有 current 文档停止引用 historical V2 作为 authority。
- Profile ViewTracker 公开 mutation 只记录 `{tracked, views}`；`counted` 若保留，只能描述内部判定。
- Widget 标记为 `in-progress`；Interaction V4 cleanup 回到中央 roadmap。
- CMS Command V3、Article Stats Target 等 historical 文档只描述历史背景，不再声称取代 current authority。
- Profile query 不应恢复隐式写入；显式 mutation 的服务/GraphQL/client contract 已覆盖。产品页面真正接入前保留为 roadmap 工作，而不是恢复旧 `ProfileVisit` Job 测试。

## E. 较小的契约质量问题

- Article Effects 参数 fallback 返回通用 invalid-arguments，不能把所有非法字段误报为 identity 缺失。
- 所有修复后的 moduledoc、示例和 spec 与实际返回形状保持一致。

## F. 第二轮 review

- Outbox correction migration 不再把语义有歧义的 `failed` 强制改成 terminal `dead`；歧义时保留可重试，后续 terminal 写入使用明确的 `dead`。
- 正常 Doc publish 已确认支持 `workflow_ref`，并将其转换为 workflow identity；无需恢复隐式 command ID。
- notification replay 的公开 spec 包含 `:already_delivered`，delivery foreign key 增加反向索引。
- Move 复用已有 destination Binding 时，raw metric 改绑，hourly metric 按维度合并 value 后再删除 source Binding，避免 cascade 丢失历史。
- Elixir sigil masker 区分可插值的小写 sigil 与字面量大写 sigil；Markdown fence parser 支持缩进 closing fence。
- 本文已接入 migration index，避免验证记录成为孤立文档。

## 执行批次

1. 生产阻断与 migration safety。
2. 幂等、binding/metric 数据一致性与跨边界访问。
3. checker parser、fixture 和回归测试。
4. 文档 authority、示例、roadmap 和测试质量。
5. 全部门禁、推送、GitHub Actions、thread 回复/关闭与新增 review 复查。

## 本地完成证据

- `MIX_ENV=test mix test`：2247 passed，0 failures，1 excluded。
- `MIX_ENV=test mix compile --warnings-as-errors`：通过。
- 测试数据库从零执行全部 migration：通过；包含 Outbox correction 与 notification delivery 索引。
- `mix lint`：Context v2 与 module-style gate 通过；Credo 仍只报告仓库既有债务，不作为本次新增问题。
- `pnpm docs:check`：文档、CMS/Context/Facade/Binding/Resolver/return-shape/command-identity gate 全部通过。
- changed Elixir files 的 `mix format --check-formatted` 与 `git diff --check`：通过。

尚待完成的是远端步骤：推送提交、等待 GitHub Actions、逐条回复并关闭已验证的 review thread，再检查是否出现新的有效评论。
