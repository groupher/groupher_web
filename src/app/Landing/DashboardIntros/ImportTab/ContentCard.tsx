import { FC } from 'react'

import HeaderCard from './HeaderCard'
import Content from './Content'
import FooterCard from './FooterCard'

import {
  Wrapper,
  CurveLineIcon1,
  CurveLineIcon2,
  CurveLineIcon3,
  CurveLineIcon4,
} from '../../styles/dashboard_intros/import_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <CurveLineIcon1 />
      <CurveLineIcon2 />
      <CurveLineIcon3 />
      <CurveLineIcon4 />

      <HeaderCard />
      <Content />
      <FooterCard />
    </Wrapper>
  )
}

export default ContentCard
