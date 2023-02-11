import { FC } from 'react'

import type { TColorName } from '@/spec'

import { RightArrow, LeftArrow, UpArrow, DownArrow } from '../styles/arrow_button/arrow'

type TProps = {
  color: TColorName
  leftLayout: boolean
  linkColor: boolean

  up: boolean
  down: boolean
}

const Arrow: FC<TProps> = ({ color, leftLayout, linkColor, up, down }) => {
  if (!leftLayout) {
    if (down) return <DownArrow color={color} linkColor={linkColor} down />
    if (up) return <UpArrow color={color} linkColor={linkColor} up />

    return <RightArrow color={color} linkColor={linkColor} />
  }

  return <LeftArrow color={color} linkColor={linkColor} up={up} down={down} />
}

export default Arrow
