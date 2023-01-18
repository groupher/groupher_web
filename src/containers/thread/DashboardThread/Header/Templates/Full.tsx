import { FC } from 'react'

import type { TActive } from '@/spec'
import { FOOTER_LAYOUT } from '@/constant/layout'
import { DEME_SOCIALS } from '@/constant/social'

import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  LeftWrapper,
  BrandWrapper,
  BrandLogo,
  BrandText,
  Desc,
  CenterWrapper,
  LinkItem,
} from '../../styles/header/templates/full'
import { edit } from '../../logic'

type TProps = TActive

const Full: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper $active={$active} onClick={() => edit(FOOTER_LAYOUT.FULL, 'footerLayout')}>
      <LeftWrapper>
        <BrandWrapper>
          <BrandLogo />
          <BrandText>Groupher</BrandText>
        </BrandWrapper>
        <Desc>让你的产品聆听用户的声音</Desc>
        <SocialList top={20} left={-15} size="tiny" selected={DEME_SOCIALS} />
      </LeftWrapper>
      <CenterWrapper>
        <LinkItem>讨论</LinkItem>
        <LinkItem>看板</LinkItem>
        <LinkItem>更新日志</LinkItem>
        <LinkItem>帮助台</LinkItem>
        <LinkItem>关于</LinkItem>
      </CenterWrapper>
    </Wrapper>
  )
}

export default Full
