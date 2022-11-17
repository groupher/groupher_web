import { FC, memo } from 'react'
import { useTheme } from 'styled-components'

import type { TThemeMap } from '@/spec'
import { SIZE } from '@/constant'

import FlipNumbers from 'react-flip-numbers'

import type { TProps } from './index'
import { Wrapper } from './styles'
import { getFontSize } from './styles/metric'

const AnimatedCount: FC<TProps> = ({
  count = 0,
  size = SIZE.SMALL,
  active = false,
}) => {
  const numSize = getFontSize(size)
  const theme = useTheme() as TThemeMap

  return (
    <Wrapper $active={active} count={count}>
      <FlipNumbers
        height={numSize}
        width={numSize}
        color={theme.article.info}
        perspective={400}
        duration={1}
        numbers={String(count)}
        play
      />
    </Wrapper>
  )
}

export default memo(AnimatedCount)
