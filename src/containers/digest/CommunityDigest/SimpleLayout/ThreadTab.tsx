import { FC, memo } from 'react'
import { reject, find } from 'ramda'

import type { TCommunityThread, TLinkItem, TSpace, THeaderLayout } from '@/spec'
import { THREAD } from '@/constant/thread'
import { HEADER_LAYOUT } from '@/constant/layout'
import { MORE_GROUP } from '@/constant/dashboard'

import useCurCommunity from '@/hooks/useCurCommunity'
import useAccount from '@/hooks/useAccount'

import ExtraLinks from '@/widgets/ExtraLinks/SimpleLayout'

import { NormalWrapper, FloatWrapper, Title } from '../styles/simple_layout/thread_tab'

type TProps = {
  threads: TCommunityThread[]
  active: string
  extraLinks: TLinkItem[]
  headerLayout: THeaderLayout
} & TSpace

const ThreadTab: FC<TProps> = ({ active, threads, extraLinks, headerLayout, ...restProps }) => {
  const curCommunity = useCurCommunity()
  const { isModerator } = useAccount()

  const hasExtraLinks = extraLinks.length >= 2 && extraLinks[0].title !== ''
  const isAboutFold = hasExtraLinks

  const _threads =
    isAboutFold || isModerator
      ? reject((t: TCommunityThread) => t.slug === THREAD.ABOUT, threads)
      : threads

  const Wrapper = headerLayout === HEADER_LAYOUT.FLOAT ? FloatWrapper : NormalWrapper

  const hasExtraAbout = find((link) => link.title === '关于', extraLinks)

  const aboutLink = !hasExtraAbout
    ? {
        index: 999,
        title: '关于',
        group: MORE_GROUP,
        link: `/${curCommunity.slug}/about`,
      }
    : { title: '', index: 0 }

  const dashboardLink = {
    index: 1000,
    title: '控制台',
    group: MORE_GROUP,
    link: `/${curCommunity.slug}/dashboard`,
  }

  const _extraLinks = isModerator ? [...extraLinks, aboutLink, dashboardLink] : extraLinks

  return (
    <Wrapper {...restProps}>
      {_threads.map((item) => (
        <Title
          href={`/${curCommunity.slug}/${item.slug}`}
          key={item.slug}
          $active={active === item.slug}
          prefetch={false}
        >
          {item.title}
        </Title>
      ))}

      <ExtraLinks links={_extraLinks} />
    </Wrapper>
  )
}

export default memo(ThreadTab)
