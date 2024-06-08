import { type FC, useEffect } from 'react'

import StatusBall from './StatusBall'

import type { TCommunityType, TStep } from '../spec'
import { STEP } from '../constant'

import { Wrapper, Line, TadaIcon } from '../styles/header/step_map'
import { tada } from '../logic'

type TProps = {
  step: TStep
  communityType: TCommunityType
}

const StepMap: FC<TProps> = ({ step, communityType }) => {
  useEffect(() => {
    if (step === STEP.FINISHED) {
      tada()
    }
  }, [step])

  switch (step) {
    case STEP.SELECT_TYPE: {
      return (
        <Wrapper>
          <StatusBall communityType={communityType} doing />
          <Line />
          <StatusBall communityType={communityType} />
          <Line />
          <StatusBall communityType={communityType} />
          <Line />
          <StatusBall communityType={communityType} />
        </Wrapper>
      )
    }

    case STEP.SETUP_DOMAIN: {
      return (
        <Wrapper>
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} doing />
          <Line />
          <StatusBall communityType={communityType} />
          <Line />
          <StatusBall communityType={communityType} />
        </Wrapper>
      )
    }

    case STEP.SETUP_INFO: {
      return (
        <Wrapper>
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} doing />
          <Line />
          <StatusBall communityType={communityType} />
        </Wrapper>
      )
    }

    case STEP.SETUP_EXTRA: {
      return (
        <Wrapper>
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} doing />
        </Wrapper>
      )
    }

    case STEP.FINISHED: {
      return (
        <Wrapper>
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} done />
          <Line />
          <StatusBall communityType={communityType} done />
          <Line />
          <TadaIcon onClick={() => tada()} />
        </Wrapper>
      )
    }

    default: {
      return null
    }
  }
}

export default StepMap
