import { ICON_BASE } from '@/config'
import { HCN } from '@/constant/name'

const COMMUNITY_INTRO = {
  PUBLIC: {
    title: '什么是互联网服务?',
    desc: '你的产品主要通过浏览器 web 端为用户提供服务，如网站，H5 页面等。',
    threads: ['讨论', '看板', '更新日志', '帮助台', '关于'],
    demos: [
      {
        title: 'javascript',
        slug: 'JavaScript',
        logo: `${ICON_BASE}/pl/javascript.png`,
      },
      {
        title: 'React',
        slug: 'react',
        logo: `${ICON_BASE}/framework/react.png`,
      },
      {
        title: 'Phoenix',
        slug: 'phoneix',
        logo: `${ICON_BASE}/framework/phoenix.png`,
      },
      {
        title: 'Elixir',
        slug: 'elixir',
        logo: `${ICON_BASE}/pl/elixir.png`,
      },
      {
        title: 'Nim',
        slug: 'Nim',
        logo: `${ICON_BASE}/pl/nim.png`,
      },
    ],
  },
  WORKS: {
    title: '什么是客户端软件?',
    desc: '包括但不限于各行业 PC / Mac 端生产力工具，手机 APP 等。',
    threads: ['讨论', '看板', '更新日志', '帮助台', '关于'],
    demos: [
      {
        title: 'Groupher',
        slug: HCN,
        logo: '',
      },
    ],
  },
  TEAM: {
    title: '什么是硬件产品',
    desc: '各类机器人，无人机及其类似可玩性较强的硬件类及工业类产品。',
    threads: ['讨论', '看板', '更新日志', '帮助台', '关于'],
    demos: [
      {
        title: 'CP-feedback',
        slug: HCN,
      },
    ],
  },
  CITY: {
    title: '什么是独立游戏',
    desc: '个人或小团队开发的平台或手机游戏，Indie Game Rocks!',
    threads: ['讨论', '看板', '更新日志', '帮助台', '关于'],
    demos: [
      {
        title: '北京',
        slug: 'beijing',
        logo: `${ICON_BASE}/city/beijing.svg`,
      },
      {
        title: '上海',
        slug: 'shanghai',
        logo: `${ICON_BASE}/city/shanghai.svg`,
      },
      {
        title: '杭州',
        slug: 'hangzhou',
        logo: `${ICON_BASE}/city/hangzhou.svg`,
      },
      {
        title: '深圳',
        slug: 'shenzhen',
        logo: `${ICON_BASE}/city/shenzhen.svg`,
      },

      {
        title: '成都',
        slug: 'chengdu',
        logo: `${ICON_BASE}/city/chengdu.svg`,
      },
    ],
  },
}

export default COMMUNITY_INTRO
