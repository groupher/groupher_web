import { FC } from 'react'

import Admins from './Admins'
import ContentCard from './ContentCard'

import { Wrapper, Notes, Highlight } from '../../styles/dashboard_intros/admins_tab'

const AdminsTab: FC = () => {
  return (
    <Wrapper>
      <Admins />
      <ContentCard />
      <Notes>
        基于<Highlight>ABAC</Highlight>的权限控制策略，更加灵活精确，符合直觉。
      </Notes>
    </Wrapper>
  )
}

export default AdminsTab
