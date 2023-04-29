import { FC, memo, Fragment } from 'react'
import { keys } from 'ramda'

import type { TDashboardPath } from '@/spec'
import { Br } from '@/widgets/Common'
import useCurCommunity from '@/hooks/useCurCommunity'

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
  const community = useCurCommunity()

  return (
    <MobileWrapper>
      {groupKeys.map((key) => (
        <Fragment key={key}>
          <Group
            group={MENU[key] as TMenuGroup}
            curTab={curTab}
            touched={touched}
            community={community}
          />
          <Br top={30} />
        </Fragment>
      ))}
    </MobileWrapper>
  )
}

export default memo(SideMenu)
