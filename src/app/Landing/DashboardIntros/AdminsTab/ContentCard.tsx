import { FC } from 'react'

import PermissionItems from './PermissionItems'

import { Wrapper, FingerPrint, Bar } from '../../styles/dashboard_intros/admins_tab/content_card'

type TProps = {
  userHover: boolean[]
}

const ContentCard: FC<TProps> = ({ userHover }) => {
  return (
    <Wrapper>
      <Bar />
      <FingerPrint />
      <PermissionItems userHover={userHover} />
    </Wrapper>
  )
}

export default ContentCard
