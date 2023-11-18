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
}

const SideMenu: FC<TProps> = ({ curTab = '', touched = null }) => {
  const groupKeys = keys(MENU)

  return (
    <Wrapper>
      <Sticky offsetTop={30}>
        {groupKeys.map((key) => (
          <Group key={key} group={MENU[key] as TMenuGroup} curTab={curTab} touched={touched} />
        ))}
      </Sticky>
    </Wrapper>
  )
}

export default memo(SideMenu)
