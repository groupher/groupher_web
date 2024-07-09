import type { FC } from 'react'
import { reject } from 'ramda'

import type { TActive, TCommunityThread, TLinkItem } from '~/spec'
import { THREAD } from '~/const/thread'
import { HEADER_LAYOUT } from '~/const/layout'

import CustomHeaderLinks from '~/widgets/CustomHeaderLinks/HeaderTemplate'

import useHeader from '../../logic/useHeader'
import {
  Wrapper,
  LeftWrapper,
  BrandLogo,
  BrandText,
  LinkItem,
  RightWrapper,
  AccountIcon,
} from '../../styles/header/templates/right'

type TProps = {
  threads: TCommunityThread[]
  links: TLinkItem[]
} & TActive

const Right: FC<TProps> = ({ $active, threads, links }) => {
  const { edit } = useHeader()
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

        <CustomHeaderLinks links={links} />

        <AccountIcon />
      </RightWrapper>
    </Wrapper>
  )
}

export default Right
