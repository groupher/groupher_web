import {
  UserIcon,
  EmojiIcon,
  LaptopIcon,
  CloudIcon,
  FingerPrintIcon,
  SearchIcon,
} from '../../styles/feature_wall/grid_blocks'

export const BLOCKS = [
  {
    key: 1,
    title: '用户管理',
    desc: '自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人、精神怪胎。',
    icon: <UserIcon />,
  },
  {
    key: 2,
    title: 'Emoji 反馈',
    desc: '自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人',
    icon: <EmojiIcon />,
  },
  {
    key: 3,
    title: '全文搜索',
    desc: '自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人',
    icon: <SearchIcon />,
  },
  {
    key: 4,
    title: '稳定可靠',
    desc: '自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人',
    icon: <CloudIcon />,
  },
  {
    key: 5,
    title: 'SSO 集成',
    desc: '自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人',
    icon: <FingerPrintIcon />,
  },
  {
    key: 6,
    title: '开发者友好',
    desc: '自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人',
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
