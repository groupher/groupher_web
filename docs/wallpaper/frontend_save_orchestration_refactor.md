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

| 范围           | 当前状态                                                                                                                | 目标状态                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Community      | 每个页面挂载 `WallpaperStoreProvider`；Query settings 会经 `reconcileConfirmed` 写入 Valtio                             | 普通页面只消费发布态静态数据；editor route 才挂载 authoring store                             |
| Dash           | `DsbShell` 为每个路由挂载 `WallpaperStoreProvider`                                                                      | 只有 Appearance/Wallpaper 编辑边界挂载 authoring store                                        |
| Landing        | 使用常量 `LANDING_INIT_DATA` 初始化 Wallpaper store，不是 Query 数据源                                                  | 在自有静态背景与移除默认背景之间显式决策；不能直接套用 Community Query 迁移                   |
| PageCommunity  | GraphQL 仍选择 `dashboard.wallpaperSettings`，SSR parser 仍解码 settings                                                | 普通页面载荷只保留发布态 Wallpaper 与独立的 `dashboard.contentShadow`；不携带 editor settings |
| 静态 Wallpaper | `wallpaperKeys.config` 的结果经 `StaticWallpaperProvider` 投影为 React Context；保存 hook 又把 version 复制到局部 state | Context 只作为渲染投影；confirmed version 唯一从 Wallpaper Query 订阅和更新                   |
| ThemePreset    | confirmed preset/tokens/options 仍镜像在 Valtio，普通页面会读取                                                         | 不属于本方案；后续如收口 Query ownership，必须单独盘点 CSS 注入和普通页读点                   |

因此，卸载普通页面 Provider 之前必须先盘点并迁移全部 Valtio 读点，包括但不限于：

- GlobalLayout 的 Dashboard `contentShadow` 内容表面效果（它不是 Wallpaper store 读点）；
- Landing salon 的 Wallpaper 派生样式与自有内容表面配置；
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

### Dashboard `contentShadow` 归属（已确认）

`contentShadow` 是 Dashboard 下独立的内容表面呈现配置，不是 Wallpaper 配置，也不是
`wallpaperPresentation`（该名称不是现有代码概念）。它由 GlobalLayout、Community 内容容器和 Landing
内容容器消费；Wallpaper renderer 只接收背景本身的 render spec，不接收 `contentShadow`。

当前实现仍把它按 `light/dark` 放在 `wallpaperSettings.*.renderConfig` 中。这是待迁移的旧形态，不是
目标归属。目标是提供独立的 `dashboard.contentShadow` 字段，并保留现有 `light/dark` 语义，避免迁移时
把两个 theme 的行为合并成一个全局布尔值。

这不是可以让普通页先切、editor 后切的 1→2→3 分阶段顺序，而是一个一次性 contract cutover：

1. Dashboard 独立字段、持久化、mutation、SSR/PageCommunity 输出和一次性回填同时准备；
2. editor route 的 working draft 与普通页同时切到 `dashboard.contentShadow`；
3. Wallpaper codec、settings schema、Snapshot canonical JSON 和 digest 同一批移除
   `renderConfig.contentShadow` 并升级版本。

在全部切换完成前，普通页面不能开始信任独立字段。若部署环境被迫分阶段，唯一允许的临时桥接是：
Backend 在接收旧 `renderConfig.contentShadow` 时，于同一个 Wallpaper publish 事务内镜像写入 Dashboard
字段；该双写必须有明确截止版本，不能成为目标架构或长期兼容层。

这是本方案明确批准的 GraphQL/backend schema 例外。它是内容呈现契约，不应命名为 Wallpaper
presentation，也不应由 `StaticWallpaperProvider` 或 Wallpaper Query 成为 owner。

### `contentShadow` 持久化与 Snapshot 关系（Phase 0 必须冻结）

当前事实不能被“独立 Dashboard 字段”这句话掩盖：

- `CMS.Wallpaper.Settings` 的 `@render_config_keys` 仍把 `contentShadow` 纳入 canonical Snapshot settings；
- `CMS.Wallpaper.RequestDigest` 的 v1 canonical JSON 对整个 `settings` 做排序和 hash，因此该键参与
  RequestDigest、Assets Hub capability、Publish Receipt、幂等重放和跨语言 golden fixtures；
- `restoreWallpaperSnapshot` 当前只切换指定 theme 的 active Snapshot 指针并递增 Wallpaper version；旧
  Snapshot 没有独立的 Dashboard `contentShadow` 字段。

Phase 0 必须冻结以下持久化与生命周期契约，才能执行上述 hard cut：

1. **canonical owner 与 SSR 来源**：Dashboard 独立字段是唯一真相源；从当前 active Snapshot 一次性回填，
   普通 Query/SSR 直接读取 `dashboard.contentShadow`，不保留运行时 Snapshot 投影或 fallback。
2. **持久化归属与 mutation**：`contentShadow` 落在 `CommunityDashboard` 的独立 `content_shadow` embed/section
   中，保留 `light/dark` 子 map；由 Dashboard section mutation（建议命名为
   `update_dashboard_content_shadow`）写入。它与 `CommunityWallpaper` 是不同 aggregate，Wallpaper publish
   不再写该字段。
3. **事务边界**：Dashboard content mutation 与 Wallpaper publish 各自拥有事务、错误和重试语义；同一个
   Appearance Save 若同时提交两者，也只能由 UI 编排两个独立 mutation，不能假设跨 aggregate 原子性。若未来
   需要“整套外观”原子恢复，必须新建显式 bundle mutation。
4. **restore 生命周期**：恢复 Wallpaper Snapshot 不回退 `dashboard.contentShadow`。如果产品要求恢复整套
   外观，必须由显式的跨域 restore 输入同时更新 Dashboard 字段；不能让只切 active pointer 的 mutation 隐式改变它。
5. **digest/Receipt**：hard cut 时 Wallpaper `renderConfig` 只保留背景四键，升级 settings/request digest
   version，重生成跨语言 fixtures；旧 v1 数据若已存在，必须在切换前完成一次性数据迁移，禁止运行时保留旧 key。

Phase 0 的验收记录必须同时写明：存储位置、per-theme shape、mutation 名称、事务归属、真相源、restore 是否联动、
SSR 回填终止条件、版本升级和已有 Snapshot/Receipt 的一次性迁移方案。

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
- 冻结 Dashboard `contentShadow` 独立字段的 GraphQL/持久化 shape、mutation 和事务归属；hard cut 时删除旧
  `wallpaperSettings.renderConfig.contentShadow`，不保留 editor wire 兼容层；
- 同步冻结共享背景 shape 的影响面：`Dashboard.Fields.macro_schema(:wallpaper_bg)` 与
  `BgConfigValidator` 当前同时服务 Dashboard Wallpaper 和 `CoverBackground`，但 `contentShadow` 只是
  共享 macro 泄漏到 Cover 的字段，不是 Cover 能力。一次性拆分时从 shared macro/validator 移除
  `contentShadow`，让 Wallpaper 与 Cover 都只保留背景字段；Dashboard 另建独立的 `content_shadow`
  配置和 validator。Cover 自己的图片级 `shadow`（`TCoverShadow`）与此无关，保持不动；不能把该
  字段移除误写成 Cover 数据迁移。
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
- 不改变 Wallpaper prepare/upload/publish endpoint 与其事务语义；Dashboard `contentShadow` 的独立 schema、
  mutation、持久化迁移和 digest/version 调整属于本方案范围。

### Phase 3：Query ownership

- 删除局部 `wallpaperStateVersion`；
- 由 `wallpaperKeys.config` 独占 confirmed version；
- mutation success 先 `setQueryData` 写回新 version，再刷新 static/editor Query；
- `5702/5708` 统一 refetch canonical Query；
- 验证请求在飞期间的新 draft 保留逻辑。

### Phase 4：普通页面读点迁移

- 根据 Phase 0 清单逐一迁移 Dashboard `contentShadow`、GlobalLayout、Landing salon 和共享 hooks 的读点；
- 仅复用归档文档 [`static_wallpaper.md` §8 末段](./static_wallpaper.md#8-bundle-边界) 与 §9.10 的
  Landing 决策表述：为 Landing Shell 配置自有 light/dark 静态背景，或明确接受移除默认背景并验收
  对应 glow/页面视觉变化；不得执行该文档 §9 的其他 v1 历史步骤；
- 本阶段只处理 Landing Shell 的共享 Wallpaper 消费，不重新打开已完成的营销演示 renderer 图片化；
- 保持 `StaticWallpaperProvider` 仅承载窄静态渲染数据。

### Phase 5：路由与载荷收口

- 普通 `PageCommunity` 删除 `wallpaperSettings`；
- 普通 `PageCommunity` 保留独立的 `dashboard.contentShadow` 窄字段；
- editor route 独占 settings/history 查询；
- editor 与普通页在同一 contract cutover 中切换，不能先切普通页再延后 editor；
- 普通 Community、Dash、Landing 不再挂载 Wallpaper editor store；
- 同步更新相关 contract/checklist，不再把目标状态标记为已完成事实。

## 9. 验收标准

- React hook 不直接调用 Assets Hub endpoint、upload 或 WebGPU exporter；
- 发布计划是无副作用纯函数，且不负责生成/复用 idempotency key；
- 网络编排可在无 React、无 WebGPU、无真实网络环境下完整测试；
- Assets Hub capability 与 Wallpaper publish 事务语义不变；Wallpaper settings/digest 版本因移除
  `contentShadow` 而有意升级，Dashboard content mutation 独立存在；
- 除明确批准的 Dashboard `contentShadow` 窄字段外，GraphQL schema 不变；该字段属于内容呈现契约，
  不属于 Wallpaper schema；
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
