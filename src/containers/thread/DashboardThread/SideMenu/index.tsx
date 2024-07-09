import { keys } from 'ramda'

import Sticky from '~/widgets/Sticky'

import type { TMenuGroup } from '../spec'
import { MENU } from '../constant'

import Group from './Group'
import { Wrapper } from '../styles/side_menu'

export default () => {
  const groupKeys = keys(MENU)

  return (
    <Wrapper>
      <Sticky offsetTop={30}>
        {groupKeys.map((key) => (
          <Group key={key} group={MENU[key] as TMenuGroup} />
        ))}
      </Sticky>
    </Wrapper>
  )
}
