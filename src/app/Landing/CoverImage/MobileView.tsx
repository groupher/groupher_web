import Typewriter from 'typewriter-effect'

import useWallpaperValtio from '@/hooks/useWallpaperValtio'

import { Space, SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  BrowerHead,
  Dot,
  AddrBar,
  LockIcon,
  AddText,
  GradientText,
  Highlight,
  Content,
  Background,
  Image,
} from '../styles/cover_image/mobile_view'

export default () => {
  const { wallpaper, background, effect, hasShadow } = useWallpaperValtio()

  const imageSrc = '/landing/intro/home.png'

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
          <GradientText wallpaper={wallpaper}>
            <Typewriter
              options={{
                strings: ['posts', 'kanban', 'changelog', 'help', 'roadmap', 'docs'],
                autoStart: true,
                loop: true,
              }}
            />
          </GradientText>
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
