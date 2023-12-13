import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import THEME from '@/constant/theme'
import useTheme from '@/hooks/useTheme'

import type { TCardMetric } from './spec'
import { CARDS_METRICS } from './constant'
import DayCard from './DayCard'
import NightCard from './NightCard'

import { Wrapper, DivideColumn } from '../../styles/feature_wall/dark_mode/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  const { curTheme } = useTheme()

  if (curTheme === THEME.DAY) {
    return (
      <Wrapper>
        <DayCard hovering={hovering} metric={CARDS_METRICS[curTheme][THEME.DAY] as TCardMetric} />
        <DivideColumn $hovering={hovering} />
        <NightCard
          hovering={hovering}
          metric={CARDS_METRICS[curTheme][THEME.NIGHT] as TCardMetric}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <NightCard hovering={hovering} metric={CARDS_METRICS[curTheme][THEME.NIGHT] as TCardMetric} />
      <DayCard hovering={hovering} metric={CARDS_METRICS[curTheme][THEME.DAY] as TCardMetric} />
    </Wrapper>
  )
}

export default observer(Panel)
