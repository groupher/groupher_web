/*
 *
 * Content
 *
 */

import { type FC, memo } from 'react'

import useAccount from '~/hooks/useAccount'

import SelectType from './SelectType'
import SetupDomain from './SetupDomain'
import SetupInfo from './SetupInfo'

import type {
  TStep,
  TValidState,
  TSelectTypeStatus,
  TSetupDomainStatus,
  TSetupInfoStatus,
} from '../spec'
import { STEP } from '../constant'

import { Wrapper } from '../styles/content'

type TProps = {
  step: TStep
  validState: TValidState
  selectTypeStatus: TSelectTypeStatus
  setupDomainStatus: TSetupDomainStatus
  setupInfoStatus: TSetupInfoStatus
}

const Content: FC<TProps> = ({
  step,
  validState,
  selectTypeStatus,
  setupDomainStatus,
  setupInfoStatus,
}) => {
  const { isLogin } = useAccount()
  if (step === STEP.FINISHED) return null

  if (!validState.hasPendingApply && !isLogin) {
    return null
  }

  if (isLogin && validState.hasPendingApply) {
    return null
  }

  let stepComp

  switch (step) {
    case STEP.SELECT_TYPE: {
      stepComp = <SelectType status={selectTypeStatus} />
      break
    }
    case STEP.SETUP_DOMAIN: {
      stepComp = <SetupDomain status={setupDomainStatus} />
      break
    }
    case STEP.SETUP_EXTRA: {
      stepComp = null
      break
    }
    default: {
      stepComp = <SetupInfo status={setupInfoStatus} />
      break
    }
  }

  return <Wrapper>{stepComp}</Wrapper>
}

export default memo(Content)
