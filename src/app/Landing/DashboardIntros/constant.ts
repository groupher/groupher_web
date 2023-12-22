import { DASHBOARD_ROUTE } from '@/constant/route'

export const TABS_ITEMS = [
  {
    key: DASHBOARD_ROUTE.LAYOUT,
    title: '布局与样式',
    desc: '这里是布局与样式的说明，看看效果',
  },
  {
    key: DASHBOARD_ROUTE.SEO,
    title: 'SEO 优化',
    desc: '自定义主流搜索引擎以及 Twitter 断的关键字等',
  },
  {
    key: DASHBOARD_ROUTE.POST,
    title: '社区内容管理',
    desc: '管理已发布内容，设置帖子各种属性等。',
  },
  {
    key: DASHBOARD_ROUTE.TAGS,
    title: '标签设置与管理',
  },
  {
    key: DASHBOARD_ROUTE.ADMINS,
    title: '管理员 / 权限',
  },
  {
    key: DASHBOARD_ROUTE.HEADER,
    title: '页头 / 页脚自定义',
  },
  {
    key: DASHBOARD_ROUTE.WIDGETS,
    title: '绑定与集成',
  },
  {
    key: DASHBOARD_ROUTE.TREND,
    title: '统计分析',
  },
]

export const holder = 1
