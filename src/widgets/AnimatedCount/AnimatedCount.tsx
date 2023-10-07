import { FC, memo } from 'react'

import SIZE from '@/constant/size'
import useTheme from '@/hooks/useTheme'

import FlipNumbers from 'react-flip-numbers'

import type { TProps } from '.'
import { Wrapper } from './styles'
import { getFontSize, getFlipNumOffset } from './styles/metric'

const AnimatedCount: FC<TProps> = ({
  count = 0,
  size = SIZE.SMALL,
  active = false,
  color = '',
}) => {
  const numSize = getFontSize(size)
  const offset = getFlipNumOffset(size)
  const { themeMap } = useTheme()

  return (
    <Wrapper $active={active} count={count}>
      <FlipNumbers
        height={numSize}
        width={numSize - offset}
        color={color || themeMap.article.info}
        perspective={400}
        duration={0.8}
        numbers={String(count)}
        play
      />
    </Wrapper>
  )
}

export default memo(AnimatedCount)
