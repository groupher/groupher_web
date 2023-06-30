import { FC, memo } from 'react'
import { keys } from 'ramda'

import type { TCommunity, TDashboardPath } from '@/spec'
import Sticky from '@/widgets/Sticky'

import { MENU } from '../constant'
import type { TTouched, TMenuGroup } from '../spec'

import Group from './Group'

import { Wrapper } from '../styles/side_menu'

type TProps = {
  curTab?: TDashboardPath
  touched?: TTouched
  community: TCommunity
}

const SideMenu: FC<TProps> = ({ curTab = '', touched = null, community }) => {
  const groupKeys = keys(MENU)

  return (
    <Wrapper>
      <Sticky offsetTop={30}>
        {groupKeys.map((key) => {
          return (
            <Group
              key={key}
              community={community}
              group={MENU[key] as TMenuGroup}
              curTab={curTab}
              touched={touched}
            />
          )
        })}
      </Sticky>
    </Wrapper>
  )
}

export default memo(SideMenu)
