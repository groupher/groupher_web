import { FC } from 'react'

import type { TColorName } from '@/spec'

import { RightArrow, LeftArrow } from '../styles/arrow_button/arrow'

type TProps = {
  color: TColorName
  leftLayout: boolean
  linkColor: boolean
}

const Arrow: FC<TProps> = ({ color, leftLayout, linkColor }) => {
  return leftLayout ? (
    <LeftArrow color={color} linkColor={linkColor} />
  ) : (
    <RightArrow color={color} linkColor={linkColor} />
  )
}

export default Arrow
