# Backend Effects 与 Job Contract

## 1. 目的

业务事务只决定并持久化“必须发生什么”，Worker 只消费稳定的业务意图。任何持久化任务都不得依赖当前代码中的模块名或函数名。

```text
Command / Workflow transaction
  -> <Capability>.Effects               # Effects 与 Commands 平级
  -> CMS.Outbox event + Oban wakeup     # 与业务写入同事务提交
  -> Jobs.<NamedWorker>                 # 只解析有限、版本化 payload
  -> root Facade                        # 例如 CMS.articles_effect/1
  -> <Capability>.Effects.run/1
  -> Provider / Messaging / projection
```

`Effects` 是其所属业务能力的顶层 Owner，不藏在 `Commands.Publish`、`Articles.Publish` 等业务动作，
也不藏在 `Notification` 实现细节下面。若 `Publish` 本身是有同名 Facade 的稳定业务能力，例如
`Accounts.Publish`，则它可以拥有自己的 `Effects` Owner。以 Articles 为例：

```text
cms/articles.ex                         # CMS 内部 Articles Facade
cms/articles/
  commands.ex + commands/
  effects.ex + effects/                 # 全部 Article 副作用入口
    outbox.ex                            # 在事务内记录 intent
    publish.ex                           # 消费 publish effect
  bindings.ex + bindings/
  query.ex
  persist.ex
```

`Notification`、搜索更新、缓存失效、mention 同步、审核和第三方投递都是 Effects 的内部实现，不应成为与 Effects 平级的业务 Owner。

Press config invalidation 同样使用 durable effect，而不是把 HTTP 延迟放进配置 mutation 的返回路径：

```text
Press config transaction
  -> Press.Effects.enqueue_invalidation
  -> CMS Outbox event + Oban wakeup
  -> CMSOutboxPress
  -> CMS root Facade
  -> Outbox.Workflow.Press
  -> Press invalidation HTTP
```

intent 只保存稳定的 Community ID 和 command identity。HTTP 未成功时返回错误，由 Outbox/Oban
重试；配置 mutation 不等待 Press HTTP 响应。

## 2. Facade 规则

- Web、其他一级业务目录和 Worker 只能调用根 Facade，例如 `CMS.articles_effect(effect)`。
- CMS 内部可以调用 `CMS.Articles.Effects.run/1`，但不得穿透到 `Effects.Publish`。
- `effects.ex` 是边界，只做参数检查和转发；实现放在同名 `effects/` 目录。
- Facade 转发统一使用 `defdelegate`；需要校验、默认值或结果转换时才使用 `def`，且函数体不访问 Repo、事务或外部 I/O。
- 不保留旧模块名 shim。发布时应先清空或删除无法按新 contract 执行的历史 Job。

本次切换由 `20261012102000_delete_legacy_job_contracts.exs` 一次性删除旧
Later、旧 Worker 模块名以及未版本化的 Comments/Snapshot Job。部署顺序必须是：

```text
暂停 Oban producer/queue
  -> 执行 migration，删除旧 contract Job
  -> 部署只认识新 contract 的代码
  -> 恢复 queue
```

不要让旧版本 producer 在 migration 之后继续写任务；本次迁移不提供旧 Job 数据兼容。

## 3. 持久化 Job contract

合法 payload 是有版本的、JSON 可表达的业务数据：

```json
{
  "type": "article_effect",
  "version": 1,
  "operation_id": "uuid",
  "causation_id": "uuid",
  "resource": {
    "article_id": "uuid",
    "binding_id": 42
  },
  "effect": {
    "type": "publish_projections"
  }
}
```

必须满足：

- `type` 是有限枚举；全项目新业务 contract 禁止使用 `kind`。
- `version` 是正整数；不兼容变更必须增加 version 并显式解析。
- `operation_id` 用于幂等；`causation_id` 关联触发它的 Command 或 Workflow。
- `resource` 只保存稳定 ID。Article 与 Community 相关的任务必须保存 `binding_id`。
- Worker 根据 ID 重新加载当前 canonical 数据；不得持久化 Ecto struct 或计算结果快照。
- 禁止 `{module, function, args}`、匿名函数、PID、进程引用以及任意 `apply/3`。

非法示例：

```elixir
Helper.Later.run({CMS.Articles.Writer, :notify_admin_new_article, [article]})
%{module: "CMS.Articles.Writer", function: "notify", args: [article]}
%{type: "article_effect", article: article_struct}
```

后果：架构 lint 失败，代码不得合并；运行时收到未知 `type` 或 `version` 时返回明确错误并由 Oban 重试，不能静默跳过。

## 4. ArticleBinding 是唯一关系模型

系统不引入 `ArticlePlacement`。Article 与 Community 的关系统一由 `ArticleBinding` 表达：

- Move：保留同一个 Binding id，只把它的 `community_id` 从来源社区改到目标社区。
- Mirror：为同一个 Article 新建另一个 Binding；不同镜像拥有独立的 `inner_id`、标签、看板状态和统计。
- Unmirror：删除明确指定的 Binding，不删除 Article。
- `FrontDesk.resolve_binding(article_ref, community_ref)` 返回 canonical ArticleBinding。
- CMS 根入口为 `CMS.articles_resolve_binding/2`；不要使用 `Placement` 或 `Context` 命名。

统计维度必须同时携带 `article_id`、`binding_id`、`community_id`：全局文章统计按 `article_id` 汇总；镜像/入口统计按 `binding_id`；社区统计按 `community_id`。旧的、缺少 Binding 的统计数据直接清理并重建，不提供兼容读取。

## 5. Outbox 状态与重试

对外使用以下直白状态：

- `waiting`：等待执行；
- `running`：已领取且租约有效；
- `retrying`：上次失败，等待下一次；
- `done`：已完成；
- `failed`：达到最大尝试次数，需要人工处理。

不使用 `pending`、`executing`、`completed`、`dead` 或 `exhausted` 作为新业务词汇。数据库迁移必须一次性转换旧状态；代码不保留双读。

## 6. 事务结果

需要让 `{:error, reason}` 回滚的业务事务统一使用 `Repo.transact_result/1`：

```elixir
Repo.transact_result(fn ->
  with {:ok, article} <- Persist.update(article, attrs),
       {:ok, _event} <- Effects.enqueue(...) do
    {:ok, article}
  end
end)
```

回调必须返回 `{:ok, value}` 或 `{:error, reason}`。helper 自动把错误转成 `Repo.rollback(reason)`，避免事务提交一个裸 `{:error, reason}`。它属于 Repo 的事务语义，不属于 `Helper.ORM`。

## 7. Lint 门禁

`pnpm check:backend-context-v2` 与专用 contract checker 应阻止：

- `effects/` 存在但缺少 sibling `effects.ex`；
- Effects 之外调用 `CMS.Outbox.send/1`；
- Worker 穿透业务内部模块或直接访问 Repo；
- `Helper.Later`、`Jobs.Later`、`apply/3` 式持久化 callback；
- Job payload 中出现 `module`、`function`、`args`、`kind`；
- Articles 副作用落在 `Articles.Publish.Effects` 或 `Articles.Writer`；
- 文章社区 contract 使用 `ArticlePlacement` / `placement`；
- `Repo.transaction(fn -> ...)` 回调可能直接返回 `{:error, reason}`。

Lint 只证明静态边界和显式 contract。它不能证明 Provider 真正幂等、业务事件顺序正确或重试后没有重复通知；这些必须由唯一索引、effect key、Provider idempotency key 与集成测试保证。
