import type { FC, ReactNode } from 'react'

import type { TSizeTSM, TSpace } from '~/spec'
import usePrimaryColor from '~/hooks/usePrimaryColor'
import SIZE from '~/const/size'

import LavaLampLoading from '~/widgets/Loading/LavaLampLoading'
import { Wrapper, RedWrapper, ChildrenWrapper } from './styles/button'

type TProps = {
  children?: ReactNode
  className?: string
  ghost?: boolean
  type?: 'primary' | 'red'
  space?: number | null
  size?: TSizeTSM
  onClick?: () => void
  loading?: boolean
  noBorder?: boolean
  disabled?: boolean
} & TSpace

const Button: FC<TProps> = ({
  children = 'button',
  ghost = false,
  type = 'primary',
  onClick = console.log,
  space = null,
  size = SIZE.MEDIUM,
  className = '',
  loading = false,
  noBorder = false,
  disabled = false,
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()

  if (loading) return <LavaLampLoading size="small" />

  switch (type) {
    case 'red': {
      return (
        <RedWrapper
          $ghost={ghost}
          onClick={onClick}
          size={size}
          className={className}
          $noBorder={noBorder}
          space={space}
          disabled={disabled}
          $color={primaryColor}
          {...restProps}
        >
          {children}
        </RedWrapper>
      )
    }
    default: {
      return (
        <Wrapper
          $ghost={ghost}
          onClick={() => !disabled && onClick()}
          size={size}
          className={className}
          space={space}
          $noBorder={noBorder}
          disabled={disabled}
          $color={primaryColor}
          {...restProps}
        >
          <ChildrenWrapper size={size} $ghost={ghost} $noBorder={noBorder}>
            {children}
          </ChildrenWrapper>
        </Wrapper>
      )
    }
  }
}

export default Button
