# Alias 与 Strict Null 修复记录

> 状态：本批已完成
> 记录日期：2026-10-14

本文记录后端 alias 规则归属修正与前端 `strictNullChecks` 启用结果，并区分本批已完成内容和仍需独立处理的静态分析债务。

## 1. 后端 Alias 规则

### 问题

Credo 的通用 `Credo.Check.Design.AliasUsage` 根据模块嵌套深度和调用次数建议创建 alias，但它不了解 Groupher 已经约定的语义 namespace。项目有意保留：

- Context 根 alias，例如 `alias GroupherServer.CMS` 后使用 `CMS.*`；
- GraphQL middleware / resolver namespace，例如 `M.*` 和 `R.*`；
- 同一 parent 下的 grouped sibling alias；
- `Model`、Gate Context、ErrorCat 等有领域含义的 canonical 名称。

因此，`AliasUsage` 会把符合项目约定的写法报告成问题，也不能验证 directive 分组、`alias __MODULE__` 顺序或业务名称冲突等项目规则。

### 处理

- 在 `backend/api/.credo.exs` 中禁用 `Credo.Check.Design.AliasUsage`。
- 在 `docs/rules/be.md` 中补充当前 alias 与 module directive 规则。
- alias 的形状、分组和 namespace 由 `scripts/check-elixir-module-style.mjs` 统一负责；Credo 不再作为这部分规则的 owner。

### 验证结果

- `mix credo --strict --format json` 中 `AliasUsage` 为 **0**。
- 全量 Credo 当前仍报告 **194** 个既有问题；它们不属于本次 alias 规则修复。
- 项目 module-style checker 已通过，原有 2 个 seed alias 违规已经修复。

## 2. 前端 Strict Null

### 范围

本批在以下应用显式启用 `strictNullChecks: true`：

- Core
- Apply
- Community
- Dash
- Landing

Widget 与 Inspire Me 原本已启用 TypeScript `strict`，因此已经包含 strict-null 检查，无需修改配置。

### 处理

初始 Core 基线有 **478** 个 strict-null 错误，分布在 **183** 个文件。本批按实际数据边界处理，而不是通过批量非空断言绕过检查，主要包括：

- 对可空 GraphQL 输出在消费边界进行 guard、默认值或规范化；
- 补全 viewer article path 的运行时校验，并让评论查询与写入复用已验证路径；
- 修正 mutation path、版本、索引访问、demo/mock 数据等可能为空的分支；
- 让领域类型真实表达 `null`，例如 reply comment 与 editor value；
- 在 Dash、Passport、Admin 等调用链中规范化生成的 GraphQL 结果。

本批没有修改 GraphQL schema 或后端 resolver。当前涉及的生成类型确实允许 nullable，前端需要在边界处理；只有在后端业务合同能够保证字段必定存在时，才应另行把 schema 收紧为 non-null。

### 验证结果

- `pnpm type-check`：通过，覆盖 monorepo 前端应用。
- `pnpm test:core`：通过，**222** 个测试文件、**919** 个测试。
- `pnpm contract:graphql:generated`：通过，覆盖 **53** 个源文件。
- Core lint：通过，仍保留既有 warning。
- Core format check：通过。
- `pnpm docs:check`：通过。
- `git diff --check`：通过。

## 3. 未解决问题与下一步

这些问题不影响本批 Alias / strict-null 的完成状态，但仍是仓库现有静态分析债务。

### 已完成：收掉 2 个 module-style alias 违规

原有违规位于：

- `backend/api/lib/groupher_server/cms/seeds/wallpaper.ex:372`
- `backend/api/test/groupher_server/cms/seeds/wallpaper_test.exs:71`

两个位置已经改为先 alias `GroupherServer.CMS`，再从 `CMS.*` 引用子模块。module-style checker、后端 format 和 wallpaper seed 测试均通过，alias 专项已完整绿色。

### P1：建立并分批处理 React Doctor 基线

Core 的 React Doctor 当前评分为 **49/100（Critical）**，共 **229** 个问题：

- bug：15 errors / 107 warnings；
- performance：39 errors / 26 warnings；
- maintainability：28 warnings；
- security：1 error / 3 warnings；
- accessibility：10 warnings。

建议不要一次性混修。先导出可重复的机器可读基线，再按以下顺序拆批：

1. security error 和明确的 bug errors；
2. React correctness、effect / state 生命周期问题；
3. 性能问题，结合真实渲染路径验证，避免机械 memo；
4. maintainability 与 accessibility warnings。

每批应记录问题数量变化，并运行相关测试、Core type-check、lint 和 React Doctor，避免只降低计数却改变行为。

### P2：清理全量 Credo 历史债务

`mix credo --strict --format json` 当前仍有 **194** 个非 AliasUsage 问题。以下批次已经清零：

- `NoWrappedInlineDo`：246 条；
- `RedundantWithClauseResult`：28 条；
- `MaxLineLength`：16 条；
- `UnnecessaryAliasExpansion`：10 条。

`NoDirectRepoInBoundaries` 的 96 条现状与迁移顺序见 [Backend Direct Repo Boundary](./backend-direct-repo-boundary.md)；26 个 complexity finding 见 [Backend Cyclomatic Complexity](./backend-cyclomatic-complexity.md)。剩余问题继续按 checker 和目录分批：

1. warning / correctness 与项目自定义边界检查；
2. readability、format-like 和可机械修复项；
3. refactor / complexity 等需要业务判断的项；
4. 对确实与项目规则冲突的通用 checker，明确 owner 后再调整配置，不做逐行 suppression。

全量 Credo 清零前，不应把 `mix credo --strict` 或聚合 `mix lint` 的非零退出码归因于本次 alias 修复，也不应直接升级为新的 CI 硬门禁。

### P3：评估 GraphQL non-null 合同收紧

strict-null 已在前端通过 guard 与规范化解决，不要求后端同步修改。后续可以单独盘点高频使用且业务上必定存在的字段：

- 先确认数据库、resolver 和权限分支是否都能保证非空；
- 再修改 GraphQL schema 并重新生成前端类型；
- 同步更新 resolver / contract tests 与全部消费者。

这属于 API 合同增强，不应为了减少前端 `null` 判断而直接修改 schema。

## 4. 建议执行顺序

1. 继续逐项审计 React Doctor 的 effect、state 与 ref correctness，不批量改 dependency array。
2. 处理 Credo 剩余 19 个 `WithSingleClause` 与 8 个 `PreferImplicitTry`，逐项保持错误返回语义。
3. 按独立文档分批迁移 96 个 `NoDirectRepoInBoundaries`；26 个 complexity finding 先审计后决定是否拆分。
4. 最后评估 GraphQL non-null 合同，只有证据充分的字段才收紧 schema。
