import { FC } from 'react'
import { reject } from 'ramda'

import type { TActive, TCommunityThread, TLinkItem } from '@/spec'

import { THREAD } from '@/constant/thread'
import { HEADER_LAYOUT } from '@/constant/layout'

import ExtraLinks from './ExtraLinks'

import {
  Wrapper,
  LeftWrapper,
  BrandLogo,
  BrandText,
  CenterWrapper,
  LinkItem,
  RightWrapper,
  AccountIcon,
} from '../../styles/header/templates/center'
import { edit } from '../../logic'

type TProps = {
  threads: TCommunityThread[]
  links: TLinkItem[]
} & TActive

const Center: FC<TProps> = ({ $active, threads, links }) => {
  const isAboutFold = links.length >= 2 && links[0].title !== ''
  const _threads = isAboutFold
    ? reject((t: TCommunityThread) => t.raw === THREAD.ABOUT, threads)
    : threads

  return (
    <Wrapper $active={$active} onClick={() => edit(HEADER_LAYOUT.CENTER, 'headerLayout')}>
      <LeftWrapper>
        <BrandLogo />
        <BrandText>Groupher</BrandText>
      </LeftWrapper>
      <CenterWrapper>
        {_threads.map((thread: TCommunityThread) => (
          <LinkItem key={thread.raw}>{thread.title}</LinkItem>
        ))}

        <ExtraLinks links={links} />
      </CenterWrapper>
      <RightWrapper>
        <AccountIcon />
      </RightWrapper>
    </Wrapper>
  )
}

export default Center
