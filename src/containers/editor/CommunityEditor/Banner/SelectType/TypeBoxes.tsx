import { FC, memo } from 'react'

import {
  Wrapper,
  Box,
  Header,
  MainText,
  FooterText,
  TheChecker,
  Icon,
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
        <Header>
          <Icon.Browser />
          <TheChecker checked={communityType === WEB} hiddenMode />
        </Header>
        <MainText>Web 应用</MainText>
        <FooterText>已有 114 +</FooterText>
      </Box>
      <Box
        touched={!!communityType}
        active={communityType === CLIENT}
        onClick={() => communityTypeOnChange(CLIENT)}
      >
        <Header>
          <Icon.Hammer />
          <TheChecker checked={communityType === CLIENT} hiddenMode />
        </Header>
        <MainText>客户端软件</MainText>
        <FooterText>已有 12 +</FooterText>
      </Box>
      <Box
        touched={!!communityType}
        active={communityType === HARDWARE}
        onClick={() => communityTypeOnChange(HARDWARE)}
      >
        <Header>
          <Icon.Robot />
          <TheChecker checked={communityType === HARDWARE} hiddenMode />
        </Header>
        <MainText>硬件产品</MainText>
        <FooterText>已有 14 +</FooterText>
      </Box>
      <Box
        touched={!!communityType}
        active={communityType === GAME}
        onClick={() => communityTypeOnChange(GAME)}
      >
        <Header>
          <Icon.Game />
          <TheChecker checked={communityType === GAME} hiddenMode />
        </Header>
        <MainText>独立游戏</MainText>
        <FooterText>已有 114 +</FooterText>
      </Box>
    </Wrapper>
  )
}

export default memo(TypeBoxes)
