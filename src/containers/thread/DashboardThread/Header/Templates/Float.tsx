import { FC } from 'react'
import { reject } from 'ramda'

import type { TActive, TCommunityThread, TLinkItem } from '@/spec'

import { THREAD } from '@/const/thread'
import { HEADER_LAYOUT } from '@/const/layout'

import CustomHeaderLinks from '@/widgets/CustomHeaderLinks/HeaderTemplate'

import {
  Wrapper,
  LeftWrapper,
  BrandLogo,
  BrandText,
  CenterWrapper,
  LinkItem,
  RightWrapper,
  AccountIcon,
} from '../../styles/header/templates/float'
import { edit } from '../../logic'

type TProps = {
  threads: TCommunityThread[]
  links: TLinkItem[]
} & TActive

const Float: FC<TProps> = ({ $active, threads, links }) => {
  const isAboutFold = links.length >= 2 && links[0].title !== ''
  const _threads = isAboutFold
    ? reject((t: TCommunityThread) => t.slug === THREAD.ABOUT, threads)
    : threads

  return (
    <Wrapper $active={$active} onClick={() => edit(HEADER_LAYOUT.FLOAT, 'headerLayout')}>
      <LeftWrapper>
        <BrandLogo />
        <BrandText>Groupher</BrandText>
      </LeftWrapper>
      <CenterWrapper>
        {_threads.map((thread: TCommunityThread) => (
          <LinkItem key={thread.slug}>{thread.title}</LinkItem>
        ))}

        <CustomHeaderLinks links={links} />
      </CenterWrapper>
      <RightWrapper>
        <AccountIcon />
      </RightWrapper>
    </Wrapper>
  )
}

export default Float
