import { FC } from 'react'
import { reject } from 'ramda'

import type { TActive, TCommunityThread, TLinkItem } from '@/spec'
import { THREAD } from '@/constant/thread'
import { HEADER_LAYOUT } from '@/constant/layout'

import ExtraLinks from '@/widgets/ExtraLinks/HeaderTemplate'

import {
  Wrapper,
  LeftWrapper,
  BrandLogo,
  BrandText,
  LinkItem,
  RightWrapper,
  AccountIcon,
} from '../../styles/header/templates/right'
import { edit } from '../../logic'

type TProps = {
  threads: TCommunityThread[]
  links: TLinkItem[]
} & TActive

const Right: FC<TProps> = ({ $active, threads, links }) => {
  const isAboutFold = links.length >= 2 && links[0].title !== ''
  const _threads = isAboutFold
    ? reject((t: TCommunityThread) => t.slug === THREAD.ABOUT, threads)
    : threads

  return (
    <Wrapper $active={$active} onClick={() => edit(HEADER_LAYOUT.RIGHT, 'headerLayout')}>
      <LeftWrapper>
        <BrandLogo />
        <BrandText>Groupher</BrandText>
      </LeftWrapper>

      <RightWrapper>
        {_threads.map((thread: TCommunityThread) => (
          <LinkItem key={thread.slug}>{thread.title}</LinkItem>
        ))}

        <ExtraLinks links={links} />

        <AccountIcon />
      </RightWrapper>
    </Wrapper>
  )
}

export default Right
