import type { FC } from 'react'

import type { TSpace } from '@/spec'
import { HEADER_LAYOUT } from '@/const/layout'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePublicThreads from '@/hooks/usePublicThreads'
import useHeaderLinks from '@/hooks/useHeaderLinks'
import useViewingThread from '@/hooks/useViewingThread'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import CustomHeaderLinks from '@/widgets/CustomHeaderLinks'

import { NormalWrapper, FloatWrapper, Title } from '../styles/header_layout/thread_tab'

type TProps = TSpace

const ThreadTab: FC<TProps> = ({ ...restProps }) => {
  const community = useViewingCommunity()
  const { layout, customLinks } = useHeaderLinks()
  const threads = usePublicThreads()
  const activeThread = useViewingThread()
  const primaryColor = usePrimaryColor()

  const Wrapper = layout === HEADER_LAYOUT.FLOAT ? FloatWrapper : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {threads.map((item) => (
        <Title
          key={item.slug}
          href={`/${community.slug}/${item.slug}`}
          $active={activeThread === item.slug}
          $color={primaryColor}
        >
          {item.title}
        </Title>
      ))}

      <CustomHeaderLinks links={customLinks} activePath={activeThread} />
    </Wrapper>
  )
}

export default ThreadTab
