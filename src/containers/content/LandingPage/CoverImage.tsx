import { FC, useState } from 'react'
import Typewriter from 'typewriter-effect'

import type { TWallpaperInfo, TBannerLayout } from '@/spec'
import { BANNER_LAYOUT } from '@/constant/layout'

import useInterval from '@/hooks/useInterval'
import { Space, SpaceGrow } from '@/widgets/Common'
import { parseWallpaper } from '@/utils/wallpaper'

import {
  Wrapper,
  BrowerHead,
  Dot,
  AddrBar,
  LockIcon,
  AddText,
  CoolText,
  Highlight,
  Content,
  Background,
  Image,
} from './styles/cover_image'

type TProps = {
  wallpaperInfo: TWallpaperInfo
  bannerLayout: TBannerLayout
}

const getImageSrc = (bannerLayout: TBannerLayout): string => {
  switch (bannerLayout) {
    case BANNER_LAYOUT.SIDEBAR: {
      return '/intro/home-sidebar.png'
    }

    case BANNER_LAYOUT.TABBER: {
      return '/intro/home-tabber.png'
    }

    default: {
      return '/intro/home.png'
    }
  }
}

const CoverImage: FC<TProps> = ({ wallpaperInfo, bannerLayout }) => {
  const [animateKey, setAnimateKey] = useState(0)

  const { wallpapers, wallpaper, hasShadow } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper)

  useInterval(() => {
    setAnimateKey(animateKey + 1)
  }, 2000)

  const imageSrc = getImageSrc(bannerLayout)

  return (
    <Wrapper>
      <BrowerHead>
        <Dot />
        <Dot />
        <Dot />
        <SpaceGrow />
        <AddrBar>
          <LockIcon />
          <AddText>https://</AddText>
          <Space right={2} />
          <Highlight>your-product</Highlight>
          <AddText>.groupher.com/</AddText>
          <CoolText wallpaper={wallpaper}>
            <Typewriter
              options={{
                strings: ['posts', 'kanban', 'changelog', 'help', 'roadmap', 'docs'],
                autoStart: true,
                loop: true,
              }}
            />
          </CoolText>
        </AddrBar>
        <SpaceGrow />
      </BrowerHead>
      <Content>
        <Image src={imageSrc} hasShadow={hasShadow} />
        <Background style={{ background }} effect={effect} />
      </Content>
    </Wrapper>
  )
}

export default CoverImage
