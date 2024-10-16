/*
 * EmojiSelector
 */

import { type FC, memo } from 'react'

import type { TSimpleUser, TEmotionType } from '~/spec'
import { cutRest } from '~/fmt'

import EmotionIcon from './EmotionIcon'

import { Wrapper, UsersWrapper, Units, Username } from '../styles/selected_emotions/users_panel'

type TProps = {
  name: TEmotionType
  count: number
  users: TSimpleUser[]
}

const UsersPanel: FC<TProps> = ({ name, count, users }) => {
  const showUnit = users.length > count

  return (
    <Wrapper>
      <UsersWrapper>
        {users.slice(0, 5).map((u, index) => (
          <Username key={u.login}>
            {cutRest(u.nickname, 12)}
            {users.length - 1 !== index ? ',' : ''}
          </Username>
        ))}
        {showUnit && <Units>等 {count} 人</Units>}
      </UsersWrapper>{' '}
      <EmotionIcon name={name} />
    </Wrapper>
  )
}

export default memo(UsersPanel)
