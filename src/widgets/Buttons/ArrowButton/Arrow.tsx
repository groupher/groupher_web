import { FC } from 'react'

import type { TColorName } from '@/spec'

import { RightArrow, LeftArrow } from '../styles/arrow_button/arrow'

type TProps = {
  color: TColorName
  leftLayout: boolean
  linkColor: boolean

  up: boolean
  down: boolean
}

const Arrow: FC<TProps> = ({ color, leftLayout, linkColor, up, down }) => {
  return leftLayout ? (
    <LeftArrow color={color} linkColor={linkColor} up={up} down={down} />
  ) : (
    <RightArrow color={color} linkColor={linkColor} up={up} down={down} />
  )
}

export default Arrow
