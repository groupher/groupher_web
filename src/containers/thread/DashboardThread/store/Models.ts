import { values } from 'ramda'

import { FAQSection, Tag, Moderator } from '@/model'

import SIZE from '@/constant/size'
import { COLOR_NAME } from '@/constant/colors'
import { THREAD } from '@/constant/thread'
import { GLOW_OPACITY } from '@/constant/glow_effect'
import {
  TAG_LAYOUT,
  AVATAR_LAYOUT,
  BRAND_LAYOUT,
  BANNER_LAYOUT,
  TOPBAR_LAYOUT,
  BROADCAST_LAYOUT,
  BROADCAST_ARTICLE_LAYOUT,
  CHANGELOG_LAYOUT,
  DOC_LAYOUT,
  DOC_FAQ_LAYOUT,
  POST_LAYOUT,
  KANBAN_LAYOUT,
  HEADER_LAYOUT,
  FOOTER_LAYOUT,
  RSS_TYPE,
} from '@/constant/layout'

import { T } from '@/mobx'
// import { mockTags } from '@/mock'

import {
  BUILDIN_ALIAS,
  WIDGET_TYPE,
  TW_CARD,
  DEFAULT_FAQ_ITEMS,
  EMPTY_MEDIA_REPORT,
  INIT_KANBAN_COLORS,
} from '../constant'

export const Overview = T.model('Overview', {
  views: T.opt(T.int, -1),
  subscribersCount: T.opt(T.int, -1),
  postsCount: T.opt(T.int, -1),
  changelogsCount: T.opt(T.int, -1),
  docsCount: T.opt(T.int, -1),
})

export const Enable = T.model('Enable', {
  post: T.opt(T.bool, true),
  kanban: T.opt(T.bool, true),
  changelog: T.opt(T.bool, true),
  //
  doc: T.opt(T.bool, true),
  docLastUpdate: T.opt(T.bool, true),
  docReaction: T.opt(T.bool, true),
  //
  about: T.opt(T.bool, true),
  aboutTechstack: T.opt(T.bool, true),
  aboutLocation: T.opt(T.bool, true),
  aboutLinks: T.opt(T.bool, true),
  aboutMediaReport: T.opt(T.bool, true),
})

export const NameAlias = T.model('NameAlias', {
  slug: T.opt(T.string, ''),
  name: T.opt(T.string, ''),
  original: T.opt(T.string, ''),
  group: T.opt(T.string, ''),
})

export const LinkItem = T.model('LinkItem', {
  index: T.opt(T.int, 0),
  title: T.opt(T.str, ''),
  link: T.opt(T.str, ''),
  group: T.opt(T.str, ''),
  groupIndex: T.opt(T.int, 0),
})

export const SocialLink = T.model('SocialLink', {
  type: T.opt(T.str, ''),
  link: T.opt(T.str, ''),
})

export const MediaReport = T.model('MediaReport', {
  index: T.maybeNull(T.number),
  title: T.opt(T.str, ''),
  favicon: T.opt(T.str, ''),
  siteName: T.opt(T.str, ''),
  url: T.opt(T.str, ''),
  editUrl: T.opt(T.str, ''),
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
  slug: T.opt(T.string, ''),
  desc: T.opt(T.string, ''),
  introduction: T.opt(T.string, ''),
  homepage: T.opt(T.string, ''),
  city: T.opt(T.string, ''),
  techstack: T.opt(T.string, ''),

  // social
  socialLinks: T.opt(T.array(SocialLink), []),
  mediaReports: T.opt(T.array(MediaReport), [EMPTY_MEDIA_REPORT]),

  // seo
  seoEnable: T.opt(T.bool, true),
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
  primaryColor: T.opt(T.enum(values(COLOR_NAME)), COLOR_NAME.BLACK),
  postLayout: T.opt(T.enum(values(POST_LAYOUT)), POST_LAYOUT.QUORA),
  kanbanLayout: T.opt(T.enum(values(KANBAN_LAYOUT)), KANBAN_LAYOUT.SIMPLE),
  kanbanBgColors: T.opt(T.array(T.string), INIT_KANBAN_COLORS),

  docLayout: T.opt(T.enum(values(DOC_LAYOUT)), DOC_LAYOUT.BLOCKS),
  docFaqLayout: T.opt(T.enum(values(DOC_FAQ_LAYOUT)), DOC_FAQ_LAYOUT.COLLAPSE),
  tagLayout: T.opt(T.enum(values(TAG_LAYOUT)), TAG_LAYOUT.HASH),
  avatarLayout: T.opt(T.enum(values(AVATAR_LAYOUT)), AVATAR_LAYOUT.SQUARE),
  brandLayout: T.opt(T.enum(values(BRAND_LAYOUT)), BRAND_LAYOUT.BOTH),
  bannerLayout: T.opt(T.enum(values(BANNER_LAYOUT)), BANNER_LAYOUT.HEADER),
  topbarLayout: T.opt(T.enum(values(TOPBAR_LAYOUT)), TOPBAR_LAYOUT.NO),
  topbarBg: T.opt(T.enum(values(COLOR_NAME)), COLOR_NAME.ORANGE),

  broadcastLayout: T.opt(T.enum(values(BROADCAST_LAYOUT)), BROADCAST_LAYOUT.DEFAULT),
  broadcastBg: T.opt(T.enum(values(COLOR_NAME)), COLOR_NAME.BLACK),
  broadcastEnable: T.opt(T.bool, false),

  broadcastArticleLayout: T.opt(
    T.enum(values(BROADCAST_ARTICLE_LAYOUT)),
    BROADCAST_ARTICLE_LAYOUT.DEFAULT,
  ),
  broadcastArticleBg: T.opt(T.enum(values(COLOR_NAME)), COLOR_NAME.RED),
  broadcastArticleEnable: T.opt(T.bool, true),

  changelogLayout: T.opt(T.enum(values(CHANGELOG_LAYOUT)), CHANGELOG_LAYOUT.CLASSIC),

  // doc
  docCategories: T.opt(T.array(GroupCategory), []),

  // glow effect
  // glowType: T.opt(T.string, keys(GLOW_EFFECTS)[0]),
  glowType: T.opt(T.string, ''),
  glowFixed: T.opt(T.bool, true),
  glowOpacity: T.opt(T.enum(values(GLOW_OPACITY)), GLOW_OPACITY.NORMAL),

  // contents
  // tags
  // tags: T.opt(T.array(Tag), mockTags(12)),
  tags: T.opt(T.array(Tag), []),
  activeTagGroup: T.maybeNull(T.string),
  activeTagThread: T.maybeNull(T.string),
  nameAlias: T.opt(T.array(NameAlias), BUILDIN_ALIAS),
  enable: T.opt(Enable, {}),

  faqSections: T.opt(T.array(FAQSection), DEFAULT_FAQ_ITEMS),

  rssFeedType: T.opt(T.enum(values(RSS_TYPE)), RSS_TYPE.DIGEST),
  rssFeedCount: T.opt(T.int, 5),

  headerLayout: T.opt(T.enum(values(HEADER_LAYOUT)), HEADER_LAYOUT.CENTER),
  footerLayout: T.opt(T.enum(values(FOOTER_LAYOUT)), FOOTER_LAYOUT.GROUP),

  // footerLinks: T.opt(T.array(LinkItem), DEFAULT_LINK_ITEMS),
  footerLinks: T.opt(T.array(LinkItem), []),
  headerLinks: T.opt(T.array(LinkItem), []),

  // moderators

  moderators: T.opt(T.array(Moderator), []),

  // widgets
  widgetsPrimaryColor: T.opt(T.enum(values(COLOR_NAME)), COLOR_NAME.BLACK),
  widgetsThreads: T.opt(T.array(T.string), [THREAD.POST, THREAD.KANBAN, THREAD.CHANGELOG]),
  widgetsSize: T.opt(T.enum([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE]), SIZE.MEDIUM),
  widgetsType: T.opt(T.enum(values(WIDGET_TYPE)), WIDGET_TYPE.SIDEBAR),
}

export const InitSettings = T.model('DashboardInit', settingsModalFields)
