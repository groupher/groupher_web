import { FC } from 'react'

import StatusBall from './StatusBall'

import type { TStep } from '../spec'
import { STEP } from '../constant'

import { Wrapper, Line, TadaIcon } from '../styles/header/step_map'

type TProps = {
  step: TStep
}

const StepMap: FC<TProps> = ({ step }) => {
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

    case STEP.FINISHED: {
      return (
        <Wrapper>
          <StatusBall done />
          <Line />
          <StatusBall done />
          <Line />
          <StatusBall done />
          <Line />
          <TadaIcon />
        </Wrapper>
      )
    }

    default: {
      return null
    }
  }
}

export default StepMap
