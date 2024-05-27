/*
 *
 * Radio
 *
 */

import { type FC, memo } from 'react'

import type { TSizeSM, TSpace } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import SIZE from '@/const/size'

import { Wrapper, Label } from './styles/radio'

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
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper $testid="radio" {...restProps}>
      {items.map((item) => (
        <Label
          key={item.value}
          checked={item.key === activeKey}
          onClick={() => onChange?.(item)}
          dimOnActive={item.dimOnActive}
          size={size}
          $color={primaryColor}
        >
          {item.value}
        </Label>
      ))}
    </Wrapper>
  )
}

export default memo(Radio)
