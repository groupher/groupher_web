import { FC, memo } from 'react'

import SIZE from '@/constant/size'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import useTheme from '@/hooks/useTheme'

import FlipNumbers from 'react-flip-numbers'

import type { TProps } from '.'
import { Wrapper } from './styles'
import { getFontSize, getFlipNumOffset, getCountColor } from './styles/metric'

const AnimatedCount: FC<TProps> = ({ count = 0, size = SIZE.SMALL, $active = false }) => {
  const primaryColor = usePrimaryColor()
  const { themeMap } = useTheme()

  const numSize = getFontSize(size)
  const offset = getFlipNumOffset(size)

  const countColor = getCountColor($active, themeMap, primaryColor, count)

  return (
    <Wrapper key={countColor} $active={$active} $count={count}>
      <FlipNumbers
        height={numSize}
        width={numSize - offset}
        color={countColor}
        perspective={400}
        duration={0.8}
        numbers={String(count)}
        play
      />
    </Wrapper>
  )
}

export default memo(AnimatedCount)
