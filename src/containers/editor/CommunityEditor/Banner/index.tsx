/*
 *
 * Banner
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import SelectType from './SelectType'
import SetupDomain from './SetupDomain'
import SetupInfo from './SetupInfo'
import SetupExtra from './SetupExtra'
import Finished from './Finished'

import { Wrapper } from '../styles/banner'
import type {
  TStep,
  TSelectTypeStatus,
  TSetupDomainStatus,
  TSetupInfoStatus,
  TValidState,
  TSetupExtraStatus,
  TFinishedStatus,
} from '../spec'
import { STEP } from '../constant'

const _log = buildLog('C:CreateCommunityBanner')

type TProps = {
  step: TStep
  selectTypeStatus: TSelectTypeStatus
  setupDomainStatus: TSetupDomainStatus
  setupInfoStatus: TSetupInfoStatus
  setupExtraStatus: TSetupExtraStatus
  finishedStatus: TFinishedStatus
  validState: TValidState
}

const Banner: FC<TProps> = ({
  step,
  selectTypeStatus,
  setupDomainStatus,
  setupInfoStatus,
  setupExtraStatus,
  finishedStatus,
  validState,
}) => {
  let stepComp

  switch (step) {
    case STEP.SELECT_TYPE: {
      stepComp = <SelectType status={selectTypeStatus} validState={validState} />
      break
    }
    case STEP.SETUP_INFO: {
      stepComp = <SetupInfo status={setupInfoStatus} validState={validState} />
      break
    }
    case STEP.SETUP_EXTRA: {
      stepComp = <SetupExtra status={setupExtraStatus} validState={validState} />
      break
    }
    case STEP.FINISHED: {
      stepComp = <Finished status={finishedStatus} />
      break
    }
    default: {
      stepComp = <SetupDomain status={setupDomainStatus} validState={validState} />
      break
    }
  }

  return <Wrapper $testid="create-community-digest">{stepComp}</Wrapper>
}

export default memo(Banner)
