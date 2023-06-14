import { FC } from 'react'

import type { TActive } from '@/spec'
import { HEADER_LAYOUT } from '@/constant/layout'

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

type TProps = TActive

const Right: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper $active={$active} onClick={() => edit(HEADER_LAYOUT.RIGHT, 'headerLayout')}>
      <LeftWrapper>
        <BrandLogo />
        <BrandText>Groupher</BrandText>
      </LeftWrapper>

      <RightWrapper>
        <LinkItem>讨论</LinkItem>
        <LinkItem>看板</LinkItem>
        <LinkItem>更新日志</LinkItem>
        <LinkItem>帮助台</LinkItem>
        <LinkItem>关于</LinkItem>
        <AccountIcon />
      </RightWrapper>
    </Wrapper>
  )
}

export default Right
