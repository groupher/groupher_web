import { FC } from 'react'

import { Wrapper, Url, Title } from '../../styles/dashboard_intros/links_tab/header_card'

const HeaderCard: FC = () => {
  return (
    <Wrapper>
      <Url>https://motojie.com</Url>
      <Title>Motojie - (摩界)</Title>
    </Wrapper>
  )
}

export default HeaderCard
