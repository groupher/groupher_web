# 外部依赖服务的本地运行时架构

> 状态：proposed
>
> 适用范围：依赖 Auth、存储、队列、Worker、第三方 API 或其他独立服务的本地开发运行时。

## 目的

本地开发应当让开发者验证真实的业务流程，而不是验证一套为了本地运行而分叉的简化流程。
线上依赖的服务需要有本地等价实现；本地实现可以替换基础设施，但不能改变业务 contract。

Assets Hub 是这套原则的第一个落地对象，具体方案见
[Assets Hub 本地运行时边界](../assets-hub/local-runtime.md)。后续服务应复用本文规则，不再
单独发明一套启动、鉴权、endpoint 和 readiness 机制。

## 核心原则

### 1. 业务流程一致

本地与线上必须使用同一条业务流程：

```text
prepare
  -> capability
  -> upload
  -> finalize
  -> register
  -> claim
  -> publish
  -> reconciliation
```

本地不得为了方便：

- 直接写最终业务表；
- 跳过 capability 校验；
- 跳过 finalize、register 或 claim；
- 使用 fake response 代替真实服务 contract；
- 让 seed 走一条线上不存在的业务分支。

允许变化的只有基础设施 adapter，例如 filesystem 替代 R2、进程内队列替代 Cloudflare
Queue、本地状态存储替代 Durable Object。

### 2. 服务 contract 一致

本地依赖服务需要实现与线上相同的：

- endpoint 和 HTTP method；
- request/response shape；
- capability、service scope 和错误边界；
- 幂等键和重试语义；
- cleanup、delete 和 reconciliation 语义；
- health/readiness contract。

如果传输方式必须本地化，应明确标记为 transport adapter 差异，不能把不存在于生产的
endpoint 写成生产 contract。

### 3. 本地替代服务必须是真服务

线上依赖的服务在本地要有可以启动、访问和测试的等价服务：

```text
线上：Phoenix -> Worker -> R2 / Durable Objects / Queue
本地：Phoenix -> Local provider -> filesystem / local state / local queue
```

本地 provider 仍然拥有独立进程、HTTP 入口、状态管理和 readiness；不能由调用方直接在
数据库中伪造 provider 的结果。

### 4. 本地不需要线上 credentials，但不能删除安全边界

“本地不需要线上 env/token”指：

- 不需要线上 Cloudflare API Token；
- 不需要生产 Auth endpoint、issuer、JWKS 或 client secret；
- 不需要开发者手工维护线上 secret。

它不表示本地可以取消 service identity。只要业务流程包含 service-to-service 调用，
本地仍必须保留对应鉴权边界。Dev Hub 应自动生成或注入本地 identity、local secret、
issuer 和 JWKS 配置。

本地 credentials 的要求是：

- 只绑定本地 Auth 和本地服务；
- 不读取生产 endpoint 或生产 issuer；
- 不提交到仓库；
- 在 readiness 阶段缺失即失败；
- 对调用方默认透明，不要求每个开发者单独配置。

### 5. Dev Hub 是本地服务的统一编排入口

所有依赖服务应遵守同一套本地开发流程：

```text
service manifest
  -> dependency graph
  -> env injection
  -> process start
  -> health check
  -> readiness check
  -> portless registration
```

统一约束：

- 服务由 Dev Hub 或统一 Make/pnpm 入口启动；
- endpoint 集中登记在 `LOCAL_SERVICE_ENDPOINTS`；
- env 由 Dev Hub 注入，`.env.local` 只作为 fallback；
- 依赖通过 `requiredDependencies` 声明；
- 服务自行提供 `/health` 和 `/health/ready`；
- Portless alias 由统一脚本注册；
- readiness 失败时报告具体缺失依赖，不把错误推迟到业务请求阶段。

后续服务不得自行要求额外的 Cloudflare CLI 登录、私有 shell bootstrap 或另一套 env
优先级规则。

### 6. 外部平台集成必须是显式模式

默认本地模式必须闭环运行，不依赖 remote R2、remote Durable Objects、remote Queue 或
Cloudflare API Token。真实 Cloudflare 集成另设显式模式，用于集成测试和部署前验证。

```text
default local mode       -> local provider
explicit cloud mode      -> Worker / R2 / DO / Queue
```

外部模式的 credentials 不能泄漏到默认 `make dev`、`make dev.app` 或普通 seed 流程。

### 7. 本地状态必须可收敛

本地存储可以是 ephemeral，但数据库状态不能在对象丢失后继续宣称“已完成”。本地 provider
必须支持：

- object existence 和 checksum 校验；
- upload、batch、delete、cleanup 的幂等执行；
- 进程重启后的可重试状态；
- provider reconciliation 或明确的 local reset 约定。

清理本地对象目录时，必须同时清理数据库状态，或让下一次 seed 发现对象缺失并重新执行
完整流程。

## 运行时边界

```text
默认本地：
  本地应用 -> 本地等价服务 -> 本地存储/队列

Cloudflare 集成：
  本地应用 -> Cloudflare Worker -> remote R2/DO/Queue
```

两种模式共享业务 contract、测试向量和验收标准，只允许 provider adapter 替换基础设施。

## 通用验收标准

新的外部依赖服务接入本地运行时前，至少应满足：

- 默认启动不需要线上 token 或线上 credentials；
- 本地等价服务提供生产所需的业务入口；
- 关键业务流程和线上一致；
- 本地 Auth/identity 由统一流程注入；
- endpoint、Portless、health/readiness 和依赖声明统一接入 Dev Hub；
- 失败时能清理或 reconciliation，不留下无法解释的半成品；
- local contract test 覆盖 request、response、错误、鉴权和幂等行为；
- 外部平台模式可以单独启动和验收，不影响默认本地流程。
