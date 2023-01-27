import { keys, values } from 'ramda'

import { Tag } from '@/model'

import SIZE from '@/constant/size'
import { COLORS, COLOR_NAME } from '@/constant/colors'
import { THREAD } from '@/constant/thread'
import GLOW_EFFECTS, { GLOW_OPACITY } from '@/constant/glow_effect'
import {
  AVATAR_LAYOUT,
  BRAND_LAYOUT,
  BANNER_LAYOUT,
  TOPBAR_LAYOUT,
  BANNER_BROADCAST_LAYOUT,
  CHANGELOG_LAYOUT,
  HELP_LAYOUT,
  POST_LAYOUT,
  KANBAN_LAYOUT,
  FOOTER_LAYOUT,
} from '@/constant/layout'

import { T } from '@/utils/mobx'
import { mockTags } from '@/utils/mock'

import { BUILDIN_ALIAS, WIDGET_TYPE, TW_CARD } from '../constant'

export const Alias = T.model('Alias', {
  raw: T.opt(T.string, ''),
  name: T.opt(T.string, ''),
  original: T.opt(T.string, ''),
  suggestions: T.opt(T.array(T.string), []),
})

const File = T.model('File', {
  index: T.int,
  name: T.str,
  articleId: T.opt(T.str, ''),
  linkAddr: T.opt(T.str, ''),
})

const GroupCategory = T.model('GroupGategory', {
  name: T.opt(T.str, ''),
  index: T.int,
  color: T.opt(T.enum(values(COLOR_NAME)), COLOR_NAME.BLACK),
  files: T.opt(T.array(File), []),
})

export const settingsModalFields = {
  // baseInfo
  favicon: T.opt(T.string, ''),
  logo: T.opt(T.string, ''),
  title: T.opt(T.string, ''),
  desc: T.opt(T.string, ''),
  homepage: T.opt(T.string, ''),
  url: T.opt(T.string, ''),
  city: T.opt(T.string, ''),
  techstack: T.opt(T.string, ''),

  // seo
  ogSiteName: T.opt(T.string, ''),
  ogTitle: T.opt(T.string, ''),
  ogDescription: T.opt(T.string, ''),
  ogUrl: T.opt(T.string, ''),
  ogImage: T.opt(T.string, ''),
  ogLocale: T.opt(T.string, ''),
  ogPublisher: T.opt(T.string, ''),

  twTitle: T.opt(T.string, ''),
  twDescription: T.opt(T.string, ''),
  twUrl: T.opt(T.string, ''),
  twCard: T.opt(T.string, TW_CARD.SUMMARY),
  twSite: T.opt(T.string, ''),
  twImage: T.opt(T.string, ''),
  twImageWidth: T.opt(T.string, ''),
  twImageHeight: T.opt(T.string, ''),

  // layout
  primaryColor: T.opt(T.enum(keys(COLORS)), COLOR_NAME.BLACK),
  postLayout: T.opt(T.enum(values(POST_LAYOUT)), POST_LAYOUT.UPVOTE_FIRST),
  kanbanLayout: T.opt(T.enum(values(KANBAN_LAYOUT)), KANBAN_LAYOUT.SIMPLE),
  helpLayout: T.opt(T.enum(values(HELP_LAYOUT)), HELP_LAYOUT.FAQ_COLLAPSE),
  avatarLayout: T.opt(T.enum(values(AVATAR_LAYOUT)), AVATAR_LAYOUT.SQUARE),
  brandLayout: T.opt(T.enum(values(BRAND_LAYOUT)), BRAND_LAYOUT.BOTH),
  bannerLayout: T.opt(T.enum(values(BANNER_LAYOUT)), BANNER_LAYOUT.HEADER),
  topbarLayout: T.opt(T.enum(values(TOPBAR_LAYOUT)), TOPBAR_LAYOUT.YES),
  topbarBg: T.opt(T.enum(keys(COLORS)), COLOR_NAME.BLACK),

  bannerBroadcastLayout: T.opt(
    T.enum(values(BANNER_BROADCAST_LAYOUT)),
    BANNER_BROADCAST_LAYOUT.DEFAULT,
  ),
  bannerBroadcastBg: T.opt(T.enum(keys(COLORS)), COLOR_NAME.BLACK),
  bannerBroadcastEnable: T.opt(T.bool, false),

  changelogLayout: T.opt(T.enum(values(CHANGELOG_LAYOUT)), CHANGELOG_LAYOUT.PREVIEW),

  // help
  helpCategories: T.opt(T.array(GroupCategory), []),

  // glow effect
  glowType: T.opt(T.string, keys(GLOW_EFFECTS)[0]),
  glowFixed: T.opt(T.bool, true),
  glowOpacity: T.opt(T.enum(values(GLOW_OPACITY)), GLOW_OPACITY.NORMAL),

  // tags
  tags: T.opt(T.array(Tag), mockTags(12)),
  activeTagCategory: T.maybeNull(T.string),
  //
  alias: T.opt(T.array(Alias), BUILDIN_ALIAS),

  // footer
  footerLayout: T.opt(T.enum(values(FOOTER_LAYOUT)), FOOTER_LAYOUT.FULL),

  // widgets
  widgetsPrimaryColor: T.opt(T.enum(keys(COLORS)), COLOR_NAME.BLACK),
  widgetsThreads: T.opt(T.array(T.string), [THREAD.POST, THREAD.KANBAN, THREAD.CHANGELOG]),
  widgetsSize: T.opt(T.enum([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE]), SIZE.MEDIUM),
  widgetsType: T.opt(T.enum(values(WIDGET_TYPE)), WIDGET_TYPE.SIDEBAR),
}

export const InitSettings = T.model('DashboardInit', settingsModalFields)
