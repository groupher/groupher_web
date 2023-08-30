import type { TSnakeUpperCase } from '@/spec'

import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

import type { TSettingField, TWidgetType, THeaderEditType, TFooterEditType } from './spec'

import { Icon } from './styles/side_menu'

export const ALIGN_HEADER_OFFSET = '148px'

// do not change, it's map to GQ endpoint updateDashboardLayout
export const SETTING_LAYOUT_FIELD = {
  PRIMARY_COLOR: 'primaryColor',
  POST_LAYOUT: 'postLayout',
  KANBAN_LAYOUT: 'kanbanLayout',
  KANBAN_BG_COLORS: 'kanbanBgColors',
  DOC_LAYOUT: 'docLayout',
  DOC_FAQ_LAYOUT: 'docFaqLayout',
  BRAND_LAYOUT: 'brandLayout',
  AVATAR_LAYOUT: 'avatarLayout',
  BANNER_LAYOUT: 'bannerLayout',
  HEADER_LAYOUT: 'headerLayout',
  FOOTER_LAYOUT: 'footerLayout',
  TOPBAR_LAYOUT: 'topbarLayout',
  TOPBAR_BG: 'topbarBg',
  BROADCAST_LAYOUT: 'broadcastLayout',
  BROADCAST_ARTICLE_LAYOUT: 'broadcastArticleLayout',
  BROADCAST_BG: 'broadcastBg',
  BROADCAST_ARTICLE_BG: 'broadcastArticleBg',
  CHANGELOG_LAYOUT: 'changelogLayout',
}

export const SETTING_FIELD = {
  ...SETTING_LAYOUT_FIELD,
  BASE_INFO: 'baseInfo',
  SEO: 'seo',
  SOCIAL_LINKS: 'socialLinks',
  TAG: 'tag',
  TAG_INDEX: 'tagIndex',
  FAQ_SECTIONS: 'faqSections',
  FAQ_SECTION_ITEM: 'faqSectionItem',
  FAQ_SECTION_ADD: 'faqSectionAdd',
  FAQ_SECTION_DELETE: 'faqSectionDelete',
  NAME_ALIAS: 'nameAlias',
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
        slug: DASHBOARD_ROUTE.INFO,
      },
      {
        title: 'SEO',
        slug: DASHBOARD_ROUTE.SEO,
      },
      {
        title: '社区板块',
        slug: DASHBOARD_ROUTE.THREADS,
      },
      {
        title: '布局/样式',
        slug: DASHBOARD_ROUTE.LAYOUT,
      },
      {
        title: '别名',
        slug: DASHBOARD_ROUTE.ALIAS,
        alias: SETTING_FIELD.NAME_ALIAS,
      },
      {
        title: '管理员',
        slug: DASHBOARD_ROUTE.ADMINS,
      },
      {
        title: '页头',
        slug: DASHBOARD_ROUTE.HEADER,
      },
      {
        title: '页脚',
        slug: DASHBOARD_ROUTE.FOOTER,
      },
    ],
  },

  CMS: {
    title: '内容管理',
    icon: <Icon.Management />,
    children: [
      {
        title: '社区',
        slug: DASHBOARD_ROUTE.COMMUNITIES,
      },
      {
        title: '标签',
        slug: DASHBOARD_ROUTE.TAGS,
      },
      {
        title: '帖子',
        slug: DASHBOARD_ROUTE.POST,
      },
      {
        title: '更新日志',
        slug: DASHBOARD_ROUTE.CHANGELOG,
      },
      {
        title: '帮助台',
        slug: DASHBOARD_ROUTE.DOC,
      },
      {
        title: '广播',
        slug: DASHBOARD_ROUTE.BROADCAST,
      },
      {
        title: '小黑屋',
        slug: DASHBOARD_ROUTE.BLACKHOUSE,
      },
      {
        title: 'RSS',
        slug: DASHBOARD_ROUTE.RSS,
      },
    ],
  },

  ANALYSIS: {
    title: '统计分析',
    icon: <Icon.Analysis />,
    children: [
      {
        title: '趋势',
        slug: DASHBOARD_ROUTE.TREND,
      },
      {
        title: '日志',
        slug: DASHBOARD_ROUTE.LOG,
      },
    ],
  },

  INTEGRATE: {
    title: '绑定集成',
    icon: <Icon.Bind />,
    children: [
      {
        title: '自定义域名',
        slug: DASHBOARD_ROUTE.DOMAIN,
      },
      {
        title: '外部应用',
        slug: DASHBOARD_ROUTE.THIRD_PART,
      },
      {
        title: '网站插件',
        slug: DASHBOARD_ROUTE.WIDGETS,
      },
    ],
  },
}

export const ALIAS_GROUP = {
  GENERAL: DASHBOARD_ALIAS_ROUTE.GENERAL,
  KANBAN: DASHBOARD_ALIAS_ROUTE.KANBAN,
}

export const BUILDIN_ALIAS_SUGGESTIONS = {
  post: ['帖子', '讨论区', '论坛'],
  kanban: ['路线图', '规划', '蓝图'],
  changelog: ['新功能', '发布日志', '里程碑', '开发计划'],
  upvote: ['支持', '顶', '赞', '有帮助'],
  upvote_bug: ['同样问题', '复现', '求解决'],
  todo: ['Todo', '已排期', '审核中', '计划中'],
  doing: ['Doing', '完善中'],
  done: ['Done', '已解决'],
}

export const BUILDIN_ALIAS = [
  {
    slug: 'post',
    name: '讨论',
    original: '讨论',
    group: ALIAS_GROUP.GENERAL,
  },
  {
    slug: 'changelog',
    name: '更新日志',
    original: '更新日志',
    group: ALIAS_GROUP.GENERAL,
  },
  {
    slug: 'kanban',
    name: '看板',
    original: '看板',
    group: ALIAS_GROUP.GENERAL,
  },
  {
    slug: 'upvote',
    name: '赞同',
    original: '赞同',
    group: ALIAS_GROUP.GENERAL,
  },
  {
    slug: 'upvote_bug',
    name: '相同问题',
    original: '相同问题',
    group: ALIAS_GROUP.GENERAL,
  },
  {
    slug: 'todo',
    name: '待办',
    original: '待办',
    group: ALIAS_GROUP.KANBAN,
  },
  {
    slug: 'doing',
    name: '进行中',
    original: '进行中',
    group: ALIAS_GROUP.KANBAN,
  },
  {
    slug: 'done',
    name: '已完成',
    original: '已完成',
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
    slug: WIDGET_TYPE.SIDEBAR,
  },
  {
    title: '居中模态框',
    slug: WIDGET_TYPE.MODAL,
  },
  {
    title: '弹出提示',
    slug: WIDGET_TYPE.POPUP,
  },
  {
    title: '页面内嵌',
    slug: WIDGET_TYPE.IFRAME,
  },
  {
    title: '链接',
    slug: WIDGET_TYPE.LINK,
  },
]

export const HEADER_EDIT_TYPE = {
  LOGO: 'logo',
  TITLE: 'title',
} as Record<Uppercase<THeaderEditType>, THeaderEditType>

export const FOOTER_EDIT_TYPE = {
  LOGO: 'logo',
  TITLE: 'title',
  SOCIAL: 'social',
} as Record<Uppercase<TFooterEditType>, TFooterEditType>

export const BASEINFO_TABS = [
  {
    title: '基本信息',
    slug: DASHBOARD_BASEINFO_ROUTE.BASIC,
  },
  {
    title: '社交媒体',
    slug: DASHBOARD_BASEINFO_ROUTE.SOCIAL,
  },
  {
    title: '其他',
    slug: DASHBOARD_BASEINFO_ROUTE.OTHER,
  },
]

export const SEO_TABS = [
  {
    title: '搜索引擎',
    slug: DASHBOARD_SEO_ROUTE.SEARCH_ENGINE,
  },
  {
    title: 'Twitter',
    slug: DASHBOARD_SEO_ROUTE.TWITTER,
  },
]

export const LAYOUT_TABS = [
  {
    title: '全局',
    slug: DASHBOARD_LAYOUT_ROUTE.GLOBAL,
  },
  {
    title: '讨论区',
    slug: DASHBOARD_LAYOUT_ROUTE.POST,
  },
  {
    title: '看板',
    slug: DASHBOARD_LAYOUT_ROUTE.KANBAN,
  },
  {
    title: '更新日志',
    slug: DASHBOARD_LAYOUT_ROUTE.CHANGELOG,
  },
  {
    title: '帮助台',
    slug: DASHBOARD_LAYOUT_ROUTE.DOC,
  },
]

export const BROADCAST_TABS = [
  {
    title: '站顶横幅',
    slug: DASHBOARD_BROADCAST_ROUTE.GLOBAL,
  },
  {
    title: '帖子页脚',
    slug: DASHBOARD_BROADCAST_ROUTE.ARTICLE,
  },
]

export const DOC_TABS = [
  {
    title: '概览',
    slug: DASHBOARD_DOC_ROUTE.TABLE,
  },
  {
    title: '目录编排',
    slug: DASHBOARD_DOC_ROUTE.TREE,
  },
  {
    title: '封面图标',
    slug: DASHBOARD_DOC_ROUTE.COVER,
  },
  {
    title: '常见问题',
    slug: DASHBOARD_DOC_ROUTE.FAQ,
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
    slug: DASHBOARD_ALIAS_ROUTE.GENERAL,
  },
  {
    title: '看板',
    slug: DASHBOARD_ALIAS_ROUTE.KANBAN,
  },
]

export const EMPTY_LINK_ITEM = {
  title: '',
  link: '',
  index: 0,
  group: '',
  groupIndex: 0,
}

const demoMarkdown = `
  this is a paragraph 

  - this is a list
  - this is a list 2
  - this is a list 3


  \`\`\`js
  var some = code();
  \`\`\`
`

export const DEFAULT_FAQ_ITEMS = [
  // {
  //   index: 0,
  //   title: '如何使用 Groupher？',
  //   body: '如何使用 Groupher 的内容，我将在这片文档继续分享相关话题',
  // },
  // {
  //   index: 1,
  //   title: 'Groupher 是免费的吗',
  //   body: demoMarkdown,
  // },
  // {
  //   index: 2,
  //   title: 'Groupher 可以独立部署吗',
  //   body: demoMarkdown,
  // },
]

export const DEFAULT_LINK_ITEMS = [
  {
    title: '讨论区',
    link: 'https://groupher.com/home/post',
    index: 0,
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '看板',
    link: 'https://groupher.com/home/kanban',
    index: 1,
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '更新日志',
    link: 'https://groupher.com/home/changelog',
    index: 2,
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '帮助台',
    link: 'https://groupher.com/home/help',
    index: 3,
    group: 'Group 0',
    groupIndex: 0,
  },
  {
    title: '关于',
    link: 'https://groupher.com/home/about',
    index: 4,
    group: 'Group 0',
    groupIndex: 0,
  },

  // group 1
  {
    title: '布局设置',
    link: 'https://groupher.com/home/post',
    index: 0,
    group: 'Group 1',
    groupIndex: 1,
  },
  {
    title: '看板设置',
    link: 'https://groupher.com/home/kanban',
    index: 1,
    group: 'Group 1',
    groupIndex: 1,
  },
  {
    title: '更新日志设置',
    link: 'https://groupher.com/home/changelog',
    index: 2,
    group: 'Group 1',
    groupIndex: 1,
  },

  //
  {
    title: '与 xxx 的对比',
    link: 'https://groupher.com/home/post',
    index: 0,
    group: 'Group 2',
    groupIndex: 2,
  },
  {
    title: '帮助中心',
    link: 'https://groupher.com/home/kanban',
    index: 1,
    group: 'Group 2',
    groupIndex: 2,
  },
  {
    title: '联系我们',
    link: 'https://groupher.com/home/changelog',
    index: 2,
    group: 'Group 2',
    groupIndex: 2,
  },
]

export const BASEINFO_KEYS = [
  'favicon',
  'logo',
  'title',
  'desc',
  'homepage',
  'slug',
  'city',
  'techstack',
]

export const UI_KEYS = [
  'layoutTab',
  'primaryColor',
  'brandLayout',
  'avatarLayout',
  'bannerLayout',
  'topbarLayout',
  'topbarBg',
  'postLayout',
  'kanbanLayout',
  'docLayout',
  'docFaqLayout',
  'changelogLayout',
  'glowFixed',
  'glowType',
  'glowOpacity',
]

export const SEO_KEYS = [
  'ogSiteName',
  'ogTitle',
  'ogDescription',
  'ogUrl',
  'ogImage',
  'ogLocale',
  'ogPublisher',

  'twTitle',
  'twDescription',
  'twUrl',
  'twCard',
  'twSite',
  'twImage',
  'twImageWidth',
  'twImageHeight',
]

export const BROADCAST_KEYS = [
  'broadcastTab',
  'broadcastLayout',
  'broadcastBg',
  'broadcastEnable',
  'broadcastArticleLayout',
  'broadcastArticleBg',
  'broadcastArticleEnable',
]

export const DEFAULT_NEW_FAQ = {
  title: '',
  body: '',
  index: 0,
}
