import type { FC } from 'react'

import type { TSpace, TUser } from '~/spec'

import Img from '~/Img'
import useSalon from './salon/landing_page'

type TProps = {
  users: TUser[]
} & TSpace

const LandingPage: FC<TProps> = ({ users, ...spacing }) => {
  const s = useSalon({ ...spacing })

  return (
    <div className={s.wrapper}>
      {users.map((user) => (
        <Img key={user.login} src={user.avatar} className={s.avatar} />
      ))}
    </div>
  )
}

export default LandingPage
