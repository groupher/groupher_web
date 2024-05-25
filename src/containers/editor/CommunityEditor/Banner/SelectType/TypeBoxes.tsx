import { FC, memo } from 'react'

import useTheme from '@/hooks/useTheme'
import THEME from '@/const/theme'
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
import { COMMUNITY_CATS } from '../../constant'
import { communityTypeOnChange } from '../../logic'

type TProps = {
  communityType: TCommunityType
}

const TypeBoxes: FC<TProps> = ({ communityType }) => {
  const { theme } = useTheme()

  return (
    <Wrapper key={theme}>
      {COMMUNITY_CATS.map((item, index) => {
        const $active = item.type === communityType
        const $color = item.color
        const IconComp = Icon[item.icon]

        return (
          <Box
            key={item.type}
            touched={!!communityType}
            $active={$active}
            $angle={index % 2 === 0 ? -2 : 2}
            $withBorder={theme === THEME.NIGHT}
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
