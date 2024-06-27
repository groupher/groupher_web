/*
 *
 * ErrorBox
 *
 */

import type { FC } from 'react'

import useShortcut from '~/hooks/useShortcut'
import { SpaceGrow } from '~/widgets/Common'

import { useStore } from './store'
import Details from './Details'

import {
  Wrapper,
  IconWrapper,
  WarningIcon,
  ResetButton,
  LearnMoreButton,
  MoreLink,
  ButtonGroup,
} from './styles'
import { useInit, onClose } from './logic'

const ErrorBox: FC = () => {
  const store = useStore()
  useInit(store)
  useShortcut(['Control+c', 'Control+g', 'Escape'], onClose)

  const {
    show,
    type,
    // operation,
    // path,
    timeoutError,
    graphqlType,
    changesetErrorData,
    parseErrorData,
    customErrorData,
  } = store

  if (!show) return null

  return (
    <Wrapper>
      <IconWrapper>
        <WarningIcon />
      </IconWrapper>
      <Details
        type={type}
        timeoutError={timeoutError}
        graphqlType={graphqlType}
        changesetError={changesetErrorData}
        parseError={parseErrorData}
        customError={customErrorData}
      />
      <SpaceGrow />
      <ButtonGroup>
        <LearnMoreButton>
          <MoreLink href="/feedback">报告问题</MoreLink>
        </LearnMoreButton>
        <ResetButton onClick={() => onClose()}>关闭</ResetButton>
      </ButtonGroup>
    </Wrapper>
  )
}

export default ErrorBox
