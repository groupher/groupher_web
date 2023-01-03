import type { TSocialType } from '@/spec'

// dribbble
const SOCIAL_LIST = {
  HOMEPAGE: 'homepage',
  GITHUB: 'github',
  WECHAT: 'wechat',
  TWITTER: 'twitter',
  ZHIHU: 'zhihu',
  BILIBILI: 'bilibili',
  WEIBO: 'weibo',
  BOSS: 'boss',
  LAGOU: 'lagou',
} as Record<Uppercase<TSocialType>, TSocialType>

export default SOCIAL_LIST
