import { FC, memo } from 'react'

import {
  Wrapper,
  Box,
  HeaderText,
  MainText,
  FooterText,
  TheChecker,
} from '../../styles/banner/select_type/type_boxes'

import type { TCommunityType } from '../../spec'
import { COMMUNITY_TYPE } from '../../constant'
import { communityTypeOnChange } from '../../logic'

type TProps = {
  communityType: TCommunityType
}

const TypeBoxes: FC<TProps> = ({ communityType }) => {
  const { WEB, CLIENT, HARDWARE, GAME } = COMMUNITY_TYPE

  return (
    <Wrapper>
      <Box
        touched={!!communityType}
        active={communityType === WEB}
        onClick={() => communityTypeOnChange(WEB)}
      >
        <HeaderText>
          <div>免费</div>
          <TheChecker checked={communityType === WEB} hiddenMode />
        </HeaderText>
        <MainText>Web 应用</MainText>
        <FooterText>已有 114 +</FooterText>
      </Box>
      <Box
        touched={!!communityType}
        active={communityType === CLIENT}
        onClick={() => communityTypeOnChange(CLIENT)}
      >
        <HeaderText>
          <HeaderText>免费</HeaderText>
          <TheChecker checked={communityType === CLIENT} hiddenMode />
        </HeaderText>
        <MainText>客户端软件</MainText>
        <FooterText>已有 12 +</FooterText>
      </Box>
      <Box
        touched={!!communityType}
        active={communityType === HARDWARE}
        onClick={() => communityTypeOnChange(HARDWARE)}
      >
        <HeaderText>
          <HeaderText>免费</HeaderText>
          <TheChecker checked={communityType === HARDWARE} hiddenMode />
        </HeaderText>
        <MainText>硬件产品</MainText>
        <FooterText>已有 14 +</FooterText>
      </Box>
      <Box
        touched={!!communityType}
        active={communityType === GAME}
        onClick={() => communityTypeOnChange(GAME)}
      >
        <HeaderText>
          <div>免费</div>
          <TheChecker checked={communityType === GAME} hiddenMode />
        </HeaderText>
        <MainText>独立游戏</MainText>
        <FooterText>已有 114 +</FooterText>
      </Box>
    </Wrapper>
  )
}

export default memo(TypeBoxes)
