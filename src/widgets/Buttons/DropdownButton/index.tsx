import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react'

import type { TActive, TSizeTS, TSpace } from '@/spec'
import SIZE from '@/constant/size'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { buildLog } from '@/logger'

import { Wrapper, ButtonWrapper, InnerBtnWrapper, FilterIcon } from '../styles/dropdown_button'

const log = buildLog('C:DropdownButton')

type TProps = {
  children: ReactNode
  size?: TSizeTS
  withBorder?: boolean
  onClick?: () => void
  noArrow?: boolean
  selected?: boolean
} & TSpace &
  TActive

const DropdownButton: FC<TProps> = ({
  children,
  size = SIZE.SMALL,
  withBorder = false,
  onClick = log,
  noArrow = false,
  $active = false,
  selected = false,
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper
      withBorder={withBorder}
      size={size}
      onClick={onClick}
      $active={$active}
      selected={selected}
      primaryColor={primaryColor}
      {...restProps}
    >
      <ButtonWrapper size="small" type="primary" ghost>
        <InnerBtnWrapper $active={$active} primaryColor={primaryColor}>
          <>{children}</>
          {!noArrow && (
            <FilterIcon $active={$active} selected={selected} primaryColor={primaryColor} />
          )}
        </InnerBtnWrapper>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default observer(DropdownButton)
