import { type FC, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { keys } from 'ramda'

import type { TDashboardPath } from '@/spec'
import { Br } from '@/widgets/Common'

import { MENU } from '../constant'
import type { TMenuGroup } from '../spec'

import Group from './Group'

import { MobileWrapper } from '../styles/side_menu'

type TProps = {
  curTab?: TDashboardPath
}

const SideMenu: FC<TProps> = ({ curTab = '' }) => {
  const groupKeys = keys(MENU)

  return (
    <MobileWrapper>
      {groupKeys.map((key) => (
        <Fragment key={key}>
          <Group group={MENU[key] as TMenuGroup} curTab={curTab} />
          <Br top={30} />
        </Fragment>
      ))}
    </MobileWrapper>
  )
}

export default observer(SideMenu)
