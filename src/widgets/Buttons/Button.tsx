import type { FC, ReactNode } from 'react'

import type { TColorName, TSizeTSM, TSpace } from '~/spec'
import SIZE from '~/const/size'

import LavaLampLoading from '~/widgets/Loading/LavaLampLoading'
import useSalon, { cn } from './salon/button'

type TProps = {
  children?: ReactNode
  className?: string
  ghost?: boolean
  type?: 'primary' | 'red'
  width?: string
  space?: number | null
  size?: TSizeTSM
  onClick?: () => void
  loading?: boolean
  noBorder?: boolean
  disabled?: boolean
  noLeftRouned?: boolean
  color?: TColorName | null
} & TSpace

const Button: FC<TProps> = ({
  children = 'button',
  ghost = false,
  type = 'primary',
  width = 'w-full',
  onClick = console.log,
  space = null,
  size = SIZE.MEDIUM,
  className = '',
  loading = false,
  noBorder = false,
  disabled = false,
  noLeftRouned = false,
  color = null,
  ...spacing
}) => {
  const s = useSalon({
    type,
    width,
    ghost,
    space,
    size,
    noBorder,
    disabled,
    loading,
    noLeftRouned,
    color,
    ...spacing,
  })

  const isRed = type === 'red'

  return (
    <button className={cn(s.wrapper, className)} onClick={() => !disabled && onClick()}>
      <div className={cn(s.inner, isRed && s.innerRed)}>
        {loading && <LavaLampLoading size="small" />}
        {!loading && <div className={s.children}>{children}</div>}
      </div>
    </button>
  )
}

export default Button
