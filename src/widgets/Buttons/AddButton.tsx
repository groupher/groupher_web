/*
 *
 * ArrowButtons
 *
 */

import { type FC, memo, type ReactNode } from 'react'

import type { TSpace } from '~/spec'

import { Wrapper, PlusIcon, EditIcon, Text } from './styles/add_button'

type TProps = {
  children?: ReactNode
  onClick?: () => void
  dimWhenIdle?: boolean
  disabled?: boolean
  withIcon?: boolean
  icon?: 'adder' | 'edit'
} & TSpace

const AddButton: FC<TProps> = ({
  children = '添加',
  onClick = console.log,
  dimWhenIdle = false,
  disabled = false,
  withIcon = true,
  icon = 'adder',
  ...restProps
}) => {
  return (
    <Wrapper
      onClick={() => !disabled && onClick()}
      $dimWhenIdle={dimWhenIdle}
      disabled={disabled}
      {...restProps}
    >
      {withIcon && icon === 'adder' && <PlusIcon />}
      {withIcon && icon === 'edit' && <EditIcon />}
      <Text>{children}</Text>
    </Wrapper>
  )
}

export default memo(AddButton)
