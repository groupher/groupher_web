import { FC, memo } from 'react'

import type { TWallpaperGradientDir } from '@/spec'
import { GRADIENT_DIRECTION } from '@/constant'

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
import { changeDirection } from '../logic'

type TProps = {
  direction: TWallpaperGradientDir
}

const AnglePanel: FC<TProps> = ({ direction }) => {
  const { TOP, TOP_LEFT, TOP_RIGHT, LEFT, RIGHT, BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT } =
    GRADIENT_DIRECTION

  return (
    <Wrapper>
      <Top $active={direction === TOP} onClick={() => changeDirection(TOP)}>
        <ArrowIcon deg="-90deg" $active={direction === TOP} />
      </Top>
      <TopLeft $active={direction === TOP_LEFT} onClick={() => changeDirection(TOP_LEFT)}>
        <ArrowIcon deg="-135deg" $active={direction === TOP_LEFT} />
      </TopLeft>
      <TopRight $active={direction === TOP_RIGHT} onClick={() => changeDirection(TOP_RIGHT)}>
        <ArrowIcon deg="-45deg" $active={direction === TOP_RIGHT} />
      </TopRight>
      <Bottom $active={direction === BOTTOM} onClick={() => changeDirection(BOTTOM)}>
        <ArrowIcon deg="90deg" $active={direction === BOTTOM} />
      </Bottom>

      <BottomLeft $active={direction === BOTTOM_LEFT} onClick={() => changeDirection(BOTTOM_LEFT)}>
        <ArrowIcon deg="135deg" $active={direction === BOTTOM_LEFT} />
      </BottomLeft>

      <BottomRight
        $active={direction === BOTTOM_RIGHT}
        onClick={() => changeDirection(BOTTOM_RIGHT)}
      >
        <ArrowIcon deg="42deg" $active={direction === BOTTOM_RIGHT} />
      </BottomRight>

      <Left $active={direction === LEFT} onClick={() => changeDirection(LEFT)}>
        <ArrowIcon deg="-180deg" $active={direction === LEFT} />
      </Left>
      <Right $active={direction === RIGHT} onClick={() => changeDirection(RIGHT)}>
        <ArrowIcon deg="0" $active={direction === RIGHT} />
      </Right>
      <NeedleDot />
      <Needle direction={direction} />
    </Wrapper>
  )
}

export default memo(AnglePanel)
