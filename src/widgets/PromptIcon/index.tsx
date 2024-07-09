/*
 *
 * PromptIcon
 *
 */

import { type FC, memo } from 'react'

import PlanetDriver from './PlanetDriver'

type TProps = {
  type?: 'planet-driver' | 'others'
  className?: string
}

const PromptIcon: FC<TProps> = ({ type = 'planet-driver', className = 'promotIcon-class' }) => {
  switch (type) {
    case 'planet-driver':
      return <PlanetDriver className={className} />

    default:
      return <h3>other pics</h3>
  }
}

export default memo(PromptIcon)
