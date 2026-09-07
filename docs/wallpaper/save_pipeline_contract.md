# Wallpaper 保存链路与数据边界

> 文档角色：Active contract；记录当前实现
>
> 日期：2026-09-05
>
> 关联：[当前 theme 单独保存重构](./current_theme_save_refactor.md) ·
> [响应式静态产物、历史与共享导出机制](./responsive_revisions.md) ·
> [实时预览架构](./preview_architecture.md)
>
> Mixed：[实时编辑与静态发布边界（v1 主体归档）](./static_wallpaper.md)
>
> Archive：[浏览器端导出与上传（v1）](./browser_export_upload.md)

> 当前未完成项：[Wallpaper 后续工作](./followups.md#3-核心链路剩余验收与编辑器接线) §3.2–§3.3；当前保存主链路已按本
> 文档实现，未勾选项是部署联调和编辑器体验任务。

## 1. 当前唯一保存链路

Wallpaper 保存只处理当前 theme。前端用 touched 判断是否需要保存；一旦当前 theme 有变化，非
`NONE` 一律导出四张最终 WebP，`NONE` 才跳过图片生成。

```text
Dashboard Wallpaper Editor
  -> 选择当前 theme 的完整 settings
  -> normalize / touched
  -> 未 touched：结束
  -> NONE：直接 GraphQL publishWallpaper
  -> 其他 type：WebGPU 导出 wide/desktop/tablet/phone
  -> GraphQL prepareWallpaperUpload
  -> Browser POST Assets Hub /generated-batches
  -> 按 upload intent presign、PUT、finalize 四张图片
  -> GraphQL publishWallpaper
  -> Phoenix claim / verify capability
  -> DB transaction：Snapshot + Images + 当前 theme 指针 + version + Receipt
```

GraphQL 的 `prepareWallpaperUpload` 是 Phoenix 的准备 hop；`POST /generated-batches` 才是 Assets Hub
创建 Durable Object Batch 的 hop。两者不能在文档或代码中混成一个服务调用。

普通上传图片即使没有纹理、滤镜或其他 WebGPU 效果，也按同一套 Profile 导出最终图片。没有“普通
图片不需要生成图片”的保存分支；只有用户明确删除当前 Wallpaper，即 `type: 'none'`，才不生成图片。

## 2. 数据边界

### 2.1 GraphQL typed input

稳定业务字段使用 GraphQL Input Object，由 Absinthe 负责 camelCase 到 Elixir snake_case 的映射：

```graphql
input WallpaperSettingsInput {
  settingsSchemaVersion: Int!
  type: WallpaperType!
  source: String
  customWallpaper: CustomWallpaperInput
  renderConfig: Json
}

input WallpaperImageInput {
  profile: WallpaperProfile!
  checksum: String!
  mimeType: String!
  sizeBytes: Int!
  width: Int!
  height: Int!
}
```

`WallpaperImageInput` 是 GraphQL 层的正式类型名；Assets Hub 的内部通用 payload 仍可使用
`variantKey`。GraphQL 文档不使用内部 snake_case 名称替代 schema 名。

### 2.2 Json scalar

`renderConfig` 和 `CustomWallpaper.config` 是复杂渲染 recipe 的 JSON leaf，不是任意字段包。GraphQL
input 的 `Json` scalar 传 JSON 字符串，Settings codec 负责解析、版本校验和规范化；响应侧可以返回
JSON 对象。Absinthe 不会递归转换 JSON 内部 key，因此业务代码不能在 JSON 中猜测 snake_case 或
camelCase。

Settings codec 只固定 `renderConfig` 的五个顶层字段：`pattern`、`gradient`、`texture`、`effect`、
`contentShadow`。每个复杂子树（例如 `texture.params`）仍是带 `settingsSchemaVersion` 约束的
opaque JSON leaf，不复制成第二套 GraphQL object/input。

`type` 是唯一 Wallpaper/CustomWallpaper 判别字段。GraphQL enum token 为大写，Frontend Store 和
持久化 JSON 为小写；这组映射只在 codec 中实现，并由 settings golden fixture 固化。项目内禁止为
此判别使用 `kind`。

## 3. `light-wide` 事故的真实时间线

事故发生在 variants 仍是 GraphQL `Json` scalar 的旧实现中。浏览器在 JSON 字符串内发送了
`targetKey`、`mimeType`、`sizeBytes`，但旧 Phoenix helper 只读取 `target_key`、`mime_type`、
`size_bytes`。Json scalar 的内部 key 不会被 Absinthe 自动转换，所以 `light-wide` 的 metadata
校验失败。

现在图片 metadata 使用 typed `WallpaperImageInput`，Absinthe 在 GraphQL 边界完成字段映射；
`CMS.Wallpaper` 只读取 canonical atom key，不保留双格式读取。再次出现单张图片错误时，应看错误
中的 profile、field、expected 和 actual，而不是猜 casing。数量或列表形状错误使用独立的
`:wallpaper_upload_images_invalid`；单张 metadata 错误使用 `:wallpaper_upload_image_invalid`。

Profile 矩阵固定为：

| Profile   |    输出尺寸 | Assets Hub `variantKey`          |
| --------- | ----------: | -------------------------------- |
| `wide`    | 1920 × 1080 | `light-wide` / `dark-wide`       |
| `desktop` |  1440 × 900 | `light-desktop` / `dark-desktop` |
| `tablet`  | 1024 × 1366 | `light-tablet` / `dark-tablet`   |
| `phone`   |   390 × 844 | `light-phone` / `dark-phone`     |

矩阵由 `packages/contracts/fixtures/wallpaper-profile-matrix-v1.json` 固化。Profile 名不得包含 `-`；
外部 variant key 只能通过矩阵精确查找，未知值返回可控错误，不通过 `String.to_existing_atom` 读取。

## 4. Settings codec

Frontend 的 `wallpaperSettingsCodec` 和 Backend 的 `CMS.Wallpaper.Settings` 是同一数据边界的两端：

```text
GraphQL WallpaperSettingsInput
  -> Absinthe typed fields + Json string
  -> CMS.Wallpaper.Settings
  -> canonical settings JSON
  -> RequestDigest / Snapshot

GraphQL WallpaperSettings response
  -> wallpaperSettingsCodec.decodeWallpaperSettings
  -> TWallpaperSettings (= TBgConfig + contentShadow)
  -> existing lib/bg renderer path
```

Frontend codec 的三个入口是：

- `normalizeWallpaperSettings`：把当前 theme 的完整设置规范化；角度归一到 `0..359`，`NONE` 固定为
  `{type: 'none'}`，不注入默认值；
- `encodeWallpaperSettings`：输出 `WallpaperSettingsInput`，只把稳定 enum 转为 GraphQL token，并把
  `renderConfig/config` 序列化为 JSON string；图片 `assetPublicRef` 作为 typed 字段发送；
- `decodeWallpaperSettings`：校验 `settingsSchemaVersion`、五个顶层 renderConfig 字段和
  CustomWallpaper 分支，并按 Linear/Radial/Mesh family 校验 `version: 2`、必填字段和跨分支禁用字段；
  未知版本或非法结构直接报错，不静默使用前端默认值。

Backend Settings codec 只负责 settings 边界。`RequestDigest.canonical/1` 仍是 request digest 的唯一
canonical JSON 实现；PublishCapability 不重复实现 request digest 排序，只负责 Assets Hub publish
capability 的解析和发射。

`CustomWallpaper` 是扁平判别联合，不使用 `{type, value}` 包装：

```graphql
type CustomWallpaper {
  type: CustomWallpaperType!
  assetPublicRef: String
  config: Json!
}
```

`PICTURE` 的 `assetPublicRef` 必须在 typed 字段，不能复制进 `config`；`GRADIENT` 的 ref 必须为空。
所有消费者先按显式 `type` narrowing，不能从 `image` 是否存在来猜分支。该类型同时被 Wallpaper 与
CoverEditor 共享，变更后必须通过全仓 typecheck。

## 5. Assets Hub capability 边界

Assets Hub 是通用生成图片基础设施，内部保留 `Generated Batch`、`Upload Intent`、`Manifest`、
`variantKey`、`uploadRef` 和 claim。Wallpaper 业务层只暴露 `profile`；Browser→Assets Hub 的通用
HTTP wire 可以继续携带 `variantKey`，这不等于 Wallpaper GraphQL 暴露 Variant。

`CMS.Assets.GeneratedBatch.PublishCapability` 是唯一双向边界：

- `verify/1` 验签后把 Assets Hub camelCase payload/manifest 解析为 Phoenix canonical snake_case；
- `canonical_manifest/1` 和 `manifest_digest/1` 把 canonical manifest 发射为稳定 camelCase wire bytes；
- `CMS.Assets.Capability` 只负责 HMAC 验签和 JSON decode，不理解 Wallpaper；
- `CMS.Wallpaper` 只读取 PublishCapability 输出，不直接猜 wire key。

生成 Batch 的 `type`（publish/delete）是项目自有协议字段，不能退回 `kind`。普通外部库 AST 的
`kind` 不在本次重命名范围。

## 6. 单 theme 发布与恢复

```graphql
mutation PublishWallpaper($community: String!, $input: WallpaperPublishInput!) {
  publishWallpaper(community: $community, input: $input) {
    version
  }
}

input WallpaperPublishInput {
  theme: WallpaperTheme!
  settings: WallpaperSettingsInput!
  baseVersion: Int!
  idempotencyKey: String!
  batchRef: String
}
```

边界规则：

- `NONE` 时 `batchRef` 必须为空；其他类型必须携带完成四张 Profile 图片的 Batch；
- publish 锁定 `CommunityWallpaper`，校验 `baseVersion`，创建一个当前 theme 的 Snapshot；
- 同一事务只更新当前 theme 的 active Snapshot 指针、`version + 1` 和 Publish Receipt；另一支指针不动；
- 前端不提交或接收 active/candidate/owner ref。历史恢复使用公开的 `WallpaperSnapshot.id` 是唯一例外；
- 恢复不重新导出或上传图片，只将指定 theme 的 active 指针切到 retained Snapshot，并递增 version；
- `wallpaperHistory(theme)` 只返回当前查询 theme 的最近历史；`dashboard.wallpaper` 不暴露 Snapshot ID。

未初始化时：

```json
{ "version": 0, "light": null, "dark": null }
```

`dashboard.wallpaper` 外层始终非空；保存 NONE 后仍保留外层，只将对应 theme branch 设为 `null`。编辑
器的 `wallpaperSettings` 则在没有 active Snapshot 时读取 Backend 默认，有 active Snapshot（包括
NONE）时读取 Snapshot settings。Frontend 不用 truthy 判断 `version: 0`，也不为 NONE 填充 Content 默认色。

## 7. 生命周期与错误输出

Snapshot 保存完整 settings 和以下生命周期列：`created_by_id`、`activated_at`、`history_used_at`、
`delete_after`、`source_batch_ref`、`profile_version`、`settings_schema_version`。最近 5 个历史保留策略
和删除宽限期继续有效；不能因为模型改名而删掉这些列。

Snapshot JSON 内的 `settingsSchemaVersion` 与数据库 `settings_schema_version` 是同一版本的两种存储
表现：写入时断言相等，读取时不一致直接失败。JSON 内版本供 codec 解码和未知版本报错，数据库列只是
快速查询/审计镜像，不是第二个真相源。

所有错误经过 Wallpaper ErrorCat 和公共 GraphQL formatter，只公开 `message` 与 `extensions.code`。
单张图片错误的内部 details 会被拼入可读 message；不会透出 `reason`、`details` 或 legacy reason。

## 8. 验收清单

- [x] 当前 theme 未 touched 不发请求；changed non-NONE 保存统一导出四张 WebP，NONE 不导出。
- [x] GraphQL 图片 metadata 使用 typed `WallpaperImageInput`，不再使用 variants Json 双格式读取。
- [x] `dashboard.wallpaper` 外层非空，branch 可空；普通页面只按 `profile` 选择图片。
- [x] 一次保存只更新当前 theme 指针；指针、`version + 1`、Snapshot/Images 和 Receipt 在同一事务。
- [x] Settings codec、CustomWallpaper `type` 判别、NONE canonical 和版本镜像断言已接入。
- [x] `assetPublicRef` 不进入 picture `config`；Gradient branch 不携带 ref。
- [x] PublishCapability 承担 Assets Hub manifest 的双向转换和 manifest digest；RequestDigest 只有一份。
- [x] Assets Hub claim 字段使用 `type`，不使用项目自有 `kind`。
- [x] Frontend/CoverEditor 共享 `TBgConfig` 消费方通过全仓 typecheck。
- [x] 补齐 Linear/Radial/Mesh 全 renderer 的跨语言 settings golden fixture 与 codec 分支校验。
- [ ] `WallpaperEditor` route-only 请求已存在，但普通 `PageCommunity` 仍选择并解析 `wallpaperSettings`；待普通页
      Valtio 读点迁移完成后，普通页面才只请求已发布图片。
- [ ] 完成部署后的 GraphQL smoke、真实 Assets Hub 和线上 Profile/Content fallback 验收。
