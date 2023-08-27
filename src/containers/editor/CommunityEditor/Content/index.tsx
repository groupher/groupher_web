/*
 *
 * Content
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'

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

/* eslint-disable-next-line */
const log = buildLog('C:NewExploreContent')

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
  if (step === STEP.FINISHED) return null

  if (!validState.hasPendingApply && !validState.isLogin) {
    return null
  }

  if (validState.isLogin && validState.hasPendingApply) {
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
      stepComp = (
        <SetupInfo status={setupInfoStatus} communityType={selectTypeStatus.communityType} />
      )
      break
    }
  }

  return <Wrapper>{stepComp}</Wrapper>
}

export default memo(Content)
