import { mockUsers } from '~/mock'

import Facepile from '~/widgets/Facepile/LandingPage'

import useSalon from '../styles/tech_stacks/teams'

export default () => {
  const s = useSalon()

  const users = mockUsers(5)

  return (
    <div className={s.wrapper}>
      <div className={s.title}>开发团队</div>

      <Facepile users={users} className="gap-x-2 opacity-80" />
    </div>
  )
}
