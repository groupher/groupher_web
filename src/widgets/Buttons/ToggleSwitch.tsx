import type { FC } from 'react'

import type { TSizeSM } from '~/spec'
import SIZE from '~/const/size'
import usePrimaryColor from '~/hooks/usePrimaryColor'

import { Wrapper, Track, Indicator, CheckIcon } from './styles/toggle_switch'

type TProps = {
  size?: TSizeSM
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const ToggleSwitch: FC<TProps> = ({
  size = SIZE.SMALL,
  checked = false,
  onChange = console.log,
}) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper onClick={() => onChange(!checked)} size={size}>
      <Track checked={checked} $color={primaryColor}>
        <Indicator checked={checked} $color={primaryColor}>
          <CheckIcon checked={checked} $color={primaryColor} />
        </Indicator>
      </Track>
    </Wrapper>
  )
}

export default ToggleSwitch
