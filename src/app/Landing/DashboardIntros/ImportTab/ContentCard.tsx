import { FC } from 'react'

import HeaderCard from './HeaderCard'
import Content from './Content'
import FooterCard from './FooterCard'

import {
  Wrapper,
  BgBubble,
  LeftBgBubble,
  RightBgBubble,
  Bot,
  LineIcon,
  LineIcon2,
  CurveLineIcon1,
  CurveLineIcon2,
  CurveLineIcon3,
  CurveLineIcon4,
} from '../../styles/dashboard_intros/import_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <Bot top={230} left={50}>
        Bot
      </Bot>
      <Bot top={230} right={60}>
        AI
      </Bot>
      <LeftBgBubble />
      <RightBgBubble />
      <BgBubble />
      <LineIcon />
      <LineIcon2 />
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
