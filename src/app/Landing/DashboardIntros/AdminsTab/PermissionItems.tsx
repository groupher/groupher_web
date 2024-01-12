import { FC } from 'react'
import { includes } from 'ramda'

import { LIST, ACTIVE_ITMES } from './constant'
import {
  Wrapper,
  Item,
  HolderItem,
  HolderBar,
  CheckIcon,
  Title,
} from '../../styles/dashboard_intros/admins_tab/permision_items'

type TProps = {
  userHover: boolean[]
}

const getActiveItemKeys = (userHover: boolean[]) => {
  const [user1, user2, user3] = userHover
  if (!user1 && !user2 && !user3) return []

  if (user1) return ACTIVE_ITMES.user1
  if (user2) return ACTIVE_ITMES.user2

  return ACTIVE_ITMES.user3
}

const PermissionItems: FC<TProps> = ({ userHover }) => {
  const activeKeys = getActiveItemKeys(userHover)

  return (
    <Wrapper>
      {LIST.map((item) => {
        const { key, title } = item
        const wider = key % 2 === 0
        const active = includes(key, activeKeys)

        if (key > 10) {
          return (
            <HolderItem key={key} $wider={wider} $active={active}>
              <CheckIcon $active={active} />
              <HolderBar />
            </HolderItem>
          )
        }

        return (
          <Item key={key} $active={active} $wider={wider}>
            <CheckIcon $active={active} />
            <Title>{title}</Title>
          </Item>
        )
      })}
    </Wrapper>
  )
}

export default PermissionItems
