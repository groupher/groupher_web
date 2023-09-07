import type { TCommunityType, TStep } from './spec'

export const STEP = {
  SELECT_TYPE: 'SELECT_TYPE',
  SETUP_DOMAIN: 'SETUP_DOMAIN',
  SETUP_INFO: 'SETUP_INFO',
  SETUP_EXTRA: 'SETUP_EXTRA',
  FINISHED: 'FINISHED',
} as Record<Uppercase<TStep>, Uppercase<TStep>>

export const COMMUNITY_TYPE = {
  WEB: 'WEB',
  CLIENT: 'CLIENT',
  HARDWARE: 'HARDWARE',
  GAME: 'GAME',
} as Record<Uppercase<TCommunityType>, Uppercase<TCommunityType>>

export const CITY_OPTIONS = [
  {
    label: '北京',
    value: 'beijing',
  },
  {
    label: '上海',
    value: 'shanghai',
  },
  {
    label: '杭州',
    value: 'hangzhou',
  },
  {
    label: '深圳',
    value: 'shenzheng',
  },
  {
    label: '广州',
    value: 'guangzhou',
  },
  {
    label: '苏州',
    value: 'suzhou',
  },
  {
    label: '成都',
    value: 'chengdu',
  },
  {
    label: '武汉',
    value: 'wuhan',
  },
  {
    label: '西安',
    value: 'xian',
  },
  {
    label: '海外',
    value: 'oversea',
  },
  {
    label: '其他',
    value: 'others',
  },
]

export const SOURCE_OPTIONS = [
  {
    label: '搜索引擎',
    value: 'seo',
  },
  {
    label: '微信群',
    value: 'wechat',
  },
  {
    label: 'Twitter',
    value: 'Twitter',
  },
  {
    label: '微博',
    value: 'weibo',
  },
  {
    label: '论坛',
    value: 'forum',
  },
  {
    label: '媒体报道',
    value: 'guangzhou',
  },
  {
    label: '小红书',
    value: 'xiaohongshu',
  },
  {
    label: '其他开发者/同事',
    value: 'otherdude',
  },
  {
    label: '其他',
    value: 'others',
  },
]
