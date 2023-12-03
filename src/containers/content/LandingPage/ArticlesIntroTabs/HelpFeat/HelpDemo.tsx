import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  Sidebar,
  PinnedItem,
  BookIcon,
  QuestionIcon,
  Content,
  Footer,
  LeftArrowIcon,
  RightArrowIcon,
  InnerContent,
  Cover,
  Bar,
  ShareIcon,
} from '../../styles/articles_intro_tabs/help_feat/help_demo'

const HelpItem: FC = () => {
  return (
    <Wrapper>
      <Sidebar>
        <PinnedItem>
          <BookIcon />
          <Bar width={48} height={8} opacity={0.3} left={6} />
        </PinnedItem>
        <PinnedItem>
          <QuestionIcon />
          <Bar width={52} height={8} opacity={0.4} left={8} />
        </PinnedItem>

        <Bar width={45} height={5} opacity={0.5} left={5} top={28} />
        <Bar width={40} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={55} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={62} height={4} opacity={0.2} left={5} top={10} />

        <Bar width={27} height={5} opacity={0.5} left={5} top={20} />
        <Bar width={45} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={50} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={40} height={4} opacity={0.2} left={5} top={10} />

        <Bar width={32} height={5} opacity={0.5} left={5} top={20} />
        <Bar width={60} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={40} height={4} opacity={0.2} left={5} top={10} />

        <Bar width={40} height={5} opacity={0.5} left={5} top={20} />
        <Bar width={50} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={70} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={30} height={4} opacity={0.2} left={5} top={10} />
        <Bar width={20} height={4} opacity={0.2} left={5} top={10} />
      </Sidebar>

      <Content>
        <InnerContent>
          <ShareIcon />
          <Bar width={50} height={4} opacity={0.3} bottom={10} />
          <Bar width={150} height={10} opacity={0.6} bottom={5} />
          <Cover />

          <Bar width={150} height={6} opacity={0.4} top={14} />
          <Bar width={220} height={6} opacity={0.3} top={13} />
          <Bar width={160} height={6} opacity={0.3} top={14} />
          <Bar width={120} height={6} opacity={0.4} top={16} />
          <Bar width={160} height={6} opacity={0.3} top={14} />
        </InnerContent>
        <Footer>
          <LeftArrowIcon />
          <Bar width={35} height={10} opacity={0.4} />
          <SpaceGrow />
          <Bar width={42} height={10} opacity={0.55} />
          <RightArrowIcon />
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default HelpItem
