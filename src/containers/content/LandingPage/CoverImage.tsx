import { FC } from 'react'

import type { TWallpaper } from '@/spec'
import { Space, SpaceGrow } from '@/widgets/Common'
import { parseWallpaper } from '@/utils/wallpaper'

import {
  Wrapper,
  BrowerHead,
  Dot,
  AddrBar,
  LockIcon,
  AddText,
  Highlight,
  Background,
  Image,
} from './styles/cover_image'

type TProps = {
  wallpaper: string
  wallpapers: Record<string, TWallpaper>
}

const CoverImage: FC<TProps> = ({ wallpaper, wallpapers }) => {
  const { background, effect } = parseWallpaper(wallpapers, wallpaper)

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
          <Highlight>your-brand</Highlight>
          <AddText>.groupher.com</AddText>
        </AddrBar>
        <SpaceGrow />
      </BrowerHead>
      <Background style={{ background }} effect={effect}>
        <Image src="/landing-demo.png" />
      </Background>
    </Wrapper>
  )
}

export default CoverImage
