/*
 *
 * Radio
 *
 */

import type { FC } from 'react'

import type { TSizeSM, TSpace } from '~/spec'
import SIZE from '~/const/size'

import useSalon, { cn } from './styles/radio'

type TItem = {
  value: string
  key: string | boolean
  dimOnActive?: boolean
}

type TProps = {
  items: TItem[]
  activeKey: string | boolean
  size?: TSizeSM
  onChange?: (item: TItem) => void
} & TSpace

const Radio: FC<TProps> = ({
  items,
  activeKey,
  size = SIZE.MEDIUM,
  onChange = console.log,
  ...spacing
}) => {
  const s = useSalon({ ...spacing })

  return (
    <div className={s.wrapper} data-testid="radio">
      {items.map((item) => {
        const active = item.key === activeKey

        return (
          <label
            key={item.value}
            className={cn(s.label, active && s.labelChecked)}
            onClick={() => onChange?.(item)}
          >
            <div className={cn(s.circle, active && s.checked)} />
            {item.value}
          </label>
        )
      })}
    </div>
  )
}

export default Radio
