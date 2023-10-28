import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TSpace } from '@/spec'
import { HEADER_LAYOUT } from '@/constant/layout'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePublicThreads from '@/hooks/usePublicThreads'
import useHeaderLinks from '@/hooks/useHeaderLinks'
import useViewingThread from '@/hooks/useViewingThread'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import CustomHeaderLinks from '@/widgets/CustomHeaderLinks'

import { NormalWrapper, FloatWrapper, Title } from '../styles/header_layout/thread_tab'

type TProps = TSpace

const ThreadTab: FC<TProps> = ({ ...restProps }) => {
  const curCommunity = useViewingCommunity()
  const { layout: headerLayout, customLinks } = useHeaderLinks()
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
          $color={primaryColor}
        >
          {item.title}
        </Title>
      ))}

      <CustomHeaderLinks links={customLinks} activePath={activeThread} />
    </Wrapper>
  )
}

export default observer(ThreadTab)
