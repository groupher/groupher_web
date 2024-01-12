import { FC } from 'react'
import { useParallax } from 'react-scroll-parallax'

import {
  Wrapper,
  CommunityName,
  Desc,
  FingerPrint,
} from '../../styles/dashboard_intros/admins_tab/content_card'

const ContentCard: FC = () => {
  const { ref } = useParallax<HTMLDivElement>({ speed: 3 })

  return (
    <Wrapper ref={ref}>
      <CommunityName>漫长的 APP</CommunityName>
      <Desc>社区管理员 / 志愿者权限详情</Desc>
      <FingerPrint />
    </Wrapper>
  )
}

export default ContentCard
