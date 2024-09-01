import type { FC } from 'react'

import type { TColorName } from '~/spec'

import { RightArrow, LeftArrow, UpArrow, DownArrow } from '../salon/arrow_button/arrow'

type TProps = {
  color: TColorName
  leftLayout: boolean
  reverseColor: boolean

  up: boolean
  down: boolean
}

const Arrow: FC<TProps> = ({ color, leftLayout, reverseColor, up, down }) => {
  if (!leftLayout) {
    if (down) return <DownArrow color={color} $reverseColor={reverseColor} />
    if (up) return <UpArrow color={color} $reverseColor={reverseColor} />

    return <RightArrow color={color} $reverseColor={reverseColor} />
  }

  return <LeftArrow color={color} $reverseColor={reverseColor} $up={up} $down={down} />
}

export default Arrow
