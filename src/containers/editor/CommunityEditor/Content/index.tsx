/*
 *
 * Content
 *
 */

import useAccount from '~/hooks/useAccount'

import SelectType from './SelectType'
import SetupDomain from './SetupDomain'
import SetupInfo from './SetupInfo'

import { STEP } from '../constant'

import useLogic from '../useLogic'
import { Wrapper } from '../styles/content'

export default () => {
  const { isLogin } = useAccount()
  const { step, validState } = useLogic()

  if (step === STEP.FINISHED) return null

  if (!validState.hasPendingApply && !isLogin) {
    return null
  }

  if (isLogin && validState.hasPendingApply) {
    return null
  }

  let stepComp = null

  switch (step) {
    case STEP.SELECT_TYPE: {
      stepComp = <SelectType />
      break
    }
    case STEP.SETUP_DOMAIN: {
      stepComp = <SetupDomain />
      break
    }
    case STEP.SETUP_EXTRA: {
      stepComp = null
      break
    }
    default: {
      stepComp = <SetupInfo />
      break
    }
  }

  return <Wrapper>{stepComp}</Wrapper>
}
