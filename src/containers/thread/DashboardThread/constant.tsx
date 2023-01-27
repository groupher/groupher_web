import type { TSnakeUpperCase } from '@/spec'
import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_SEO_ROUTE,
} from '@/constant/route'

import type { TSettingField, TWidgetType, TFooterEditType } from './spec'

import { Icon } from './styles/side_menu'

export const SETTING_FIELD = {
  PRIMARY_COLOR: 'primaryColor',
  POST_LAYOUT: 'postLayout',
  KANBAN_LAYOUT: 'kanbanLayout',
  HELP_LAYOUT: 'helpLayout',
  BRAND_LAYOUT: 'brandLayout',
  AVATAR_LAYOUT: 'avatarLayout',
  BANNER_LAYOUT: 'bannerLayout',
  FOOTER_LAYOUT: 'footerLayout',
  TOPBAR_LAYOUT: 'topbarLayout',
  TOPBAR_BG: 'topbarBg',
  BROADCAST_LAYOUT: 'broadcastLayout',
  BROADCAST_BG: 'broadcastBg',
  CHANGELOG_LAYOUT: 'changelogLayout',
  TAG: 'tag',
  ALIAS: 'alias',
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
        title: '横幅广播',
        raw: DASHBOARD_ROUTE.BANNER_BROADCAST,
      },
      {
        title: '小黑屋',
        raw: DASHBOARD_ROUTE.BLACKHOUSE,
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

export const BUILDIN_ALIAS = [
  {
    raw: 'posts',
    name: '讨论',
    original: '讨论',
    suggestions: ['帖子', '讨论区', '论坛'],
  },
  {
    raw: 'changelog',
    name: '更新日志',
    original: '更新日志',
    suggestions: ['新功能', '发布日志', '里程碑'],
  },
  {
    raw: 'kanban',
    name: '看板',
    original: '看板',
    suggestions: ['路线图', '规划', '蓝图'],
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
  {
    title: '关于',
    raw: DASHBOARD_LAYOUT_ROUTE.ABOUT,
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
