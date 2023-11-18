import { FC, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { keys } from 'ramda'

import type { TDashboardPath } from '@/spec'
import { Br } from '@/widgets/Common'

import { MENU } from '../constant'
import type { TTouched, TMenuGroup } from '../spec'

import Group from './Group'

import { MobileWrapper } from '../styles/side_menu'

type TProps = {
  curTab?: TDashboardPath
  touched?: TTouched
}

const SideMenu: FC<TProps> = ({ curTab = '', touched = null }) => {
  const groupKeys = keys(MENU)

  return (
    <MobileWrapper>
      {groupKeys.map((key) => (
        <Fragment key={key}>
          <Group group={MENU[key] as TMenuGroup} curTab={curTab} touched={touched} />
          <Br top={30} />
        </Fragment>
      ))}
    </MobileWrapper>
  )
}

export default observer(SideMenu)
