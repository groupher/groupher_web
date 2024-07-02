import { useEffect } from 'react'

import StatusBall from './StatusBall'

import { STEP } from '../constant'

import { tada } from '../helper'
import useLogic from '../useLogic'
import { Wrapper, Line, TadaIcon } from '../styles/header/step_map'

export default () => {
  const { headerStatus } = useLogic()
  const { step, communityType } = headerStatus

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
