import { FC } from 'react'

import { Brick } from '@/widgets/Common'

import TagBanner from './TagBanner'
import Sidebar from './Sidebar'
import { Wrapper, InnerContent } from '../../styles/dashboard_intros/tags_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <InnerContent>
        <Brick $width={30} $height={8} $opacity={0.2} left={30} top={20} />
        <Brick $width={180} $height={8} $opacity={0.07} left={125} top={20} />
        <Brick $width={20} $height={8} $opacity={0.1} right={28} top={20} />

        <Brick $width={95} $height={72} $opacity={0.05} left={30} top={125} />
        <Brick $width={95} $height={80} $opacity={0.03} left={140} top={125} />

        <Brick $width={95} $height={72} $opacity={0.04} left={30} top={208} />
        <Brick $width={95} $height={72} $opacity={0.03} left={30} top={288} />
        <Brick $width={95} $height={106} $opacity={0.06} left={140} top={215} />
        <TagBanner />
        <Sidebar />
      </InnerContent>
    </Wrapper>
  )
}

export default ContentCard
