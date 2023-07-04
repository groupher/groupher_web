import { FC, memo } from 'react'

import EVENT from '@/constant/event'
import TYPE from '@/constant/type'

import { send } from '@/utils/signal'
import { Wrapper, SiteLink } from '../styles/main_entries'
import { MobileIcon } from '../styles/more_links'

export const openMobileNaviMenu = (): void => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.GLOBAL_MENU,
    options: { direction: 'top' },
  })
}

const MainEntries: FC = () => {
  return (
    <Wrapper onClick={openMobileNaviMenu}>
      {/* @ts-ignore */}
      <SiteLink as="span" testid="header-mobile">
        <MobileIcon />
      </SiteLink>
    </Wrapper>
  )
}

export default memo(MainEntries)
