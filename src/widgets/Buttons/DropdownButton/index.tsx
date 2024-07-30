import type { FC, ReactNode } from 'react'

import type { TActive, TSizeTS, TSpace, TButtonPrefix } from '~/spec'
import SIZE from '~/const/size'
import usePrimaryColor from '~/hooks/usePrimaryColor'

import PrefixIcon from './PrefixIcon'

import {
  Wrapper,
  ButtonWrapper,
  InnerBtnWrapper,
  FilterIcon,
  CloseWrapper,
  CloseIcon,
} from '../styles/dropdown_button'

type TProps = {
  children: ReactNode
  size?: TSizeTS
  withBorder?: boolean
  onClick?: () => void
  onClear?: () => void
  noArrow?: boolean
  selected?: boolean
  closable?: boolean
  prefixIcon?: TButtonPrefix
} & TSpace &
  TActive

const DropdownButton: FC<TProps> = ({
  children,
  size = SIZE.SMALL,
  withBorder = false,
  onClick = console.log,
  onClear = console.log,
  noArrow = false,
  $active = false,
  selected = false,
  closable = false,
  prefixIcon = null,
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
          {/* <CategoryIcon /> */}
          {/* <SortIcon /> */}
          <PrefixIcon type={prefixIcon} />
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

export default DropdownButton
