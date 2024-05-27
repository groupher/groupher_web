/*
 *
 * CheckLabel
 *
 */

import { type FC, memo } from 'react'

import type { TActive, TSpace } from '@/spec'

import { Wrapper, CheckIcon, Title } from './styles'

type TProps = {
  testid?: string
  title?: string
} & TActive &
  TSpace

const CheckLabel: FC<TProps> = ({
  testid = 'check-label',
  title = '--',
  $active = true,
  ...restProps
}) => {
  return (
    <Wrapper $testid={testid} {...restProps}>
      <CheckIcon $active={$active} />
      <Title $active={$active}>{title}</Title>
    </Wrapper>
  )
}

export default memo(CheckLabel)
