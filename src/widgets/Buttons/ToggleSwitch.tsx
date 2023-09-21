import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TSizeSM } from '@/spec'
import SIZE from '@/constant/size'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { buildLog } from '@/logger'

import { Wrapper, Track, Indicator, CheckIcon } from './styles/toggle_switch'

const log = buildLog('w:ToggleSwitch')

type TProps = {
  size?: TSizeSM
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const ToggleSwitch: FC<TProps> = ({ size = SIZE.SMALL, checked = false, onChange = log }) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper onClick={() => onChange(!checked)} size={size}>
      <Track checked={checked} primaryColor={primaryColor}>
        <Indicator checked={checked} primaryColor={primaryColor}>
          <CheckIcon checked={checked} primaryColor={primaryColor} />
        </Indicator>
      </Track>
    </Wrapper>
  )
}

export default observer(ToggleSwitch)
