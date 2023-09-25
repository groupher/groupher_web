import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TActive, TMenu } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Wrapper, ICONS } from './styles/icon'

type TProps = {
  type: TMenu
} & TActive

const Icon: FC<TProps> = ({ type, $active }) => {
  const IconComp = ICONS[type] || ICONS.OTHER

  const primaryColor = usePrimaryColor()

  return (
    <Wrapper $active={$active}>
      <IconComp primaryColor={primaryColor} $active={$active} />
    </Wrapper>
  )
}

export default observer(Icon)
