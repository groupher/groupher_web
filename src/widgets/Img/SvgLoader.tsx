import { FC } from 'react'

import { ReactSVG } from 'react-svg'

type TProps = {
  src: string
  beforeInjection: (svg: HTMLElement) => void
  onClick: () => void
}

// @ts-ignore
export default (ReactSVG as FC<TProps>)
