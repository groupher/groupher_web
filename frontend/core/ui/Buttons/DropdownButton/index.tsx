import type { FC, ReactNode } from 'react'

import SIZE from '~/const/size'
import ArrowSVG from '~/icons/ArrowSimple'
import CloseSVG from '~/icons/CloseLight'
import type { TActive, TButtonPrefix, TSizeTS, TSpace } from '~/spec'

import useSalon from '../salon/dropdown_button'
import PrefixIcon from './PrefixIcon'

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
  withBorder: _withBorder = false,
  onClick = console.log,
  onClear = console.log,
  noArrow = false,
  $active = false,
  selected = false,
  closable = false,
  prefixIcon = null,
  ...spacing
}) => {
  const s = useSalon({ size, selected, active: $active, ...spacing })

  return (
    <div className={s.wrapper}>
      <button type='button' className={s.button} onClick={onClick}>
        <div className={s.inner}>
          <PrefixIcon type={prefixIcon} />
          {children}
          {!noArrow && !(closable && selected) && <ArrowSVG className={s.arrowIcon} />}
        </div>
      </button>
      {closable && selected && (
        <button type='button' aria-label='Clear selection' className={s.closeBox} onClick={onClear}>
          <CloseSVG className={s.closeIcon} />
        </button>
      )}
    </div>
  )
}

export default DropdownButton
