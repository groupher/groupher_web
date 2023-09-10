/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import type { TRootStore as RootStoreType } from '@/stores/RootStore'

import type { TArticle } from './article'
import type { TCommunity } from './community'

export type { TSnakeUpperCase, TNegativeInteger, TNonNegativeInteger, TValueOf } from './enhance'

export type { TMetric } from './metric'
export type {
  TSize,
  TSizeT,
  TSizeS,
  TSizeM,
  TSizeL,
  TSizeTS,
  TSizeTSM,
  TSizeSML,
  TSizeSM,
} from './size'
export type { TButton, TFiltersMenuItems } from './comp'
export type { TTheme, TThemeMap, TThemeName } from './theme'
export type { TAccount, TUser, TPagedUsers, TSimpleUser, TMembership, TC11N } from './account'
export type { TC11NLayout } from './c11n'
export type {
  TCommunity,
  TMediaReport,
  TModerator,
  TPagedCommunities,
  TTag,
  TNaviTag,
  TFilterTag,
  TGroupedTags,
  TCategory,
} from './community'

export type { TThread, TArticleThread, TCommunityThread } from './thread'

export type {
  TID,
  TTestable,
  TActive,
  TSpace,
  TGAEvent,
  TSEO,
  TLink,
  TPlatform,
  Nullable,
  TDirection,
  TScrollDirection,
  TTooltipAnimation,
  TTooltipPlacement,
  TReportType,
  TAttInfo,
  TTabItem,
  TResState,
  TPaymentUsage,
  TPaymentMethod,
  TFlexRule,
  TGQError,
  TInput,
  TEditValue,
  TSubmitState,
  TSelectOption,
  TCityOption,
  TTechStackCategory,
  TCommunitySetterStyle,
  TToastType,
  TView,
  TUserActivity,
  TEditMode,
  TOnlineStatus,
  TModelineType,
  TTagMode,
  TMenuOption,
  TPublishMode,
  TDashboardLayout,
  TSocial,
  TSocialType,
  TSocialItem,
  TLinkItem,
  TGroupedLinks,
  TChangeMode,
} from './utils'

export type { TGQLError } from './graphql'

export type {
  TAvatarLayout,
  TTopbarLayout,
  TBrandLayout,
  TBannerLayout,
  TPostLayout,
  TKanbanLayout,
  TChangelogLayout,
  TDocLayout,
  TDocFAQLayout,
  THeaderLayout,
  TFooterLayout,
  TGlobalLayout,
  TBroadcastLayout,
  TBroadcastArticleLayout,
  TBroadcastConfig,
  TEnableConfig,
  TNameAliasConfig,
  TDashboardThreadConfig,
  TFooterConfig,
  TRSSType,
} from './dashboard'

export type {
  TCollectionFolder,
  TPagedCollectionFolder,
  TDocument,
  TArticle,
  TViewingInfo,
  TArticleEntries,
  TArticleMeta,
  TPost,
  TChangelog,
  TSocialInfo,
  TTechCommunities,
  TTechStack,
  TPagedArticles,
  TComment,
  TPagedComments,
  TArticleFilter,
  TArticleFilterMode,
  TArticleCatMode,
  TArticleStateMode,
  TCopyright,
  TUpvoteLayout,
  TCommentsState,
  TArticleCat,
  TArticlePubSelector,
  TArticleCatReject,
  TArticleState,
  TFAQSection,
} from './article'

export type {
  TGallery,
  TGalleryDefault,
  TGalleryList,
  TGalleryMasonryCollumn,
  TGalleryMainColumn,
  TGallery2Column,
  TGallery3Column,
  TGalleryTextOnly,
  TGalleryTextWithImage,
} from './gallery'

export type { TMenu } from './menu'
export type { TAccountStore, TViewingStore } from './store'

export type { TEmotion, TEmotionType } from './emotion'

export type {
  TWallpaperPic,
  TWallpaperGradient,
  TWallpaperFmt,
  TWallpaper,
  TWallpaperType,
  TWallpaperGradientDir,
  TCustomWallpaper,
  TWallpaperInfo,
} from './wallpaper'

export type { TColorName } from './color'

export type {
  TPath,
  TDashboardPath,
  TNonCommunityPath,
  TDashboardLayoutRoute,
  TDashboardBaseInfoRoute,
  TDashboardSEORoute,
  TDashboardDocRoute,
  TDashboardBroadcastRoute,
  TDashboardAliasRoute,
} from './route'

export type TRoute = {
  communityPath?: string
  threadPath?: string
  mainPath?: string
  subPath?: string
}

export type TRootStore = RootStoreType

export type TViewing = TCommunity | TArticle

export type TContainer = 'body' | 'drawer'

export type TGlowPosition = 'fixed' | 'absolute'
export type TGlowEffect = {
  glowType: string
  glowPosition?: TGlowPosition
  glowFixed?: boolean
  glowOpacity?: string
}

interface IWindow extends Window {
  appVersion?: string
  /**
   * used for check platform hook
   */
  chrome?: any
  safari?: any
  StyleMedia?: any
  HTMLElement?: any

  // for baidu analysis
  _hmt?: any
}

export type TWindow = IWindow | null
