import { FC, memo } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  Box,
  InnerBox,
  Header,
  MainText,
  CheckIcon,
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
        $active={communityType === WEB}
        onClick={() => communityTypeOnChange(WEB)}
      >
        <InnerBox $active={communityType === WEB} $color={COLOR_NAME.PURPLE}>
          <Header>
            <Icon.Browser />
            {communityType === WEB && <CheckIcon $color={COLOR_NAME.PURPLE} />}
          </Header>
          <MainText>Web 应用</MainText>
          <SpaceGrow />
        </InnerBox>
      </Box>
      <Box
        touched={!!communityType}
        $active={communityType === CLIENT}
        onClick={() => communityTypeOnChange(CLIENT)}
      >
        <InnerBox $active={communityType === CLIENT} $color={COLOR_NAME.BLUE}>
          <Header>
            <Icon.Hammer />
            {communityType === CLIENT && <CheckIcon $color={COLOR_NAME.BLUE} />}
          </Header>
          <MainText>客户端软件</MainText>
          <SpaceGrow />
        </InnerBox>
      </Box>
      <Box
        touched={!!communityType}
        $active={communityType === HARDWARE}
        onClick={() => communityTypeOnChange(HARDWARE)}
      >
        <InnerBox $active={communityType === HARDWARE} $color={COLOR_NAME.GREEN}>
          <Header>
            <Icon.Robot />
            {communityType === HARDWARE && <CheckIcon $color={COLOR_NAME.GREEN} />}
          </Header>
          <MainText>硬件产品</MainText>
          <SpaceGrow />
        </InnerBox>
      </Box>
      <Box
        touched={!!communityType}
        $active={communityType === GAME}
        onClick={() => communityTypeOnChange(GAME)}
      >
        <InnerBox $active={communityType === GAME} $color={COLOR_NAME.ORANGE}>
          <Header>
            <Icon.Game />
            {communityType === GAME && <CheckIcon $color={COLOR_NAME.ORANGE} />}
          </Header>
          <MainText>独立游戏</MainText>
          <SpaceGrow />
        </InnerBox>
      </Box>
    </Wrapper>
  )
}

export default memo(TypeBoxes)
