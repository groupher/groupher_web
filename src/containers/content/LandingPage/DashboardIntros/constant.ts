import { DASHBOARD_ROUTE } from '@/constant/route'

export const TABS_ITEMS = [
  {
    key: DASHBOARD_ROUTE.INFO,
    title: '基本信息',
  },
  {
    key: DASHBOARD_ROUTE.LAYOUT,
    title: '布局与样式',
  },
  {
    key: DASHBOARD_ROUTE.SEO,
    title: 'SEO 优化',
  },
  {
    key: DASHBOARD_ROUTE.POST,
    title: '社区内容管理',
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
