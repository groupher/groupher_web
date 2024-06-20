import { GRADIENT_DIRECTION } from '@/const/wallpaper'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import useLogic from '../useLogic'
import {
  Wrapper,
  Top,
  TopLeft,
  TopRight,
  Bottom,
  BottomLeft,
  BottomRight,
  Left,
  Right,
  NeedleDot,
  Needle,
  ArrowIcon,
} from '../styles/build_in/angle_panel'

export default () => {
  const { getWallpaper, changeDirection } = useLogic()
  const { direction } = getWallpaper()

  const primaryColor = usePrimaryColor()

  const { TOP, TOP_LEFT, TOP_RIGHT, LEFT, RIGHT, BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT } =
    GRADIENT_DIRECTION

  return (
    <Wrapper>
      <Top $active={direction === TOP} $color={primaryColor} onClick={() => changeDirection(TOP)}>
        <ArrowIcon deg="-90deg" $active={direction === TOP} />
      </Top>
      <TopLeft
        $active={direction === TOP_LEFT}
        $color={primaryColor}
        onClick={() => changeDirection(TOP_LEFT)}
      >
        <ArrowIcon deg="-135deg" $active={direction === TOP_LEFT} />
      </TopLeft>
      <TopRight
        $active={direction === TOP_RIGHT}
        $color={primaryColor}
        onClick={() => changeDirection(TOP_RIGHT)}
      >
        <ArrowIcon deg="-45deg" $active={direction === TOP_RIGHT} />
      </TopRight>
      <Bottom
        $active={direction === BOTTOM}
        $color={primaryColor}
        onClick={() => changeDirection(BOTTOM)}
      >
        <ArrowIcon deg="90deg" $active={direction === BOTTOM} />
      </Bottom>

      <BottomLeft
        $active={direction === BOTTOM_LEFT}
        $color={primaryColor}
        onClick={() => changeDirection(BOTTOM_LEFT)}
      >
        <ArrowIcon deg="135deg" $active={direction === BOTTOM_LEFT} />
      </BottomLeft>

      <BottomRight
        $active={direction === BOTTOM_RIGHT}
        onClick={() => changeDirection(BOTTOM_RIGHT)}
        $color={primaryColor}
      >
        <ArrowIcon deg="42deg" $active={direction === BOTTOM_RIGHT} />
      </BottomRight>

      <Left
        $active={direction === LEFT}
        $color={primaryColor}
        onClick={() => changeDirection(LEFT)}
      >
        <ArrowIcon deg="-180deg" $active={direction === LEFT} />
      </Left>
      <Right
        $active={direction === RIGHT}
        $color={primaryColor}
        onClick={() => changeDirection(RIGHT)}
      >
        <ArrowIcon deg="0" $active={direction === RIGHT} />
      </Right>
      <NeedleDot />
      <Needle direction={direction} />
    </Wrapper>
  )
}
