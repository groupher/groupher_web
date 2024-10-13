import StatusBars from './StatusBars'

import {
  UserIcon,
  EmojiIcon,
  LaptopIcon,
  FingerPrintIcon,
  SearchIcon,
} from '../../styles/battery_bento/grid_blocks'

export const BLOCKS = [
  {
    key: 1,
    title: '内容管理',
    desc: '自带垃圾信息过滤机制，同时可自定义拉黑恶意账户，远离阴阳人、精神怪胎。',
    icon: <UserIcon />,
  },
  {
    key: 2,
    title: 'Emoji 反馈',
    desc: '帖子、更新日志等内容以及所有评论都支持 Emoji 表情，增加用户互动乐趣。',
    icon: <EmojiIcon />,
  },
  {
    key: 3,
    title: '全文搜索',
    desc: '基于业界领先的 Meilisearch，功能强大 & 快捷的全文搜索体验。',
    icon: <SearchIcon />,
  },
  {
    key: 4,
    title: '稳定可靠',
    desc: '托管于国内顶级云服务供应商，多重安全服务保驾护航。',
    icon: <StatusBars />,
  },
  {
    key: 5,
    title: 'SSO 集成',
    desc: '内置多种第三方登录选项，也可根据已有的账号系统集成 SSO 登入。',
    icon: <FingerPrintIcon />,
  },
  {
    key: 6,
    title: '开发者友好',
    desc: '完全开源，前后端分离架构，可基于平台 API 二次开发自定义需求。',
    icon: <LaptopIcon />,
  },
]

// key: inserval index
// value: highlight dot index
export const SHINE_DOTS = {
  0: ['1', '4', '5'],
  1: ['2', '3', '4'],
  2: ['3', '6'],
  3: ['1', '4'],
}
