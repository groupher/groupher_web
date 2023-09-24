import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TSpace } from '@/spec'
import { HEADER_LAYOUT } from '@/constant/layout'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePublicThreads from '@/hooks/usePublicThreads'
import useHeaderLinks from '@/hooks/useHeaderLinks'
import useViewingThread from '@/hooks/useViewingThread'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import ExtraLinks from '@/widgets/ExtraLinks'

import { NormalWrapper, FloatWrapper, Title } from '../styles/header_layout/thread_tab'

type TProps = TSpace

const ThreadTab: FC<TProps> = ({ ...restProps }) => {
  const curCommunity = useViewingCommunity()
  const { layout: headerLayout, extraLinks } = useHeaderLinks()
  const threads = usePublicThreads()
  const activeThread = useViewingThread()
  const primaryColor = usePrimaryColor()

  const Wrapper = headerLayout === HEADER_LAYOUT.FLOAT ? FloatWrapper : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {threads.map((item) => (
        <Title
          href={`/${curCommunity.slug}/${item.slug}`}
          key={item.slug}
          $active={activeThread === item.slug}
          primaryColor={primaryColor}
        >
          {item.title}
        </Title>
      ))}

      <ExtraLinks links={extraLinks} activePath={activeThread} />
    </Wrapper>
  )
}

export default observer(ThreadTab)
