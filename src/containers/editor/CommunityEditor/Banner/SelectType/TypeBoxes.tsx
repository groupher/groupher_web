import { FC, memo } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  Box,
  InnerBox,
  ColorMask,
  Header,
  MainText,
  CheckIcon,
  Icon,
} from '../../styles/banner/select_type/type_boxes'

import type { TCommunityType } from '../../spec'
import { COMMUNITY_TYPE } from '../../constant'
import { communityTypeOnChange } from '../../logic'

const BOX_TYPES = [
  {
    //
    type: COMMUNITY_TYPE.WEB,
    title: 'Web 应用',
    color: COLOR_NAME.PURPLE,
    icon: 'Browser',
  },
  {
    //
    type: COMMUNITY_TYPE.CLIENT,
    title: '客户端软件',
    color: COLOR_NAME.BLUE,
    icon: 'Hammer',
  },
  {
    //
    type: COMMUNITY_TYPE.HARDWARE,
    title: '硬件产品',
    color: COLOR_NAME.GREEN,
    icon: 'Robot',
  },
  {
    //
    type: COMMUNITY_TYPE.GAME,
    title: '独立游戏',
    color: COLOR_NAME.ORANGE,
    icon: 'Game',
  },
]

type TProps = {
  communityType: TCommunityType
}

const TypeBoxes: FC<TProps> = ({ communityType }) => {
  //
  return (
    <Wrapper>
      {BOX_TYPES.map((item) => {
        const $active = item.type === communityType
        const $color = item.color
        const IconComp = Icon[item.icon]

        return (
          <Box
            key={item.type}
            touched={!!communityType}
            $active={$active}
            onClick={() => communityTypeOnChange(item.type)}
          >
            <InnerBox $active={$active} $color={$color}>
              <Header>
                <IconComp $active={$active} $color={$color} />
                {$active && <CheckIcon $color={$color} />}
              </Header>
              <MainText>{item.title}</MainText>
              <SpaceGrow />
              <ColorMask $active={$active} $color={$color} />
            </InnerBox>
          </Box>
        )
      })}
    </Wrapper>
  )
}

export default memo(TypeBoxes)
