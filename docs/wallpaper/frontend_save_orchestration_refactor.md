# Wallpaper 前端保存编排简化方案

> 文档角色：Proposed；描述目标边界及其与当前实现的差异，不把迁移目标视为已完成事实
>
> 日期：2026-09-07
>
> Active contract：[保存链路与数据边界](./save_pipeline_contract.md) ·
> [当前 theme 单独保存重构](./current_theme_save_refactor.md) ·
> [响应式静态产物、历史与共享导出机制](./responsive_revisions.md)

## 1. 结论

当前 Wallpaper 发布协议不是过度设计。四个响应式 Profile、WebGPU 导出、Assets Hub capability、
两阶段 prepare/publish、`baseVersion`、幂等、Receipt、lease 和孤儿资产 reconciliation 都有独立的
正确性职责，不应为了缩短前端代码而删除。

需要简化的是浏览器实现的职责集中：`useLogic.ts` 同时承担编辑器 UI、draft、产物计划、WebGPU 导出、
GraphQL、Assets Hub、上传、补偿清理、并发版本和 Query 刷新。协议复杂度因此泄漏进 React hook，且核心
保存编排没有覆盖完整失败窗口的直接测试。

目标是保持现有协议和请求顺序不变，将前端拆为四层：

```text
React editor hook / request coordinator
  -> buildWallpaperPublishPlan（纯函数，不生成幂等 key）
  -> exportWallpaperImages（WebGPU 边界）
  -> executeWallpaperPublish（网络编排）
  -> TanStack Query cache 同步写回 / 失效
```

## 2. 当前状态与目标状态

以下边界是迁移目标，不是当前代码已经具备的性质：

| 范围           | 当前状态                                                                                                                | 目标状态                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Community      | 每个页面挂载 `WallpaperStoreProvider`；Query settings 会经 `reconcileConfirmed` 写入 Valtio                             | 普通页面只消费发布态静态数据；editor route 才挂载 authoring store           |
| Dash           | `DsbShell` 为每个路由挂载 `WallpaperStoreProvider`                                                                      | 只有 Appearance/Wallpaper 编辑边界挂载 authoring store                      |
| Landing        | 使用常量 `LANDING_INIT_DATA` 初始化 Wallpaper store，不是 Query 数据源                                                  | 在自有静态背景与移除默认背景之间显式决策；不能直接套用 Community Query 迁移 |
| PageCommunity  | GraphQL 仍选择 `dashboard.wallpaperSettings`，SSR parser 仍解码 settings                                                | 普通页面载荷只保留发布态 Wallpaper 与明确批准的窄展示字段                   |
| 静态 Wallpaper | `wallpaperKeys.config` 的结果经 `StaticWallpaperProvider` 投影为 React Context；保存 hook 又把 version 复制到局部 state | Context 只作为渲染投影；confirmed version 唯一从 Wallpaper Query 订阅和更新 |
| ThemePreset    | confirmed preset/tokens/options 仍镜像在 Valtio，普通页面会读取                                                         | 不属于本方案；后续如收口 Query ownership，必须单独盘点 CSS 注入和普通页读点 |

因此，卸载普通页面 Provider 之前必须先盘点并迁移全部 Valtio 读点，包括但不限于：

- GlobalLayout 的 `contentShadow`；
- Landing salon 的 Wallpaper 派生样式；
- `useFullWallpaper`、`useTopGlow` 等 Wallpaper 共享外观路径；
- Provider 初始化和 Query 刷新后的 `reconcileConfirmed` 行为。

`usePageBg` 只读取 ThemePreset store，不是 Wallpaper 读点，不纳入本方案。`useTopGlow` 则同时读取
Wallpaper `source` 和 ThemePreset tokens；其 Landing 分支依赖 `source === AMBER_MAUVE`，卸载 Landing
Wallpaper store 前必须把该判定迁移到 Landing 自有静态配置，或明确取消对应 glow 视觉规则。

`StaticWallpaperProvider` 可以继续作为静态渲染的窄投影，但它不能成为 version 的第二个 owner。
此前 Query / Store 边界收口完成的是 confirmed owner 与 reconcile 语义，不代表普通页面 Provider 和读点
已经移除；本方案只继续处理 route 挂载和静态消费边界。

## 3. 不变项

本方案不改变以下 invariant：

- 一次 Save 只处理当前 `light | dark` theme；
- `NONE` 不导出图片，直接发布当前 theme 的空 Snapshot 指针；
- 其他类型一律导出 `wide/desktop/tablet/phone` 四张最终图片；
- Browser 仍按 `prepareWallpaperUpload -> Assets Hub Batch -> upload -> publishWallpaper` 执行；
- Phoenix publish 仍在事务内校验 `baseVersion`，写 Snapshot、Images、当前 theme 指针、version 和 Receipt；
- Assets Hub 仍负责 capability、manifest、对象校验、lease 和 reconciliation；
- 相同提交重试仍复用 idempotency key；
- 请求在飞行期间产生的新本地编辑不能被旧请求的成功响应覆盖；
- `TWallpaperLogic`、loading 语义、toast 和面向用户的错误文案默认保持不变。

不建议第一步把 Assets Hub Batch 创建改成 Phoenix 代办。那会把浏览器复杂度转移为 Phoenix 到 Assets Hub
的同步可用性耦合，且改变现有 capability 边界；只有独立证明当前协议不可维护时才重新评估。

## 4. 当前职责集中点

当前 `frontend/core/unit/DsbThread/Appearance/Wallpaper/useLogic.ts` 同时包含：

1. tab、rollback 和 editor action；
2. 当前 theme draft 与 preview flush；
3. savable patch/touched 派生、settings encode 和 Profile 映射；
4. WebGPU capability 判断与四图导出；
5. GraphQL prepare；
6. Assets Hub Batch 创建；
7. upload intent 匹配与并行上传；
8. GraphQL publish；
9. 失败后的 cancel；
10. 本地 `wallpaperStateVersion`；
11. fingerprint 和 idempotency key 生命周期；
12. Query invalidation、冲突 refetch 和 toast。

Wallpaper store 实际保存的是 `light/dark` draft、`original` 基线，以及
`commit/acceptSubmitted/reconcileConfirmed` 行为。Preview 由 `useWallpaperPreview` 的 event/debounce 路径管理，
touched 由 `getWallpaperThemeSavablePatch` 派生；本方案不假设 store 内存在 preview 或 touched 字段。

## 5. 目标职责

### 5.1 `buildWallpaperPublishPlan`

纯函数，只把当前已 flush 的 editor state 转换为不可变发布计划：

```ts
type TWallpaperPublishPlan =
  | {
      type: 'none'
      community: string
      theme: 'light' | 'dark'
      baseVersion: number
      settings: WallpaperSettingsInput
    }
  | {
      type: 'generated'
      community: string
      theme: 'light' | 'dark'
      baseVersion: number
      settings: WallpaperSettingsInput
      renderSpec: TBgRenderSpec
      targets: readonly TWallpaperExportTarget[]
    }
```

职责：

- 判断 `none/generated`；
- 固定当前 theme；
- encode settings；
- 冻结完整 `renderSpec`，避免导出等待期间被新 draft 修改；
- 生成固定四 Profile targets；
- 形成稳定 fingerprint 所需的不可变输入。

它不生成、复用或更新 idempotency key，也不执行 React、WebGPU、GraphQL、fetch、上传或 toast。

### 5.2 Idempotency coordinator

幂等 key 是请求协调职责，不属于 plan builder：

1. hook/coordinator 根据 `{baseVersion, theme, submitted}` 形成 fingerprint；
2. 与 pending fingerprint 相同则复用旧 key；
3. 不同则创建新 key；
4. executor 接收已经确定的 `{plan, idempotencyKey}`。

同 fingerprint 重试必须把旧 key 原样传给 executor；builder 本身不根据重试上下文做决策。

### 5.3 `exportWallpaperImages`

只接受 `generated` plan，调用现有 Wallpaper Export 能力并返回四张带 checksum/尺寸/mime 的图片。

职责：

- 在真正需要生成图片时检查 WebGPU capability；
- 复用一次初始化的 GPU runtime 完成四 Profile 导出；
- 校验导出结果与 plan targets 一一对应。

它不知道 Community、GraphQL mutation、Assets Hub endpoint、QueryClient 或 UI。

### 5.4 `executeWallpaperPublish`

只负责现有网络协议：

```text
NONE
  -> publishWallpaper

generated
  -> exportWallpaperImages
  -> prepareWallpaperUpload
  -> create Assets Hub Batch
  -> upload all images
  -> publishWallpaper
```

GraphQL client、Batch client、uploader 和 exporter 作为依赖注入，测试不需要真实 WebGPU、R2 或网络。

失败和补偿必须按“已经创建了什么”以及“publish 结果是否确定”划分：

| 失败窗口                                            | 已有 Batch                                 | publish 结果 | 补偿语义                                                                                        |
| --------------------------------------------------- | ------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------- |
| WebGPU capability / export 失败或只导出部分 targets | 否                                         | 未调用       | 不 cancel，不调用 GraphQL                                                                       |
| prepare 请求失败                                    | 否                                         | 未调用       | 不 cancel                                                                                       |
| prepare 返回空 batch                                | 否                                         | 未调用       | 不 cancel；使用独立的 prepare 空响应错误名                                                      |
| Assets Hub Batch 创建失败                           | Phoenix 已 prepare，Hub 创建结果可能不确定 | 未调用       | 尝试 cancel，保留原始错误为主错误                                                               |
| upload intent 缺失或任一上传失败                    | 是                                         | 未调用       | 尝试 cancel                                                                                     |
| publish 明确返回失败                                | 是                                         | 明确失败     | 尝试 cancel；Hub 的 claim/lease/reconciliation 仍是最终安全边界                                 |
| publish 请求因 transport 异常 rejected              | 是                                         | 未知         | 当前实现会尝试 cancel；先用契约测试锁定，若要改为不 cancel，必须作为协议决策单独评审            |
| GraphQL 请求 resolved 但 publish payload 为空       | 是                                         | 未知         | 当前空响应错误发生在 executor 返回后，不 cancel；保留同一 key 重试/查证，不能假定可安全删除资产 |
| publish 明确成功后的本地 cache/toast 处理失败       | 是且已 claim                               | 明确成功     | 禁止 cancel                                                                                     |

提取时拆分当前混用的错误名：Assets Hub Batch POST 失败继续使用创建失败语义；prepare 空响应使用独立错误名，
例如 `WALLPAPER_PREPARE_EMPTY_RESPONSE`。Cleanup 错误不能覆盖原始发布错误。

当前 `cancelAssetsHubBatch` 只吞掉 rejected fetch，没有检查非 2xx；拆分时应补齐响应检查和可观测性。

### 5.5 React hook

React hook 只保留交互职责：

- flush 当前 preview/draft；
- 从 Wallpaper editor store 读取 working copy；
- 直接订阅 `wallpaperKeys.config(community)` 的当前发布 version；
- 为相同 fingerprint 复用 pending idempotency key；
- 调用一个 `useMutation`；
- 成功后确认本次 submitted patch；
- 用 `setQueryData` 同步写回 `wallpaperKeys.config` 的新 version，再 invalidate/refetch；
- invalidate `wallpaperEditorKeys.config`，由 editor Query 刷新 confirmed settings/history；
- 展示 toast。

`wallpaperStateVersion` 不再复制到局部 `useState`。`getQueryData` 只能读瞬时 cache，不能替代订阅；hook 应通过
同一个 Query key 的 `useQuery`/既有 route Query 结果读取 version，不会因此产生第二份请求缓存。

错误码 `5702`（version conflict）和 `5708`（idempotency conflict）是当前触发 canonical Wallpaper Query
refetch 的入口。迁移必须保留该映射，并保证 refetch 只更新 confirmed version/基线，不覆盖本地 draft。

## 6. Valtio / Query / Context 目标边界

目标边界如下：

- Wallpaper editor Valtio store：`light/dark` working draft、`original` 基线和 draft reconcile/accept 行为；
- TanStack Query：已发布 Wallpaper、version、editor route 的 confirmed settings/history；
- StaticWallpaper React Context：从 Query 或 SSR 数据投影出的静态渲染输入，不承担版本所有权；
- Preview：event bus、animation frame/debounce 和最终 commit，不进入 store 字段；
- touched：从 working draft 与 `original` 的 diff 派生，不进入 store 字段。

普通页面最终不挂载 Wallpaper editor store，也不查询 `wallpaperSettings/renderConfig`。这是 Phase 5 的目标，
必须在普通页读点迁移完成后才成立。

### `contentShadow` 决策门

Phase 4 开始前必须显式选择其一：

1. **保留普通页面效果**：把 `contentShadow` 暴露为发布态静态消费契约中的窄字段。它可以从 active Snapshot
   派生，不一定新增数据库列，但仍是 GraphQL/backend 输出契约变更，也是“GraphQL schema 不变”的唯一例外；
2. **取消普通页面效果**：无需新增 schema，但必须验收 Community、Landing 和 GlobalLayout chrome 的视觉变化。

未做出该决策前，不能删除普通页面对 authoring settings 的最后依赖。

## 7. 测试矩阵

### 7.1 Phase 0 现状契约测试

提取前先锁定当前可观察行为：

- `TWallpaperLogic` 接口、loading 生命周期、toast 和面向用户的错误文案；
- untouched 不发请求；
- 当前 theme 单独提交；
- 保存飞行期间的新编辑不会被旧成功响应覆盖；
- fingerprint 相同复用旧 idempotency key；
- `5702/5708` refetch version 且不覆盖本地 draft；
- NONE 与 generated 的当前请求顺序；
- export、prepare、create、upload、publish、cancel 各失败窗口的当前基线。

错误名拆分属于文档明确批准的行为调整，应在提取该层时单独更新测试，不能被机械地当成意外回归。

### 7.2 发布计划纯函数

- 当前 theme 为 light/dark；
- untouched 时上层不创建计划；
- `NONE` 无 targets、无 WebGPU；
- picture/gradient/upload 都生成且只生成四个固定 Profile；
- renderSpec 在计划创建后不受 store 后续修改影响；
- fingerprint 对相同提交稳定，对 version/settings/theme 变化敏感；
- builder 不生成 idempotency key；相同 fingerprint 重试时 coordinator 把旧 key 传给 executor。

### 7.3 导出与网络编排

- NONE 只调用 publish；
- generated 严格按 export、prepare、create、upload、publish 顺序执行；
- export 失败和 targets 不完整时没有 GraphQL/cancel；
- prepare 请求失败、prepare 空响应时没有 cancel；
- 四个 upload intent 必须完整且 Profile 唯一；
- 四图并行上传全部成功后才 publish；
- create、任一 upload、publish 明确失败时的 cancel 行为；
- cancel rejected、cancel 非 2xx；
- publish transport rejected 保持当前 cancel 基线，除非另行批准协议调整；
- publish payload 空响应按 outcome unknown 处理，不 cancel 并保留重试 key；
- publish 明确成功后不 cancel。

### 7.4 React 集成

- 未 touched 不触发 mutation；
- 保存中产生的新编辑不会被成功响应覆盖；
- 成功后先同步更新 Wallpaper Query version，再失效 static/editor Query；
- 下一次连续保存读取新 version；
- `5702/5708` 保留本地 draft，并刷新 Query version；
- 错误 toast 使用原始发布错误；
- editor 卸载不把 confirmed server state 留在普通页面 Valtio 中。

现有 Phoenix Wallpaper 和 Assets Hub Batch/Worker 测试继续覆盖事务、manifest、claim、lease、Receipt 和
reconciliation；前端测试不重复模拟这些服务内部实现。

## 8. 实施批次

### Phase 0：现状基线与普通页读点盘点

- 补齐 §7.1 的现状契约测试；
- 盘点 Community、Dash、Landing 的 Provider 挂载点与全部 store 读点；
- 明确 Landing 静态展示配置来源；
- 完成 `contentShadow` 决策门；
- 在此阶段不卸载 Provider、不改普通页载荷。

### Phase 1：纯计划与幂等协调

- 提取 `buildWallpaperPublishPlan`；
- 保持原网络函数和 UI 行为不变；
- 把 fingerprint/key 复用保留在 request coordinator；
- 补齐 NONE、四 Profile、theme、fingerprint、key 复用和 snapshot freeze 测试。

### Phase 2：导出与网络编排

- 提取 `exportWallpaperImages`、`executeWallpaperPublish` 和窄服务 adapter；
- 注入 exporter/GraphQL/Batch/uploader；
- 补齐全部失败窗口、outcome unknown 和 cancel 状态测试；
- 拆分 prepare 空响应与 Assets Hub Batch 创建失败错误名；
- 不改变 endpoint、后端事务或持久化协议。

### Phase 3：Query ownership

- 删除局部 `wallpaperStateVersion`；
- 由 `wallpaperKeys.config` 独占 confirmed version；
- mutation success 先 `setQueryData` 写回新 version，再刷新 static/editor Query；
- `5702/5708` 统一 refetch canonical Query；
- 验证请求在飞期间的新 draft 保留逻辑。

### Phase 4：普通页面读点迁移

- 根据 Phase 0 清单逐一迁移 `contentShadow`、GlobalLayout、Landing salon 和共享 hooks 的读点；
- 复用 [`static_wallpaper.md` §8–§9](./static_wallpaper.md#8-bundle-边界) 的 Landing 决策门：为 Landing
  Shell 配置自有 light/dark 静态背景，或明确接受移除默认背景并验收对应 glow/页面视觉变化；
- 本阶段只处理 Landing Shell 的共享 Wallpaper 消费，不重新打开已完成的营销演示 renderer 图片化；
- 保持 `StaticWallpaperProvider` 仅承载窄静态渲染数据。

### Phase 5：路由与载荷收口

- 普通 `PageCommunity` 删除 `wallpaperSettings`；
- editor route 独占 settings/history 查询；
- 普通 Community、Dash、Landing 不再挂载 Wallpaper editor store；
- 同步更新相关 contract/checklist，不再把目标状态标记为已完成事实。

## 9. 验收标准

- React hook 不直接调用 Assets Hub endpoint、upload 或 WebGPU exporter；
- 发布计划是无副作用纯函数，且不负责生成/复用 idempotency key；
- 网络编排可在无 React、无 WebGPU、无真实网络环境下完整测试；
- 当前发布协议、Assets Hub capability 和后端事务不变；
- 除明确批准的 `contentShadow` 窄字段外，GraphQL schema 不变；
- `baseVersion` 只有 `wallpaperKeys.config` 一个 confirmed owner；
- 普通页面不查询 settings/history，不挂载 authoring store；
- 保存中继续编辑、导出失败、prepare 空响应、部分上传失败、publish 结果未知和 cancel 失败均有明确测试；
- `5702/5708` 冲突刷新 Query，但不覆盖本地 draft；
- 生产行为仍是当前 theme 单独保存，非 NONE 固定发布四张响应式图片。

## 10. 非目标

- 不在本方案内迁移 ThemePreset store；
- 不建立新的业务状态机或 adapter 注册框架；
- 不把 WebGPU 移到 Phoenix、Worker 或后台任务；
- 不新增 Static/Editor 两套版本、Snapshot 或 revision 模型；
- 不修改 Assets Hub capability、manifest、Receipt、lease 或 reconciliation 协议；
- 不把 Landing 的常量配置伪装成 Query 数据源。
