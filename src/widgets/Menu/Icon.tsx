import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TActive, TMenu } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Wrapper, ICONS } from './styles/icon'
import MENU from '@/constant/menu'

type TProps = {
  type: TMenu
} & TActive

const Icon: FC<TProps> = ({ type, $active }) => {
  const IconComp = ICONS[type] || ICONS.OTHER

  const primaryColor = usePrimaryColor()

  return (
    <Wrapper $active={$active} noSaturate={type === MENU.FEATURE || type === MENU.BUG}>
      {/* @ts-ignore */}
      <IconComp primaryColor={primaryColor} $active={$active} />
    </Wrapper>
  )
}

export default observer(Icon)
