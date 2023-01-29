import { FC } from 'react'
import { Parallax } from 'react-scroll-parallax'

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
  return (
    <Wrapper>
      <CurveLine1 />
      <CurveLine2 />
      <CurveLine3 />
      <CurveLine4 />
      <Parallax speed={4} opacity={[1, 0.7]}>
        <ShapeCross1Icon />
        <ShapeCross2Icon />
        <ShapeCircleIcon />
        <ShapeCircle2Icon />
        <ShapeSquareIcon />
        <ShapeSquare2Icon />
        <ShapeCircleHalfIcon />
        <TwoLineIcon />
      </Parallax>
    </Wrapper>
  )
}

export default BgShapes
