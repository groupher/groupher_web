import { FC } from 'react'
import { observer } from 'mobx-react'
import { reject, find } from 'ramda'

import type { TCommunityThread, TSpace } from '@/spec'
import { THREAD } from '@/constant/thread'
import { HEADER_LAYOUT } from '@/constant/layout'
import { MORE_GROUP } from '@/constant/dashboard'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePublicThreads from '@/hooks/usePublicThreads'
import useHeaderLinks from '@/hooks/useHeaderLinks'
import useAccount from '@/hooks/useAccount'
import useViewingThread from '@/hooks/useViewingThread'

import ExtraLinks from '@/widgets/ExtraLinks/SimpleLayout'

import { NormalWrapper, FloatWrapper, Title } from '../styles/simple_layout/thread_tab'

type TProps = TSpace

const ThreadTab: FC<TProps> = ({ ...restProps }) => {
  const curCommunity = useViewingCommunity()
  const { links: extraLinks, layout: headerLayout } = useHeaderLinks()
  const threads = usePublicThreads()
  const activeThread = useViewingThread()

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
          $active={activeThread === item.slug}
          prefetch={false}
        >
          {item.title}
        </Title>
      ))}

      <ExtraLinks links={_extraLinks} activePath={activeThread} />
    </Wrapper>
  )
}

export default observer(ThreadTab)
