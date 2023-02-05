import { FC } from 'react'

import type { TBannerLayout } from '@/spec'
import { BANNER_LAYOUT } from '@/constant/layout'

import {
  Wrapper,
  Layout1Icon,
  Layout2Icon,
  Layout3Wrapper,
  Bar,
} from '../styles/wallpaper_bar/layout_ball'

type TProps = {
  bannerLayout: TBannerLayout
  onLayoutChange: (bannerLayout: TBannerLayout) => void
}

const LayoutBall: FC<TProps> = ({ bannerLayout, onLayoutChange }) => {
  return (
    <Wrapper>
      {bannerLayout === BANNER_LAYOUT.HEADER && (
        <Layout1Icon onClick={() => onLayoutChange(BANNER_LAYOUT.TABBER)} />
      )}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && (
        <Layout2Icon onClick={() => onLayoutChange(BANNER_LAYOUT.HEADER)} />
      )}
      {bannerLayout === BANNER_LAYOUT.TABBER && (
        <Layout3Wrapper onClick={() => onLayoutChange(BANNER_LAYOUT.SIDEBAR)}>
          <Bar />
        </Layout3Wrapper>
      )}
    </Wrapper>
  )
}

export default LayoutBall
