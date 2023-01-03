import type { TSocialType } from '@/spec'

// dribbble
const SOCIAL_LIST = {
  HOMEPAGE: 'HOMEPAGE',
  GITHUB: 'GITHUB',
  WECHAT: 'WECHAT',
  TWITTER: 'TWITTER',
  ZHIHU: 'ZHIHU',
  BILIBILI: 'BILIBILI',
  WEIBO: 'WEIBO',
  BOSS: 'BOSS',
  LAGOU: 'LAGOU',
} as Record<Uppercase<TSocialType>, TSocialType>

export default SOCIAL_LIST
