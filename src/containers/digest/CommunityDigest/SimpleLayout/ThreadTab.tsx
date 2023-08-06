import { FC, memo } from 'react'
import { reject } from 'ramda'

import type { TCommunityThread, TLinkItem, TSpace, THeaderLayout } from '@/spec'
import { THREAD } from '@/constant/thread'
import { HEADER_LAYOUT } from '@/constant/layout'

import ExtraLinks from '@/widgets/ExtraLinks/SimpleLayout'

import { NormalWrapper, FloatWrapper, Title } from '../styles/simple_layout/thread_tab'

type TProps = {
  threads: TCommunityThread[]
  active: string
  extraLinks: TLinkItem[]
  headerLayout: THeaderLayout
} & TSpace

const ThreadTab: FC<TProps> = ({ active, threads, extraLinks, headerLayout, ...restProps }) => {
  const isAboutFold = extraLinks.length >= 2 && extraLinks[0].title !== ''
  const _threads = isAboutFold
    ? reject((t: TCommunityThread) => t.slug === THREAD.ABOUT, threads)
    : threads

  const Wrapper = headerLayout === HEADER_LAYOUT.FLOAT ? FloatWrapper : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {_threads.map((item) => (
        <Title
          href={`/home/${item.slug}`}
          key={item.slug}
          $active={active === item.slug}
          prefetch={false}
        >
          {item.title}
        </Title>
      ))}

      <ExtraLinks links={extraLinks} />
    </Wrapper>
  )
}

export default memo(ThreadTab)
