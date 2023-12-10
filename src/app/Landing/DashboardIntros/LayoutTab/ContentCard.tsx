import { FC } from 'react'

import WallpaperBar from './WallpaperBar'

import { Wrapper } from '../../styles/dashboard_intros/layout_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <WallpaperBar />
    </Wrapper>
  )
}

export default ContentCard
