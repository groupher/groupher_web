import { FC, memo } from 'react'

import type { TThemeName, TThemeMap, TColorName } from '@/spec'
import SIZE from '@/constant/size'
import { COLOR_NAME } from '@/constant/colors'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import useTheme from '@/hooks/useTheme'

import FlipNumbers from 'react-flip-numbers'

import type { TProps } from '.'
import { Wrapper } from './styles'
import { getFontSize, getFlipNumOffset } from './styles/metric'

const getCountColor = (active: boolean, themeMap: TThemeMap, primaryColor: TColorName): string => {
  if (primaryColor === COLOR_NAME.BLACK) {
    return themeMap.blackActive
  }

  return active ? themeMap.rainbow[primaryColor.toLowerCase()] : themeMap.article.digest
}

const AnimatedCount: FC<TProps> = ({ count = 0, size = SIZE.SMALL, $active = false }) => {
  const primaryColor = usePrimaryColor()
  const { themeMap } = useTheme()

  const numSize = getFontSize(size)
  const offset = getFlipNumOffset(size)

  const countColor = getCountColor($active, themeMap, primaryColor)

  return (
    <Wrapper $active={$active} count={count} key={countColor}>
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
