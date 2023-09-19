/*
 *
 * ErrorBox
 *
 */

import { FC } from 'react'

import { buildLog } from '@/utils/logger'
import { bond } from '@/mobx'

import useShortcut from '@/hooks/useShortcut'

import type { TStore } from './store'

import { SpaceGrow } from '@/widgets/Common'

import Details from './Details'

import { Wrapper, WarningIcon, ResetButton, LearnMoreButton, MoreLink } from './styles'
import { useInit, onClose } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ErrorBox')

type TProps = {
  errorBox?: TStore
}

const ErrorBoxContainer: FC<TProps> = ({ errorBox: store }) => {
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
      <WarningIcon />
      <Details
        type={type}
        timeoutError={timeoutError}
        graphqlType={graphqlType}
        changesetError={changesetErrorData}
        parseError={parseErrorData}
        customError={customErrorData}
      />
      <SpaceGrow />
      <LearnMoreButton>
        <MoreLink href="/">报告问题</MoreLink>
      </LearnMoreButton>
      <ResetButton onClick={() => onClose()}>关闭</ResetButton>
    </Wrapper>
  )
}

export default bond(ErrorBoxContainer, 'errorBox') as FC<TProps>
