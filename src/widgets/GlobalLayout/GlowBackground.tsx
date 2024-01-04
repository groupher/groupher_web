import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import type { TMetric, TGlowPosition } from '@/spec'

import useGlowLight from '@/hooks/useGlowLight'
import useMetric from '@/hooks/useMetric'
import useTheme from '@/hooks/useTheme'

import METRIC from '@/constant/metric'

import { Wrapper } from './styles/glow_background'

const getGlowPosition = (metric: TMetric, glowFixed: boolean): TGlowPosition => {
  if (metric === METRIC.HOME) {
    return 'absolute'
  }

  return glowFixed ? 'fixed' : 'absolute'
}

const GlowBackground: FC = () => {
  const metric = useMetric()
  const { curTheme } = useTheme()
  const { glowType, glowFixed, glowOpacity } = useGlowLight()

  if (!glowType) return null

  return (
    <Wrapper
      glowType={glowType}
      glowPosition={getGlowPosition(metric, glowFixed)}
      glowOpacity={glowOpacity}
      $curTheme={curTheme}
    />
  )
}

export default observer(GlowBackground)
