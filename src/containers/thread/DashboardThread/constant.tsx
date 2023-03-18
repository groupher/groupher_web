import type { TSnakeUpperCase } from '@/spec'
import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_SEO_ROUTE,
} from '@/constant/route'

import type { TSettingField, TWidgetType, TFooterEditType } from './spec'

import { Icon } from './styles/side_menu'

export const SETTING_FIELD = {
  PRIMARY_COLOR: 'primaryColor',
  POST_LAYOUT: 'postLayout',
  KANBAN_LAYOUT: 'kanbanLayout',
  KANBAN_BG_COLORS: 'kanbanBgColors',
  HELP_LAYOUT: 'helpLayout',
  HELP_FAQ_LAYOUT: 'helpFaqLayout',
  BRAND_LAYOUT: 'brandLayout',
  AVATAR_LAYOUT: 'avatarLayout',
  BANNER_LAYOUT: 'bannerLayout',
  FOOTER_LAYOUT: 'footerLayout',
  TOPBAR_LAYOUT: 'topbarLayout',
  TOPBAR_BG: 'topbarBg',
  BROADCAST_LAYOUT: 'broadcastLayout',
  BROADCAST_ARTICLE_LAYOUT: 'broadcastArticleLayout',
  BROADCAST_BG: 'broadcastBg',
  BROADCAST_ARTICLE_BG: 'broadcastArticleBg',
  CHANGELOG_LAYOUT: 'changelogLayout',
  TAG: 'tag',
  ALIAS: 'alias',
  RSS_FEED_TYPE: 'rssFeedType',
  RSS_FEED_COUNT: 'rssFeedCount',
  WIDGETS_PRIMARY_COLOR: 'widgetsPrimaryColor',
  WIDGETS_SIZE: 'widgetsSize',
  WIDGETS_THREADS: 'widgetsThreads',
  GLOW_TYPE: 'glowType',
  GLOW_FIXED: 'glowFixed',
  GLOW_OPACITY: 'glowOpacity',
} as Record<TSnakeUpperCase<TSettingField>, TSettingField>

export const MENU = {
  BASIC: {
    title: '基础设置',
    icon: <Icon.Basic />,
    children: [
      {
        title: '基本信息',
        raw: DASHBOARD_ROUTE.INFO,
      },
      {
        title: 'SEO',
        raw: DASHBOARD_ROUTE.SEO,
      },
      {
        title: '社区板块',
        raw: DASHBOARD_ROUTE.THREADS,
      },
      {
        title: '布局/样式',
        raw: DASHBOARD_ROUTE.LAYOUT,
      },
      {
        title: '别名',
        raw: DASHBOARD_ROUTE.ALIAS,
      },
      {
        title: '管理员',
        raw: DASHBOARD_ROUTE.ADMINS,
      },
      {
        title: '页头',
        raw: DASHBOARD_ROUTE.HEADER,
      },
      {
        title: '页脚',
        raw: DASHBOARD_ROUTE.FOOTER,
      },
    ],
  },
  ANALYSIS: {
    title: '统计分析',
    icon: <Icon.Analysis />,
    children: [],
  },
  MANAGEMENT: {
    title: '内容管理',
    icon: <Icon.Management />,
    children: [
      {
        title: '标签',
        raw: DASHBOARD_ROUTE.TAGS,
      },
      {
        title: '帖子',
        raw: DASHBOARD_ROUTE.POST,
      },
      {
        title: '看板',
        raw: DASHBOARD_ROUTE.KANBAN,
      },
      {
        title: '更新日志',
        raw: DASHBOARD_ROUTE.CHANGELOG,
      },
      {
        title: '帮助台',
        raw: DASHBOARD_ROUTE.HELP,
      },
      {
        title: '广播',
        raw: DASHBOARD_ROUTE.BROADCAST,
      },
      {
        title: '小黑屋',
        raw: DASHBOARD_ROUTE.BLACKHOUSE,
      },
      {
        title: 'RSS',
        raw: DASHBOARD_ROUTE.RSS,
      },
    ],
  },

  INTEGRATE: {
    title: '绑定集成',
    icon: <Icon.Bind />,
    children: [
      {
        title: '自定义域名',
        raw: DASHBOARD_ROUTE.DOMAIN,
      },
      {
        title: '外部应用',
        raw: DASHBOARD_ROUTE.THIRD_PART,
      },
      {
        title: '网站插件',
        raw: DASHBOARD_ROUTE.WIDGETS,
      },
    ],
  },
}

export const ALIAS_GROUP = {
  GENERAL: DASHBOARD_ALIAS_ROUTE.GENERAL,
  KANBAN: DASHBOARD_ALIAS_ROUTE.KANBAN,
}

export const BUILDIN_ALIAS = [
  {
    raw: 'post',
    name: '讨论',
    original: '讨论',
    suggestions: ['帖子', '讨论区', '论坛'],
    group: ALIAS_GROUP.GENERAL,
  },
  {
    raw: 'changelog',
    name: '更新日志',
    original: '更新日志',
    suggestions: ['新功能', '发布日志', '里程碑', '开发计划'],
    group: ALIAS_GROUP.GENERAL,
  },
  {
    raw: 'kanban',
    name: '看板',
    original: '看板',
    suggestions: ['路线图', '规划', '蓝图'],
    group: ALIAS_GROUP.GENERAL,
  },
  {
    raw: 'upvote',
    name: '赞同',
    original: '赞同',
    suggestions: ['支持', '顶', '赞', '有帮助'],
    group: ALIAS_GROUP.GENERAL,
  },
  {
    raw: 'upvote_bug',
    name: '相同问题',
    original: '相同问题',
    suggestions: ['同样问题', '复现', '求解决'],
    group: ALIAS_GROUP.GENERAL,
  },
  {
    raw: 'todo',
    name: '待办',
    original: '待办',
    suggestions: ['Todo', '已排期', '审核中', '计划中'],
    group: ALIAS_GROUP.KANBAN,
  },
  {
    raw: 'doing',
    name: '进行中',
    original: '进行中',
    suggestions: ['Doing', '完善中'],
    group: ALIAS_GROUP.KANBAN,
  },
  {
    raw: 'done',
    name: '已完成',
    original: '已完成',
    suggestions: ['Done', '已解决'],
    group: ALIAS_GROUP.KANBAN,
  },
]

export const WIDGET_TYPE = {
  SIDEBAR: 'sidebar',
  MODAL: 'modal',
  POPUP: 'popup',
  IFRAME: 'iframe',
  LINK: 'link',
} as Record<Uppercase<TWidgetType>, TWidgetType>

export const WIDGET_TYPES = [
  {
    title: '侧边栏',
    raw: WIDGET_TYPE.SIDEBAR,
  },
  {
    title: '居中模态框',
    raw: WIDGET_TYPE.MODAL,
  },
  {
    title: '弹出提示',
    raw: WIDGET_TYPE.POPUP,
  },
  {
    title: '页面内嵌',
    raw: WIDGET_TYPE.IFRAME,
  },
  {
    title: '链接',
    raw: WIDGET_TYPE.LINK,
  },
]

export const FOOTER_EDIT_TYPE = {
  LOGO: 'logo',
  TITLE: 'title',
  SOCIAL: 'social',
} as Record<Uppercase<TFooterEditType>, TFooterEditType>

export const BASEINFO_TABS = [
  {
    title: '基本信息',
    raw: DASHBOARD_BASEINFO_ROUTE.BASIC,
  },
  {
    title: '社交媒体',
    raw: DASHBOARD_BASEINFO_ROUTE.SOCIAL,
  },
  {
    title: '其他',
    raw: DASHBOARD_BASEINFO_ROUTE.OTHER,
  },
]

export const SEO_TABS = [
  {
    title: '搜索引擎',
    raw: DASHBOARD_SEO_ROUTE.SEARCH_ENGINE,
  },
  {
    title: 'Twitter',
    raw: DASHBOARD_SEO_ROUTE.TWITTER,
  },
]

export const LAYOUT_TABS = [
  {
    title: '全局',
    raw: DASHBOARD_LAYOUT_ROUTE.GLOBAL,
  },
  {
    title: '讨论区',
    raw: DASHBOARD_LAYOUT_ROUTE.POST,
  },
  {
    title: '看板',
    raw: DASHBOARD_LAYOUT_ROUTE.KANBAN,
  },
  {
    title: '更新日志',
    raw: DASHBOARD_LAYOUT_ROUTE.CHANGELOG,
  },
  {
    title: '帮助台',
    raw: DASHBOARD_LAYOUT_ROUTE.HELP,
  },
]

export const BROADCAST_TABS = [
  {
    title: '站顶横幅',
    raw: DASHBOARD_BROADCAST_ROUTE.GLOBAL,
  },
  {
    title: '帖子页脚',
    raw: DASHBOARD_BROADCAST_ROUTE.ARTICLE,
  },
]

export const TW_CARD = {
  SUMMARY: 'summary',
  SUMMARY_LARGE_IMAGE: 'summary_large_image',
}

export const TW_CARD_OPTIONS = [
  {
    label: TW_CARD.SUMMARY,
    value: TW_CARD.SUMMARY,
  },

  {
    label: TW_CARD.SUMMARY_LARGE_IMAGE,
    value: TW_CARD.SUMMARY_LARGE_IMAGE,
  },
]

export const ALIAS_TABS = [
  {
    title: '常规',
    raw: DASHBOARD_ALIAS_ROUTE.GENERAL,
  },
  {
    title: '看板',
    raw: DASHBOARD_ALIAS_ROUTE.KANBAN,
  },
]

export const DEFAULT_LINK_ITEMS = [
  {
    title: '讨论区',
    addr: 'https://groupher.com/home/post',
    index: 0,
    raw: '0',
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '看板',
    addr: 'https://groupher.com/home/kanban',
    index: 1,
    raw: '1',
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '更新日志',
    addr: 'https://groupher.com/home/changelog',
    index: 2,
    raw: '2',
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '帮助台',
    addr: 'https://groupher.com/home/help',
    index: 3,
    raw: '3',
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '关于',
    addr: 'https://groupher.com/home/about',
    index: 4,
    raw: '4',
    group: 'Group 0',
    groupIndex: 0,
  },

  // group 1
  {
    title: '布局设置',
    addr: 'https://groupher.com/home/post',
    index: 0,
    raw: '0',
    group: 'Group 1',
    groupIndex: 1,
  },
  {
    title: '看板设置',
    addr: 'https://groupher.com/home/kanban',
    index: 1,
    raw: '1',
    group: 'Group 1',
    groupIndex: 1,
  },
  {
    title: '更新日志设置',
    addr: 'https://groupher.com/home/changelog',
    index: 2,
    raw: '2',
    group: 'Group 1',
    groupIndex: 1,
  },

  //
  {
    title: '与 xxx 的对比',
    addr: 'https://groupher.com/home/post',
    index: 0,
    raw: '0',
    group: 'Group 2',
    groupIndex: 2,
  },
  {
    title: '帮助中心',
    addr: 'https://groupher.com/home/kanban',
    index: 1,
    raw: '1',
    group: 'Group 2',
    groupIndex: 2,
  },
  {
    title: '联系我们',
    addr: 'https://groupher.com/home/changelog',
    index: 2,
    raw: '2',
    group: 'Group 2',
    groupIndex: 2,
  },
]
