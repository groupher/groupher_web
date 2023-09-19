/*
 *
 * Checker
 *
 */

import { FC, ReactNode, memo } from 'react'

import type { TSizeSM, TSpace } from '@/spec'
import SIZE from '@/constant/size'
import { buildLog } from '@/logger'

import { Wrapper, IconWrapper, CheckIcon, ChildWrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:Checker:index')

type TProps = {
  children?: ReactNode | null
  checked?: boolean
  hiddenMode?: boolean
  size?: TSizeSM
  dimWhenIdle?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
} & TSpace

const Checker: FC<TProps> = ({
  checked = false,
  onChange = log,
  hiddenMode = false,
  size = SIZE.MEDIUM,
  children = null,
  disabled = false,
  dimWhenIdle = false,
  ...restProps
}) => {
  const show = checked || !hiddenMode

  return (
    <Wrapper
      show={show}
      dimWhenIdle={dimWhenIdle}
      disabled={disabled}
      onClick={() => show && !disabled && onChange(!checked)}
      {...restProps}
    >
      <IconWrapper checked={checked} size={size} disabled={disabled}>
        <CheckIcon checked={checked} size={size} disabled={disabled} />
      </IconWrapper>
      <ChildWrapper checked={checked} size={size} disabled={disabled}>
        {children}
      </ChildWrapper>
    </Wrapper>
  )
}

export default memo(Checker)
