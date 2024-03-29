/*
 *
 * Checker
 *
 */

import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSizeSM, TSpace } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import SIZE from '@/constant/size'
import { buildLog } from '@/logger'

import { Wrapper, IconWrapper, CheckIcon, ChildWrapper } from './styles'

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
  const primaryColor = usePrimaryColor()
  const show = checked || !hiddenMode

  return (
    <Wrapper
      show={show}
      $dimWhenIdle={dimWhenIdle}
      disabled={disabled}
      onClick={() => show && !disabled && onChange(!checked)}
      {...restProps}
    >
      <IconWrapper checked={checked} size={size} disabled={disabled} $color={primaryColor}>
        <CheckIcon checked={checked} size={size} disabled={disabled} $color={primaryColor} />
      </IconWrapper>
      <ChildWrapper checked={checked} size={size} disabled={disabled}>
        {children}
      </ChildWrapper>
    </Wrapper>
  )
}

export default observer(Checker)
