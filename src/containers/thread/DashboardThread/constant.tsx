import type { TSnakeUpperCase } from '@/spec'
import { DASHBOARD_ROUTE } from '@/constant'

import type { TSettingField, TWidgetType } from './spec'

import { Icon } from './styles/side_menu'

export const SETTING_FIELD = {
  PRIMARY_COLOR: 'primaryColor',
  POST_LAYOUT: 'postLayout',
  HELP_LAYOUT: 'helpLayout',
  BRAND_LAYOUT: 'brandLayout',
  BANNER_LAYOUT: 'bannerLayout',
  FILE_TREE_DIRECTION: 'fileTreeDirection',
  BANNER_NOTIFY_LAYOUT: 'bannerNotifyLayout',
  BANNER_NOTIFY_BG: 'bannerNotifyBg',
  CHANGELOG_LAYOUT: 'changelogLayout',
  TAG: 'tag',
  ALIAS: 'alias',
  WIDGETS_PRIMARY_COLOR: 'widgetsPrimaryColor',
  WIDGETS_SIZE: 'widgetsSize',
  WIDGETS_THREADS: 'widgetsThreads',
} as Record<TSnakeUpperCase<TSettingField>, TSettingField>

export const MENU = {
  BASIC: {
    title: '基础设置',
    icon: <Icon.Basic />,
    children: [
      {
        title: '关于社区',
        raw: DASHBOARD_ROUTE.INFO,
      },
      {
        title: '外观',
        raw: DASHBOARD_ROUTE.UI,
      },
      {
        title: '社区板块',
        raw: DASHBOARD_ROUTE.THREADS,
      },
      {
        title: '板块布局',
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
        title: '域名',
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
