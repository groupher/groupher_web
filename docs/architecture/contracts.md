# 跨运行时 Contracts

> 状态：current
>
> 更新：2026-10-17

## 目的

`@groupher/contracts` 保存多个运行时必须一致理解的稳定协议。它让 TypeScript、Elixir、Gateway、
前端应用和测试从同一个语言无关来源生成或消费相同名称、错误码、header 和 wire grammar，避免
各端手写相同常量后逐渐漂移。

```text
language-neutral contract
  -> TypeScript public entry
  -> Elixir generated module or verified mirror
  -> fixtures / parity tests
  -> freshness check in CI
```

## 边界

适合放入 contracts：

- 跨语言错误码和 action 名称；
- Cookie、header、JWT claim 和稳定 endpoint 名称；
- 多个运行时共同构造或解析的 wire grammar；
- 用于双端一致性测试的固定样例。

不适合放入 contracts：

- React hook、Store、组件和页面配置；
- Phoenix authorization policy 或数据库查询；
- HTTP client、GraphQL request 和其他有副作用的运行时实现；
- 只在单个文件使用且没有跨边界含义的局部常量。

`packages/route-contract` 继续拥有公共 URL 和路由构造；`@groupher/contracts` 不复制其职责。

## 文件模型

需要跨语言生成的协议采用下列结构：

```text
packages/contracts/<domain>.contract.json
  -> packages/contracts/scripts/generate-<domain>-contract.mjs
     -> packages/contracts/src/<domain>.generated.ts
     -> backend/.../<domain>/contract.ex
  -> packages/contracts/src/<domain>.ts
     -> public TypeScript entry
```

规则：

1. `*.contract.json` 是语言无关的唯一维护入口；
2. `*.generated.ts` 和生成的 Elixir 模块禁止手工修改；
3. 手写 TypeScript 入口负责 re-export，并可加入无副作用的类型或窄 helper；
4. generator 的 `--check` 模式不得写文件，只比较当前生成物；
5. CI 必须执行 freshness check、TypeScript type-check 和 Elixir 侧验证；
6. 双端存在构造逻辑时，用共同 fixtures 或 parity test 验证完全相同的结果。

并非所有协议都必须生成 Elixir 文件。仅在 TypeScript runtimes 之间共享的简单类型可以直接由
手写 `src/*.ts` 拥有；一旦同一稳定值被 Elixir 消费，就必须升级为语言无关来源和 freshness
机制。

## 导入规则

消费者直接从公开 subpath 导入：

```ts
import { AUTH_ERROR } from '@groupher/contracts/auth'
import { GATE_ACTION } from '@groupher/contracts/gate'
```

不要在 `frontend/core/constant` 建立没有附加语义的纯 re-export。直接导入可以明确表明该值是
跨运行时协议，而不是普通前端常量。

前端确实需要组合或展示配置时，可以建立前端文件，但它只能引用 contracts：

```ts
import { GATE_ACTION } from '@groupher/contracts/gate'

export const DASH_GATE_ACTIONS = [GATE_ACTION.DOC_UPDATE] as const
```

## Gate Action contract

### 问题

前端 Gate、Phoenix Gate 和 Passport Registry 都会引用操作名称。业务代码不得散落
`'doc.update'`、`'asset.upload'` 等字符串，也不得由 Node 和 Phoenix 分别维护一份常量。

### 当前结构

```text
packages/contracts/gate.contract.json
  ├─ generated TypeScript GATE_ACTION + TGateAction
  └─ generated Elixir GateAction module

GATE_ACTION
  ├─ frontend useGate().can(action, context)
  ├─ Phoenix Gate checks
  └─ CMS.Passport.Registry requirements
```

contracts 定义合法 action 的稳定名称，以及前后端都必须一致理解的 Passport requirement 元数据，
包括 scope、grant 别名、thread grant 和 owner fallback。它不保存某个用户的 Passport，也不执行
资源查询或最终授权：

```text
contracts GateAction       legal action names + stable Passport requirements
CMS.Passport.Registry      validates and evaluates those requirements
frontend Gate              early UI decision from AccountStore Passport
Phoenix Gate               final authorization
```

TypeScript 消费示例：

```ts
import { GATE_ACTION } from '@groupher/contracts/gate'

gate.can(GATE_ACTION.DOC_UPDATE, { community })
```

Elixir 使用生成模块中的同名函数：

```elixir
Gate.check(user, GateAction.doc_update(), context)
```

### 完整性检查

Gate contract 落地时必须同时提供：

- TypeScript const 和 literal union type；
- Elixir 生成模块；
- generator freshness check；
- Passport Registry 不允许未知 action 的测试；
- contract action 与 Registry action/requirement 的完整性测试；
- 前端 Gate 只接受 `TGateAction` 的类型约束；
- 禁止业务调用方重新裸写 Gate action 的静态检查或审计。

当前 contract 收录 Passport Registry 的完整 action 目录，完整性测试保证双方集合相等，不能只为
单个产品场景增加局部常量。

## 当前实现

仓库目前已经采用这一模式的领域包括 Auth、Content Publish、Gate Action 和 View Counting；
Public Cache 使用语言无关 contract 与共同 fixtures 验证 wire grammar。详细现状和历史审计见
[`protocol-constants.md`](./protocol-constants.md)。
