/*
 *
 * EnterHint
 *
 */

import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import { Wrapper, EnterIcon, Text } from './styles'

const _log = buildLog('w:EnterHint:index')

type TProps = {
  testid?: string
} & TSpace

const EnterHint: FC<TProps> = ({ testid = 'enter-hint', ...restProps }) => {
  return (
    <Wrapper $testid={testid} {...restProps}>
      <EnterIcon />
      <Text>回车确认</Text>
    </Wrapper>
  )
}

export default memo(EnterHint)
