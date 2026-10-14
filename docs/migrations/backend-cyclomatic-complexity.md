# Backend Cyclomatic Complexity

> 状态：completed
> 基线日期：2026-10-14
> 完成日期：2026-10-14
> 结果：26 个 finding、22 个文件降至 0 个 finding

本文单独跟踪 `Credo.Check.Refactor.CyclomaticComplexity`。复杂度 finding 是审计入口，不自动等同于 bug；本批按风险和职责边界完成具名拆分，并保持原有业务顺序、查询范围与恢复语义。

## 1. 判断原则

优先拆分同时承担多种职责的函数：

```text
输入规范化
  -> 数据加载
  -> 授权 / 状态判断
  -> 写入 / transaction
  -> 错误转换
  -> 外部副作用
```

仅包含一组稳定、顺序清晰、无副作用校验规则的 `cond` 可以保留，即使静态复杂度偏高。不能为了降低数字制造大量只调用一次、没有业务名字的 helper。

## 2. 完整基线

| 领域           | 文件 / 函数                                             | Before | After | 初步分类                    |
| -------------- | ------------------------------------------------------- | -----: | ----: | --------------------------- |
| Analysis       | `ArticleInsights.Query.fetch_rows/8`                    |     15 |     8 | 查询组合                    |
| Analysis       | `MetricEvent.Persist.validate/1`                        |     12 |     3 | 输入校验                    |
| Analysis       | `Web.Provider.Umami.normalize_visitor_region_row/1`     |     11 |     4 | provider 数据规范化         |
| Articles       | `Publish.Doc.binding_community/3`                       |     13 |     3 | resource resolution         |
| Articles       | `Query.stable_order/3`                                  |     11 |     1 | query ordering              |
| Articles       | `Tags.Assignment.taxonomy_identity/3`                   |     10 |     6 | identity normalization      |
| Assets         | `GC.candidates/2`                                       |     11 |     1 | query/policy composition    |
| Assets         | `ProviderReconciliation.enqueue_missing_for_workflow/3` |     10 |     4 | workflow orchestration      |
| Assets         | `ReplacementPlan.apply/3`                               |     10 |     2 | workflow orchestration      |
| Assets         | `Upload.validate_file/1`                                |     12 |     1 | 输入校验                    |
| Assets         | `Upload.validate_generated_file/1`                      |     10 |     1 | 输入校验                    |
| Command        | `Receipt.Store.resolve_conflict/2`                      |     11 |     5 | concurrency/result recovery |
| Communities    | `Tags.Mutation.taxonomy_identity/3`                     |     10 |     6 | identity normalization      |
| Content Import | `Jobs.project/1`                                        |     10 |     5 | projection mapping          |
| Content Import | `Jobs.build_item_attrs/3`                               |     11 |     6 | 输入映射                    |
| DocTree        | `Query.publish_state/2`                                 |     13 |     4 | state projection            |
| FrontDesk      | `Article.public_articles/3`                             |     11 |     5 | public query composition    |
| Outbox         | `Workflow.Asset.delete_provider_object/1`               |     10 |     1 | external effect workflow    |
| Seeds          | `FullCommunity.seed_threads/2`                          |     10 |     1 | seed orchestration          |
| Seeds          | `FullCommunity.seed_post_states_and_cats/2`             |     10 |     1 | seed orchestration          |
| Seeds          | `Wallpaper.snapshot_matches_fixture?/5`                 |     14 |     1 | comparison                  |
| Wallpaper      | `Settings.valid_radial_recipe?/1`                       |     10 |     4 | 校验 predicate              |
| Wallpaper      | `Settings.valid_mesh_recipe?/1`                         |     12 |     4 | 校验 predicate              |
| Public Cache   | `Persist.normalize_payload/1`                           |     11 |     3 | payload normalization       |
| Public Cache   | `Workflow.deliver_claimed/4`                            |     11 |     3 | delivery workflow           |
| Helper         | `SiteFavicon.detect/2`                                  |     10 |     2 | external response detection |

基线最高的两个 finding 是 `ArticleInsights.Query.fetch_rows/8`（15）和
`Seeds.Wallpaper.snapshot_matches_fixture?/5`（14）。表中 After 使用与 Credo 相同的
`Credo.Check.Refactor.CyclomaticComplexity.complexity_for/1` 计算；所有目标函数均已降至阈值 9 以下。

表中带默认参数的函数统一按最大 arity 记录。例如 `GC.candidates/2` 同时定义 `/1`，
`ReplacementPlan.apply/3` 同时定义 `/2`。

## 3. 执行风险分级

### P0：一致性、恢复和外部副作用

- `Receipt.Store.resolve_conflict`
- `ProviderReconciliation.enqueue_missing_for_workflow`
- `ReplacementPlan.apply`
- `Workflow.Asset.delete_provider_object`
- `Workflow.deliver_claimed`

这些函数涉及 retry、conflict、lease、provider 或投递状态。本批通过隔离 claim、delivery、finalize
和 conflict resolution 分支，保持了 idempotency、结果恢复和 partial-success 语义。

### P1：查询与资源解析

- `ArticleInsights.Query.fetch_rows`
- `Publish.Doc.binding_community`
- `Query.stable_order`
- `GC.candidates`
- `Query.publish_state`
- `Article.public_articles`

本批将条件组合提取为 query builder、排序模式和 projection helper；没有增加逐项查询，原有排序字段、
Scope 条件和一次性 `Repo.all` 边界保持不变。

### P2：输入规范化与校验

- `MetricEvent.Persist.validate`
- `Web.Provider.Umami.normalize_visitor_region_row`
- `Articles.Tags.Assignment.taxonomy_identity`
- `Communities.Tags.Mutation.taxonomy_identity`
- `Assets.Upload.validate_file`
- `Assets.Upload.validate_generated_file`
- `Jobs.project`
- `Jobs.build_item_attrs`
- `Settings.valid_radial_recipe?`
- `Settings.valid_mesh_recipe?`
- `Persist.normalize_payload`
- `SiteFavicon.detect`

这批函数已拆为具名 predicate、normalization 和 validation step，并保持原有错误优先级与返回形状。

### P3：Seeds

两个 FullCommunity seed 函数和 Wallpaper fixture 比较不在生产请求路径，因此作为最后一批处理；
拆分保留了 seed 幂等、随机数据分布和 fixture 版本语义。

其中 `Wallpaper.snapshot_matches_fixture?` 的 complexity 为 14，是当前基线第二高。
它列为 P3 仅因为不在生产请求路径，不代表函数本身简单。本次已将批量查询、fixture 比较和
外部对象可用性检查拆为独立步骤，并保持一次批量加载资产的行为。

## 4. 代表性例子

`Assets.Upload.validate_file/1` 改造前用一个 `cond` 依次验证 filename、MIME、size、checksum 和
thread。它没有数据库写入或副作用，因此本次没有改变校验规则，只按已有业务阶段拆分。

实际完成的职责链为：

```text
normalize input fields
  -> derive asset type from MIME
  -> validate_filename
  -> validate_mime
  -> validate_size
  -> validate_checksum
  -> validate_thread
  -> build normalized file
```

拆分保留了“第一个错误获胜”的顺序和现有 ErrorCat 消息。

Receipt、ReplacementPlan、Outbox 和 PublicCache workflow 则按更高风险路径处理，将状态分派、
重试判断和副作用收尾拆开，同时保留原有 recovery 结果。

## 5. 执行审计依据

每个函数均按以下问题审计；这些条目也是后续回归审查的依据：

- 分支来自输入校验、业务状态、错误恢复还是基础设施失败；
- 是否混合 query、write、transaction 与 external effect；
- 分支顺序是否是公开错误优先级；
- 是否能提取纯 predicate / normalization；
- helper 是否有清晰业务名称并可独立测试；
- 拆分后是否增加查询次数或改变锁范围；
- retry、idempotency、partial-success 和 tagged tuple 是否保持。

## 6. 验收结果

- 26 个 finding、22 个文件降至 0 个 `CyclomaticComplexity` finding；
- §2 已记录每个函数的 before/after complexity，最高值由 15 降至 8；
- 未使用 suppression，提取的 helper 均对应 validation、query、projection、workflow 或 recovery 职责；
- Query 保持原有过滤、排序和批量加载边界，Workflow 保持 retry、recovery 和 partial-success 结果；
- `mix format` 与 `mix compile --warnings-as-errors` 通过；
- 后端完整测试通过：2250 passed、1 excluded、0 failures；
- `mix credo --strict --format json` 中 `CyclomaticComplexity` 为 0。
