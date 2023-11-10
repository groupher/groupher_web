import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import {
  Wrapper,
  CurveLine1,
  CurveLine2,
  CurveLine3,
  CurveLine4,
  ShapeCross1Icon,
  ShapeCross2Icon,
  ShapeCircleIcon,
  ShapeCircle2Icon,
  ShapeSquareIcon,
  ShapeSquare2Icon,
  ShapeCircleHalfIcon,
  TwoLineIcon,
} from '../styles/enjoy_dev/bg_shapes'

const BgShapes: FC = () => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper>
      <CurveLine1 />
      <CurveLine2 />
      <CurveLine3 />
      <CurveLine4 />
      <ShapeCross1Icon />
      <ShapeCross2Icon />
      <ShapeCircleIcon />
      <ShapeCircle2Icon />
      <ShapeSquareIcon />
      <ShapeSquare2Icon />
      <ShapeCircleHalfIcon />
      <TwoLineIcon />
    </Wrapper>
  )
}

export default BgShapes
