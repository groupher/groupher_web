/*
 *
 * HeadsUp
 *
 */

import { type FC, memo, type ReactNode } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import { WarningWrapper, DangerWrapper, IconBox, InfoIcon, DangerIcon } from './styles'

const _log = buildLog('c:HeadsUp:index')

type TProps = {
  type?: 'warning' | 'danger'
  children?: ReactNode
} & TSpace

const HeadsUp: FC<TProps> = ({ type = 'warning', children, ...restProps }) => {
  const Wrapper = type === 'danger' ? DangerWrapper : WarningWrapper
  return (
    <Wrapper {...restProps}>
      <IconBox>{type === 'danger' ? <DangerIcon /> : <InfoIcon />}</IconBox>
      {children}
    </Wrapper>
  )
}

export default memo(HeadsUp)
