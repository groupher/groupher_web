import { FC, useEffect } from 'react'

import StatusBall from './StatusBall'

import type { TStep } from '../spec'
import { STEP } from '../constant'

import { Wrapper, Line, TadaIcon } from '../styles/header/step_map'
import { tada } from '../logic'

type TProps = {
  step: TStep
}

const StepMap: FC<TProps> = ({ step }) => {
  useEffect(() => {
    if (step === STEP.FINISHED) {
      tada()
    }
  }, [step])

  switch (step) {
    case STEP.SELECT_TYPE: {
      return (
        <Wrapper>
          <StatusBall doing />
          <Line />
          <StatusBall />
          <Line />
          <StatusBall />
          <Line />
          <StatusBall />
        </Wrapper>
      )
    }

    case STEP.SETUP_DOMAIN: {
      return (
        <Wrapper>
          <StatusBall done />
          <Line />
          <StatusBall doing />
          <Line />
          <StatusBall />
          <Line />
          <StatusBall />
        </Wrapper>
      )
    }

    case STEP.SETUP_INFO: {
      return (
        <Wrapper>
          <StatusBall done />
          <Line />
          <StatusBall done />
          <Line />
          <StatusBall doing />
          <Line />
          <StatusBall />
        </Wrapper>
      )
    }

    case STEP.SETUP_EXTRA: {
      return (
        <Wrapper>
          <StatusBall done />
          <Line />
          <StatusBall done />
          <Line />
          <StatusBall done />
          <Line />
          <StatusBall doing />
        </Wrapper>
      )
    }

    case STEP.FINISHED: {
      return (
        <Wrapper>
          <StatusBall done />
          <Line />
          <StatusBall done />
          <Line />
          <StatusBall done />
          <Line />
          <StatusBall done />
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
