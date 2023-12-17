/*
 *
 * NoteTip
 *
 */

import { FC, memo, ReactNode } from 'react'

import type { TSpace, TTooltipPlacement } from '@/spec'
import { buildLog } from '@/logger'

import Tooltip from '@/widgets/Tooltip'

import { Wrapper, InfoIcon, Note } from './styles'

const _log = buildLog('c:NoteTip:index')

type TProps = {
  fontSize?: number
  children?: ReactNode
  offset?: [number, number]
  placement?: TTooltipPlacement
} & TSpace

const NoteTip: FC<TProps> = ({
  fontSize = 13,
  children = 'note tip',
  offset = [-5, -5],
  placement = 'bottom',
  ...restProps
}) => {
  return (
    <Wrapper fontSize={fontSize} {...restProps}>
      <Tooltip placement={placement} content={<Note>{children}</Note>} offset={offset} noPadding>
        <InfoIcon fontSize={fontSize} />
      </Tooltip>
    </Wrapper>
  )
}

export default memo(NoteTip)
