import { type FC, Fragment } from 'react'
import { keys } from 'ramda'

import { Br } from '@/widgets/Common'

import { MENU } from '../constant'
import type { TMenuGroup } from '../spec'

import Group from './Group'

import { MobileWrapper } from '../styles/side_menu'

const SideMenu: FC = () => {
  const groupKeys = keys(MENU)

  return (
    <MobileWrapper>
      {groupKeys.map((key) => (
        <Fragment key={key}>
          <Group group={MENU[key] as TMenuGroup} />
          <Br top={30} />
        </Fragment>
      ))}
    </MobileWrapper>
  )
}

export default SideMenu
