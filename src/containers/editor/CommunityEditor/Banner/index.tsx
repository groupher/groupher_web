/*
 *
 * Banner
 *
 */

import SelectType from './SelectType'
import SetupDomain from './SetupDomain'
import SetupInfo from './SetupInfo'
import SetupExtra from './SetupExtra'
import Finished from './Finished'

import { STEP } from '../constant'

import useLogic from '../useLogic'
import { Wrapper } from '../styles/banner'

export default () => {
  const { step } = useLogic()

  let stepComp = null

  switch (step) {
    case STEP.SELECT_TYPE: {
      stepComp = <SelectType />
      break
    }
    case STEP.SETUP_INFO: {
      stepComp = <SetupInfo />
      break
    }

    case STEP.SETUP_EXTRA: {
      stepComp = <SetupExtra />
      break
    }
    case STEP.FINISHED: {
      stepComp = <Finished />
      break
    }
    default: {
      stepComp = <SetupDomain />
      break
    }
  }

  return <Wrapper $testid="create-community-digest">{stepComp}</Wrapper>
}
