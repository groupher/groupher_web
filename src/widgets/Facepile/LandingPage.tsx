import type { FC } from 'react'

import type { TSpace, TUser } from '~/spec'

import { Wrapper, AvatarsImg } from './styles/landing_page'

type TProps = {
  users: TUser[]
} & TSpace

const LandingPage: FC<TProps> = ({ users, ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      {users.map((user) => (
        <AvatarsImg key={user.login} src={user.avatar} />
      ))}
    </Wrapper>
  )
}

export default LandingPage
