import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import type { TMetric, TGlowPosition } from '@/spec'

import useGlow from '@/hooks/useGlow'
import useMetric from '@/hooks/useMetric'

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
  const { glowType, glowFixed, glowOpacity } = useGlow()

  if (!glowType) return null

  return (
    <Wrapper
      glowType={glowType}
      glowPosition={getGlowPosition(metric, glowFixed)}
      glowOpacity={glowOpacity}
    />
  )
}

export default observer(GlowBackground)
