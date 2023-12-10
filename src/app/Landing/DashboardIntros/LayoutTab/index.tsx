import { FC } from 'react'

import ContentCard from './ContentCard'
import WallpaperCard from './WallpaperCard'

import { Wrapper } from '../../styles/dashboard_intros/layout_tab'

const LayoutTab: FC = () => {
  return (
    <Wrapper>
      <ContentCard />
      <WallpaperCard />
    </Wrapper>
  )
}

export default LayoutTab
