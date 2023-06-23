import type { TSocialType } from '@/spec'

// dribbble
export const SOCIAL_LIST = {
  HOMEPAGE: 'HOMEPAGE',
  EMAIL: 'EMAIL',
  GITHUB: 'GITHUB',
  WECHAT: 'WECHAT',
  TWITTER: 'TWITTER',
  ZHIHU: 'ZHIHU',
  BILIBILI: 'BILIBILI',
  WEIBO: 'WEIBO',
  BOSS: 'BOSS',
  LAGOU: 'LAGOU',
} as Record<Uppercase<TSocialType>, TSocialType>

export const DEME_SOCIALS = [
  {
    type: SOCIAL_LIST.GITHUB,
    link: 'https://github.com',
  },
  {
    type: SOCIAL_LIST.WECHAT,
    link: 'https://twitter.com',
  },
  {
    type: SOCIAL_LIST.ZHIHU,
    link: 'https://zhipin.com',
  },
]
