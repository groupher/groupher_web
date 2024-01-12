import { FC, useState } from 'react'

import Admins from './Admins'
import ContentCard from './ContentCard'

import { Wrapper, Notes, Highlight } from '../../styles/dashboard_intros/admins_tab'

const AdminsTab: FC = () => {
  const [userHover, setUserHover] = useState([false, true, false])

  return (
    <Wrapper>
      <Admins
        onHover={(hover) => {
          if (!hover[0] && !hover[1] && !hover[2]) return setUserHover([false, true, false])
          setUserHover(hover)
        }}
        userHover={userHover}
      />
      <ContentCard userHover={userHover} />
      <Notes>
        原子化的<Highlight>ABAC</Highlight>权限控制策略，灵活精确，符合直觉。
      </Notes>
    </Wrapper>
  )
}

export default AdminsTab
