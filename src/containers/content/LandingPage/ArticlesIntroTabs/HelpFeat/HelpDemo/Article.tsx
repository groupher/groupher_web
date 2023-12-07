import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  Footer,
  LeftArrowIcon,
  RightArrowIcon,
  InnerContent,
  Cover,
  Bar,
  ShareIcon,
} from '../../../styles/articles_intro_tabs/help_feat/help_demo/article'

const Article: FC = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default Article
