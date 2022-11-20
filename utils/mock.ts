import type { TUser, TTag, TCommunity } from '@/spec'
import { SITE_LOGO, ICON, ICON_BASE } from '@/config'

import { COLOR_NAME } from '@/constant'
import { getRandomInt } from './helper'

const users = [
  {
    id: '1',
    avatar:
      'https://avatars.githubusercontent.com/u/3684889?s=88&u=bb5e8d9294af17219316997ff11d349755ac9740&v=4',
    nickname: 'neSpecc',
    login: 'neSpecc',
    bio: 'the codex core teamf',
  },
  {
    id: '2',
    avatar: 'https://avatars.githubusercontent.com/u/53274?s=64&v=4',
    nickname: 'scrogson',
    login: 'scrogson',
    bio: 'Software Engineer specializing in Erlang/Elixir/Rust',
  },
  {
    id: '3',
    avatar: 'https://avatars.githubusercontent.com/u/52195?s=64&v=4',
    nickname: 'mcollina',
    login: 'mcollina',
    bio: 'Technical Director @nearform, TSC member',
  },
  {
    id: '4',
    avatar: 'https://avatars.githubusercontent.com/u/665846?s=64&v=4',
    nickname: 'Alex Rodionov',
    login: 'Alex Rodionov',
    bio: 'Selenium Committer, Watir Core Team Developer',
  },
  {
    id: '5',
    avatar: 'https://avatars.githubusercontent.com/u/1361891?s=64&v=4',
    nickname: 'huan',
    login: 'huan',
    bio: 'Angel Investor, Serial Entrepreneur, Machine Learning PhD Student',
  },
  {
    id: '6',
    avatar: 'https://avatars.githubusercontent.com/u/70602?v=4',
    nickname: 'Joshua Gross',
    login: 'JoshuaGross',
    bio: 'React Native Core team @ Facebook',
  },
  {
    id: '7',
    avatar: 'https://avatars.githubusercontent.com/u/381213?s=64&v=4',
    nickname: 'philss',
    login: 'philss',
    bio: 'Software developer. Interested in Elixir and functional programming ',
  },

  //
  {
    id: '8',
    avatar:
      'https://avatars.githubusercontent.com/u/3684889?s=88&u=bb5e8d9294af17219316997ff11d349755ac9740&v=4',
    nickname: 'neSpecc',
    login: 'neSpecc2',
    bio: 'the codex core teamf',
  },
  {
    id: '9',
    avatar: 'https://avatars.githubusercontent.com/u/53274?s=64&v=4',
    nickname: 'scrogson',
    login: 'scrogson2',
    bio: 'Software Engineer specializing in Erlang/Elixir/Rust',
  },
  {
    id: '10',
    avatar: 'https://avatars.githubusercontent.com/u/52195?s=64&v=4',
    nickname: 'mcollina',
    login: 'mcollina2',
    bio: 'Technical Director @nearform, TSC member',
  },
  {
    id: '11',
    avatar: 'https://avatars.githubusercontent.com/u/665846?s=64&v=4',
    nickname: 'Alex Rodionov',
    login: 'Alex Rodionov2',
    bio: 'Selenium Committer, Watir Core Team Developer',
  },
  {
    id: '12',
    avatar: 'https://avatars.githubusercontent.com/u/1361891?s=64&v=4',
    nickname: 'huan',
    login: 'huan2',
    bio: 'Angel Investor, Serial Entrepreneur, Machine Learning PhD Student',
  },
  {
    id: '13',
    avatar: 'https://avatars.githubusercontent.com/u/70602?v=4',
    nickname: 'Joshua Gross',
    login: 'JoshuaGross2',
    bio: 'React Native Core team @ Facebook',
  },
  {
    id: '14',
    avatar: 'https://avatars.githubusercontent.com/u/381213?s=64&v=4',
    nickname: 'philss',
    login: 'philss2',
    bio: 'Software developer. Interested in Elixir and functional programming ',
  },
]

const tags = [
  {
    id: '7',
    raw: 'city',
    title: '城市',
    color: COLOR_NAME.PURPLE,
    group: 'Android',
  },
  {
    id: '8',
    raw: 'pantry',
    title: '茶水间',
    color: COLOR_NAME.PINK,
    group: 'Android',
  },
  {
    id: '9',
    raw: 'afterwork',
    title: '下班后',
    color: COLOR_NAME.PINK,
    group: 'Android',
  },
  {
    id: '10',
    index: 10,
    raw: 'WTF',
    title: '吐槽',
    color: COLOR_NAME.RED,
    group: 'iOS',
  },
  {
    id: '11',
    raw: 'REC',
    title: '推荐',
    color: COLOR_NAME.ORANGE,
    group: 'iOS',
  },
  {
    id: '12',
    raw: 'idea',
    title: '脑洞',
    color: COLOR_NAME.BROWN,
    group: 'iOS',
  },
  {
    id: '0',
    raw: 'help',
    title: '首页布局',
    color: COLOR_NAME.RED,
    group: 'web',
  },
  {
    id: '1',
    raw: 'tech',
    title: '账户登录',
    color: COLOR_NAME.ORANGE,
    group: 'web',
  },
  {
    id: '2',
    raw: 'maker',
    title: '创作者',
    color: COLOR_NAME.YELLOW,
    group: 'web',
  },
  {
    id: '3',
    raw: 'geek',
    title: '一般讨论',
    color: COLOR_NAME.GREEN,
    group: 'web',
  },
  {
    id: '4',
    raw: 'IxD',
    title: '新需求',
    color: COLOR_NAME.CYAN,
    group: 'web',
  },
  {
    id: '5',
    raw: 'DF',
    title: 'Bug 吐槽',
    color: COLOR_NAME.CYAN_LIGHT,
    group: 'web',
  },
  {
    id: '6',
    raw: 'thoughts',
    title: '想法',
    color: COLOR_NAME.BLUE,
    group: 'web',
  },
]

const communities = [
  {
    id: '0',
    title: 'Groupher',
    raw: 'home',
    desc: '可能是来为你心爱的产品建立一个反馈社区吧。',
    logo: SITE_LOGO,
  },
  {
    id: '1',
    title: '黑洞',
    raw: 'blackhole',
    desc: '吞噬一切不适合在本站出现的内容和账号',
    logo: `${ICON}/shape/blackhole.jpeg`,
  },
  {
    id: '2',
    title: 'React',
    raw: 'react',
    desc: '一个为数据提供渲染为HTML视图的开源JavaScript 库',
    logo: `${ICON_BASE}/framework/react.png`,
  },
  {
    id: '3',
    title: 'Elixir',
    raw: 'elixir',
    desc: 'Elixir 是一个基于 Erlang 虚拟机的函数式、面向并行的通用编程语言',
    logo: `${ICON_BASE}/pl/elixir.png`,
  },
  {
    id: '4',
    title: 'JavaScript',
    raw: 'javascript',
    desc: 'JavaScript is very cool',
    logo: `${ICON_BASE}/pl/javascript.png`,
  },
  {
    id: '5',
    title: 'Ruby',
    raw: 'ruby',
    desc: 'Ruby is very cool',
    logo: `${ICON_BASE}/pl/ruby.png`,
  },
  {
    id: '6',
    title: 'PHP',
    raw: 'php',
    desc: 'PHP is very cool',
    logo: `${ICON_BASE}/pl/php.png`,
  },
]

const images = [
  'https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80',
  'https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1484399172022-72a90b12e3c1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80',
  'https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1617419086540-518c5b847b88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
  'https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1617365564200-c6b079284290?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1617391765934-f7ac7aa648bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=642&q=80',
  'https://rmt.dogedoge.com/fetch/~/source/unsplash/photo-1611095973362-88e8e2557e58?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
]

export const mockImage = (): string => {
  return images[getRandomInt(0, 4)]
}

export const mockImages = (num: number): string[] => {
  return images.slice(0, Math.min(num, images.length - 1))
}

export const mockUsers = (num: number): TUser[] => {
  return users.slice(0, Math.min(num, users.length - 1))
}

export const mockTags = (num: number): TTag[] =>
  tags.slice(0, Math.min(num, tags.length))

const changelogTags = [
  {
    id: '13',
    raw: '1',
    title: '1 月',
    group: '2022',
  },
  {
    id: '14',
    raw: '2',
    title: '2 月',
    group: '2022',
  },
  {
    id: '15',
    raw: '3',
    title: '3 月',
    group: '2022',
  },
  {
    id: '16',
    raw: '4',
    title: '4 月',
    group: '2022',
  },
  {
    id: '17',
    raw: '5',
    title: '5 月',
    group: '2022',
  },
  {
    id: '18',
    raw: '6',
    title: '6 月',
    group: '2022',
  },
  {
    id: '0',
    raw: '1',
    title: '1 月',
    group: '2021',
  },
  {
    id: '1',
    raw: '2',
    title: '2 月',
    group: '2021',
  },
  {
    id: '2',
    raw: '3',
    title: '3 月',
    group: '2021',
  },
]

export const mockChangeTags = (num = 10): TTag[] => {
  return changelogTags.slice(0, Math.min(num, changelogTags.length))
}

export const mockCommunities = (num: number): TCommunity[] =>
  communities.slice(0, Math.min(num, communities.length))
