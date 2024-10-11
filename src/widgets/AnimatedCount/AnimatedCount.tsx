import type { FC } from 'react'

import SIZE from '~/const/size'

import FlipNumbers from 'react-flip-numbers'

import type { TProps } from '.'
import { getFontSize, getFlipNumOffset } from './styles/metric'

import useSalon from './styles'

const AnimatedCount: FC<TProps> = ({ count = 0, size = SIZE.SMALL, active = false }) => {
  const s = useSalon({ count, active })

  const numSize = getFontSize(size)
  const offset = getFlipNumOffset(size)

  return (
    <div className={s.wrapper}>
      <FlipNumbers
        height={numSize}
        width={numSize - offset}
        color="inherit"
        perspective={400}
        duration={0.4}
        numbers={String(count)}
        play
      />
    </div>
  )
}

export default AnimatedCount
