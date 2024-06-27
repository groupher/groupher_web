import type { FC } from 'react'

import THEME from '~/const/theme'
import useTheme from '~/hooks/useTheme'

import type { TCardMetric } from './spec'
import { CARDS_METRICS } from './constant'
import DayCard from './DayCard'
import NightCard from './NightCard'

import {
  Wrapper,
  DivideColumn,
  SwitchBox,
  ThemeBox,
  MoonIcon,
  MoonSolidIcon,
  SunIcon,
  SunSolidIcon,
} from '../../styles/feature_wall/dark_mode/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  const { theme } = useTheme()

  if (theme === THEME.DAY) {
    return (
      <Wrapper>
        <DayCard hovering={hovering} metric={CARDS_METRICS[theme][THEME.DAY] as TCardMetric} />
        <DivideColumn $hovering={hovering} />
        <SwitchBox $hovering={hovering}>
          <ThemeBox $active={!hovering}>{!hovering ? <SunSolidIcon /> : <SunIcon />}</ThemeBox>
          <ThemeBox $active={hovering}>
            <ThemeBox>{!hovering ? <MoonIcon /> : <MoonSolidIcon />}</ThemeBox>
          </ThemeBox>
        </SwitchBox>
        <NightCard hovering={hovering} metric={CARDS_METRICS[theme][THEME.NIGHT] as TCardMetric} />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <NightCard hovering={hovering} metric={CARDS_METRICS[theme][THEME.NIGHT] as TCardMetric} />
      <DayCard hovering={hovering} metric={CARDS_METRICS[theme][THEME.DAY] as TCardMetric} />
    </Wrapper>
  )
}

export default Panel
