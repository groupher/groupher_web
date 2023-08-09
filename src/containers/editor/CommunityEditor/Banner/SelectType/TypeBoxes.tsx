import { FC, memo } from 'react'

import Checker from '@/widgets/Checker'
import {
  Wrapper,
  Box,
  HeaderText,
  MainText,
  FooterText,
} from '../../styles/banner/select_type/type_boxes'

import type { TCommunityType } from '../../spec'
import { COMMUNITY_TYPE } from '../../constant'
import { communityTypeOnChange } from '../../logic'

type TProps = {
  communityType: TCommunityType
}

const TypeBoxes: FC<TProps> = ({ communityType }) => {
  const { PUBLIC, CITY, WORKS, TEAM } = COMMUNITY_TYPE

  return (
    <Wrapper>
      <Box active={communityType === PUBLIC} onClick={() => communityTypeOnChange(PUBLIC)}>
        <HeaderText>
          <div>免费</div>
          <Checker checked={communityType === PUBLIC} hiddenMode />
        </HeaderText>
        <MainText>互联网服务</MainText>
        <FooterText>已有 114 +</FooterText>
      </Box>
      <Box active={communityType === WORKS} onClick={() => communityTypeOnChange(WORKS)}>
        <HeaderText>
          <HeaderText>免费</HeaderText>
          <Checker checked={communityType === WORKS} hiddenMode />
        </HeaderText>
        <MainText>客户端软件</MainText>
        <FooterText>已有 12 +</FooterText>
      </Box>
      <Box active={communityType === TEAM} onClick={() => communityTypeOnChange(TEAM)}>
        <HeaderText>
          <HeaderText>免费</HeaderText>
          <Checker checked={communityType === TEAM} hiddenMode />
        </HeaderText>
        <MainText>硬件产品</MainText>
        <FooterText>已有 14 +</FooterText>
      </Box>
      <Box active={communityType === CITY} onClick={() => communityTypeOnChange(CITY)}>
        <HeaderText>
          <div>免费</div>
          <Checker checked={communityType === CITY} hiddenMode />
        </HeaderText>
        <MainText>独立游戏</MainText>
        <FooterText>已有 114 +</FooterText>
      </Box>
    </Wrapper>
  )
}

export default memo(TypeBoxes)
