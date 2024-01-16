import { FC, useState } from 'react'

import { COLOR_NAME } from '@/constant/colors'

import Header from './Header'
import MainLayouts from './MainLayouts'
import PostLayouts from './PostLayouts'

import { Wrapper } from '../../styles/dashboard_intros/layout_tab/content_card'

const ContentCard: FC = () => {
  const [primaryColor, setPrimaryColor] = useState(COLOR_NAME.PURPLE)

  return (
    <Wrapper>
      <Header primaryColor={primaryColor} onPrimaryChange={(color) => setPrimaryColor(color)} />
      <MainLayouts primaryColor={primaryColor} />
      <PostLayouts primaryColor={primaryColor} />
    </Wrapper>
  )
}

export default ContentCard
