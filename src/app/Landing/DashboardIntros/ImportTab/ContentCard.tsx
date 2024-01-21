import { FC } from 'react'

// import HeaderCard from './HeaderCard'
import Content from './Content'
// import FooterCard from './FooterCard'

import { Wrapper } from '../../styles/dashboard_intros/import_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      {/* <HeaderCard /> */}
      <Content />
      {/* <FooterCard /> */}
    </Wrapper>
  )
}

export default ContentCard
