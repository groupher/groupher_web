# TanStack Start 1.0 Stable 升级计划

> 状态：已实施
>
> 评估日期：2026-10-14
>
> 范围：Community、Dash、Apply、Landing、Inspire Me 五个 TanStack Start 宿主。

## 结论

建议升级。

这不是从其他框架迁移到 TanStack Start，而是把已经运行在 TanStack Start Release
Candidate 上的五个宿主收口到首个稳定版本。当前代码与稳定版距离较近，未使用大部分
已删除 API，升级风险整体为低到中等。

升级应作为一个独立批次完成，不在同一批次引入 RSC、调整路由结构、替换 Query 集成，
也不重构 Core 的平台导航边界。

## 当前基线

当前直接依赖版本如下：

| 包                                 | 当前版本   | 目标版本   | 说明                        |
| ---------------------------------- | ---------- | ---------- | --------------------------- |
| `@tanstack/react-start`            | `1.168.59` | `1.169.1`  | `1.169` 是首个 stable 系列  |
| `@tanstack/react-router`           | `1.170.40` | `1.170.44` | 与目标 Start 的内部依赖对齐 |
| `@tanstack/router-generator`       | `1.167.39` | `1.167.43` | 五个宿主统一升级            |
| `@tanstack/react-router-ssr-query` | `1.167.3`  | `1.167.3`  | 已是当前版本，无需变更      |
| `@tanstack/react-query`            | `5.104.2`  | 已升级     | 满足 SSR Query 集成要求     |
| `vite`                             | `8.3.4`    | 已升级     | 已满足 stable 要求的 Vite 8 |

共享包 `frontend/core` 的 Router dev/peer 依赖也同步固定为 `1.170.44`，并由
`scripts/check-router-runtime.mjs` 强制所有宿主及 lockfile 只解析一个 Router runtime。

涉及的宿主：

- `frontend/community`
- `frontend/dash`
- `frontend/apply`
- `frontend/landing`
- `frontend/inspire-me`

版本必须按同一兼容矩阵更新。不要只升级 `@tanstack/react-start`，同时保留旧的 Router
或 route generator。

## 官方 Stable 变化

TanStack Start `1.169` 从 Release Candidate 进入 stable，和本仓库相关的变化包括：

1. Vite 构建要求 Vite 8。本仓库已经满足。
2. 删除 `createServerFn` 和 `createMiddleware` 的 `.inputValidator()`，改用
   `.validator()`。
3. 删除内置 `useSession`。
4. 删除旧 `@tanstack/nitro-v2-vite-plugin`。
5. 裸 `createStartHandler(...)` 不再把未捕获异常自动转换为响应，而是重新抛出原始异常；
   自定义 server entry 应使用 `createServerEntry` 包裹。
6. response helper 在 server route、SSR、server function、redirect、error 和 middleware
   replacement 之间采用统一覆盖规则。

评估时未在 `frontend` 中发现以下已删除能力：

- `.inputValidator()`
- `useSession`
- `@tanstack/nitro-v2-vite-plugin`
- `transferResponseBodyOwnership`

因此本次升级没有已知的大规模业务 API 改写。

## 必须处理的兼容点

以下四个宿主存在自定义 server entry：

- `frontend/community/src/server.tsx`
- `frontend/dash/src/server.tsx`
- `frontend/apply/src/server.tsx`
- `frontend/inspire-me/src/server.tsx`

四个文件都先用 `createStartHandler(defaultStreamHandler)` 创建 `fetch`，再导出带
`fetch` 的 `ServerEntry` 包装对象；Community、Apply 和 Inspire Me 使用对象字面量及
`satisfies ServerEntry`，Dash 则额外定义了一个同名的本地 `createServerEntry` helper。

Stable 下应统一改成由官方 `createServerEntry` 包裹的入口，使未捕获异常继续经过
Start 的标准错误转换，并保留 response helper 写入的状态码、header 和 cookie。Dash
必须同时删除本地 `createServerEntry` helper，再从
`@tanstack/react-start/server-entry` 导入官方实现，避免同名冲突或遮蔽。

目标形态：

```ts
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const startHandler = createStartHandler(defaultStreamHandler)

export default createServerEntry({ fetch: startHandler })
```

迁移后，四个文件原有的本地 `ServerEntry` 类型、包装对象和透传 `async fetch` 都不再
承担入口错误转换职责；如果目标版本类型允许，应直接删除这些兼容包装，使用官方入口
返回类型作为唯一契约。

Landing 没有自定义 `src/server.tsx`，继续使用内置 server entry，不需要做相同修改。

## 保持不变的边界

本批次不改变以下现有设计：

- Core 保持宿主无关，不直接依赖具体 Router 实现。
- Community 和 Dash 继续使用 `@tanstack/react-router-ssr-query`，不替换 hydration 方案。
- GraphQL server state 继续由当前 TanStack Query/既有请求层负责。
- Apply 保持 `/apply` basepath。
- Landing 保持现有静态构建及 `finalize-static-build.mjs` 流程。
- Cloudflare 入口继续使用 `@tanstack/react-start/server-entry`。
- 不手工编辑生成的 `src/routeTree.gen.ts`。

## 实施结果

### Batch 1：版本与 server entry（已完成）

1. 在五个宿主中统一更新 Start、Router 和 Router Generator 版本。
2. 保持 `@tanstack/react-router-ssr-query` 为 `1.167.3`。
3. 更新 lockfile，确认没有出现多套非预期的 Router/Start runtime。
4. 修改四个自定义 server entry，删除原有 `{ fetch }` 兼容包装并增加官方
   `createServerEntry` 包装；Dash 还需删除同名本地 helper。
5. 不接受与本次升级无关的生成文件或依赖更新。

### Batch 2：生成和静态验证（已完成）

对五个宿主分别执行 route generation 和 type-check：

```text
pnpm --filter @groupher/frontend-community type-check
pnpm --filter @groupher/frontend-dash type-check
pnpm --filter @groupher/frontend-apply type-check
pnpm --filter @groupher/frontend-landing type-check
pnpm --filter @groupher/inspire-me type-check
```

检查生成的 route tree：

- 允许 generator 格式或类型注册产生的必要变化；
- 不允许路由路径、basepath 或宿主归属发生无意变化；
- 不手工修补生成文件来绕过 generator 问题。

### Batch 3：生产构建验证（已完成）

分别执行五个宿主的生产构建，覆盖：

- Community revision worker 与主应用；
- Dash revision worker 与主应用；
- Apply Cloudflare 构建；
- Landing 静态产物及 finalize 流程；
- Inspire Me 数据和 route generation 后的构建。

构建通过不等于运行时验收完成，还需要检查实际 Worker/SSR 行为。

### Batch 4：运行时 Smoke Test（部分完成）

至少验证：

1. 五个应用的首页或默认入口能够 SSR 并完成 hydration。
2. Community 使用生成路由中存在的真实数据路径验证直达、客户端导航和刷新，例如：
   - `/$community`，替换为实际社区 slug；
   - `/$community/post/$id`，替换为实际社区 slug 和文章 id；
   - `/$community/changelog/$id`，替换为实际社区 slug 和 Changelog id。
3. Community、Dash、Apply、Landing、Inspire Me 的 `/health` 返回预期响应。
4. Community、Dash、Apply 的 GraphQL server route 能正常代理请求。
5. 至少一个 `createServerFn` 成功请求。
6. 人为触发一个未捕获 server error，确认由应用返回标准 500 响应，而不是泄漏为
   Cloudflare Worker 级异常。
7. Apply 的 `/apply` basepath、直达和刷新保持正常。
8. Landing 的静态页面、404 和生产资源路径保持正常。

已确认的结果：五个宿主 route generation、type-check、production build、lint 和
format check 均通过；Community contract、Router runtime guard 通过；Core type-check
及 222 个测试文件（919 条测试）通过。五个本地服务的 `/health` 均返回 200，Community
实际验证了 `/$community`、`/$community/post/$id` 和 `/$community/changelog/$id` 的
SSR 直达响应。

本批文档尚未记录以下运行时结果：五个宿主的 hydration，以及 Community 数据路由的
客户端导航和刷新；Community、Dash、Apply 的 GraphQL server route 代理；`createServerFn`
成功请求；未捕获异常的标准 500 响应；Apply `/apply` basepath 直达和刷新；Landing
静态页面、404 和生产资源路径。因此 Batch 4 只标记为部分完成，不能将上述项目视为
已完成的运行时验收。

### 构建告警收敛（已完成）

升级后的第二轮检查还处理了几项不会阻断构建、但会影响产物质量的告警：

- Quora layout 的 `UserCard` 保持动态导入并保留 `Suspense` fallback，避免每个 post
  header 将用户卡片模块拉入初始依赖图。
- Landing 的 SSR 元数据移到独立的 `landing-meta` 模块，完整 Landing 文案继续由
  i18n loader 动态加载；首屏以下的 Battery、Dashboard、Compare 和 Users Wall 组件
  改为按需 chunk。Landing 客户端最大 chunk 从约 510 kB 降到约 364 kB。
- DocThread 的静态富文本渲染保持在编辑器边界之后按需加载，客户端 DocThread chunk
  从约 948 kB 降到约 66 kB。
- Inspire Me 移除文件级 triple-slash 类型引用，类型由现有 `tsconfig` 的 declaration
  include 提供；lint 不再报告该项。
- Landing 补齐 `@tanstack/react-query` 宿主依赖，`pnpm peers check` 中的 Core peer
  缺失项已消失。

### 主依赖升级批次（2026-10-14）

在稳定版迁移完成后，同批升级了前后端主依赖及 peer 相关包：

- TanStack Query/Core `5.104.0 -> 5.104.2`，Virtual `3.14.10 -> 3.14.17`；
- Vite `8.3.1 -> 8.3.4`、React plugin `6.1.1 -> 6.1.2`；
- Plate、React Aria、Panels、Sanitize HTML、Playwright 及 GraphQL Codegen/Tools 的
  patch/minor 版本；
- Hono、AWS SDK、Vercel Blob、Drizzle、Workflow、Undici、Tar/YAML 解析链；
- `files-sdk` `2.2.3 -> 3.1.1`，其 Nest 12 peer warning 已消失；
- `graphql-http` `1.23.0 -> 1.23.1`，`graphql-config` 经 GraphQL 工具链更新到
  `5.1.8`。

当前 `pnpm peers check` 只剩 `graphql-http@1.23.1` 声明的
`graphql >=0.11 <=17` 与 `graphql@17.0.2` 的上游 peer 范围不匹配；GraphQL 17.0.2
已经是当前 latest，本批不降级 GraphQL，也不通过忽略规则隐藏该上游声明。

## 验收条件

升级完成必须同时满足：

- 五个宿主的 route generation 和 type-check 通过；
- 五个宿主的 production build 通过；
- 生成文件不存在无法解释的路由结构变化；
- lockfile 中的 Start/Router 依赖图与目标版本一致；
- 自定义 server entry 的成功响应和错误响应均通过 smoke test；
- Community/Dash 的 Query SSR hydration 没有重复请求或 hydration error；
- Apply basepath 与 Landing 静态构建行为保持不变；
- 没有把本次升级扩大为新架构或业务重构。

## 风险与回滚

### 主要风险

| 风险                            | 影响                            | 控制方式                                 |
| ------------------------------- | ------------------------------- | ---------------------------------------- |
| 自定义 entry 未适配新的错误传播 | 未捕获异常变成 Worker 级失败    | 使用 `createServerEntry`，显式测试 500   |
| Start 与 Router 版本错位        | 类型、生成或运行时行为不一致    | 按兼容矩阵统一更新                       |
| route generator 产生意外变化    | 路由或 basepath 回归            | 审核生成差异并做直达/刷新测试            |
| SSR Query hydration 回归        | 重复请求或 hydration mismatch   | 验证 Community/Dash SSR 页面             |
| Cloudflare 构建通过但运行时异常 | 线上才暴露 server boundary 问题 | 使用 preview/staging 做运行时 smoke test |

### 回滚条件

出现以下任一情况时停止发布并回滚该独立升级批次：

- 自定义 server entry 无法稳定返回标准错误响应；
- route tree 出现无法解释的路径变化；
- Community/Dash 出现稳定复现的 hydration mismatch；
- Apply basepath 或 Landing 静态产物发生行为变化；
- Cloudflare preview 与当前生产请求契约不一致。

回滚只需要恢复本批次的 package manifests、lockfile 和 server entry，不应与业务功能
发布绑定。

## 参考资料

- [TanStack Start 1.0 is Stable](https://tanstack.com/blog/tanstack-start-1-0)
- [Migrate from the Release Candidate](https://tanstack.com/start/latest/docs/framework/react/migrate-from-release-candidate)
- [Server Entry Point](https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point)
- [TanStack Query integration](https://tanstack.com/start/latest/docs/framework/react/guide/tanstack-query)
