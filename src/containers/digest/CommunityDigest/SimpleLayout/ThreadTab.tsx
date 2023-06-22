import { FC, memo } from 'react'
import { reject } from 'ramda'

import type { TCommunityThread, TLinkItem, TSpace } from '@/spec'
import { THREAD } from '@/constant/thread'

import ExtraLinks from '@/widgets/ExtraLinks/SimpleLayout'

import { Wrapper, Title } from '../styles/simple_layout/thread_tab'

type TProps = {
  threads: TCommunityThread[]
  active: string
  extraLinks: TLinkItem[]
} & TSpace

const ThreadTab: FC<TProps> = ({ active, threads, extraLinks, ...restProps }) => {
  const isAboutFold = extraLinks.length >= 2 && extraLinks[0].title !== ''
  const _threads = isAboutFold
    ? reject((t: TCommunityThread) => t.raw === THREAD.ABOUT, threads)
    : threads

  return (
    <Wrapper {...restProps}>
      {_threads.map((item) => (
        <Title
          href={`/home/${item.raw}`}
          key={item.raw}
          $active={active === item.raw}
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
