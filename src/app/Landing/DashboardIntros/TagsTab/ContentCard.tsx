import { FC } from 'react'

import { Brick } from '@/widgets/Common'

import TagBanner from './TagBanner'
import Sidebar from './Sidebar'
import { Wrapper, InnerContent } from '../../styles/dashboard_intros/tags_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <InnerContent>
        <Brick $width={30} $height={8} $opacity={0.2} left={25} top={20} />
        <Brick $width={200} $height={8} $opacity={0.1} left={110} />
        <Brick $width={20} $height={8} $opacity={0.1} right={20} />
        <TagBanner />
        <Sidebar />
      </InnerContent>
    </Wrapper>
  )
}

export default ContentCard
