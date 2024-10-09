import type { FC } from 'react'

import type { TSpace, TUser } from '~/spec'

import Img from '~/Img'
import useSalon, { cn } from './salon/landing_page'

type TProps = {
  users: TUser[]
  className?: string
} & TSpace

const LandingPage: FC<TProps> = ({ users, className = '', ...spacing }) => {
  const s = useSalon({ ...spacing })

  return (
    <div className={cn(s.wrapper, className)}>
      {users.map((user) => (
        <Img key={user.login} src={user.avatar} className={s.avatar} />
      ))}
    </div>
  )
}

export default LandingPage
