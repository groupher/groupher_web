import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

import type { TActive, TSizeTS, TSpace } from '@/spec'
import SIZE from '@/const/size'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { buildLog } from '@/logger'

import {
  Wrapper,
  ButtonWrapper,
  InnerBtnWrapper,
  FilterIcon,
  CloseWrapper,
  CloseIcon,
} from '../styles/dropdown_button'

const log = buildLog('C:DropdownButton')

type TProps = {
  children: ReactNode
  size?: TSizeTS
  withBorder?: boolean
  onClick?: () => void
  onClear?: () => void
  noArrow?: boolean
  selected?: boolean
  closable?: boolean
} & TSpace &
  TActive

const DropdownButton: FC<TProps> = ({
  children,
  size = SIZE.SMALL,
  withBorder = false,
  onClick = log,
  onClear = log,
  noArrow = false,
  $active = false,
  selected = false,
  closable = false,
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper
      $withBorder={withBorder}
      size={size}
      onClick={onClick}
      $active={$active}
      selected={selected}
      $color={primaryColor}
      {...restProps}
    >
      <ButtonWrapper size="small" type="primary" ghost>
        <InnerBtnWrapper $active={$active} $color={primaryColor}>
          {children}
          {!noArrow && !(closable && selected) && (
            <FilterIcon $active={$active} selected={selected} $color={primaryColor} />
          )}

          {closable && selected && (
            <CloseWrapper
              onClick={(e) => {
                e.preventDefault()
                onClear()
              }}
            >
              <CloseIcon />
            </CloseWrapper>
          )}
        </InnerBtnWrapper>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default observer(DropdownButton)
