import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import Typewriter from 'typewriter-effect'

import useWallpaper from '@/hooks/useWallpaper'
import { Space, SpaceGrow } from '@/widgets/Common'
import { parseWallpaper } from '@/wallpaper'

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
} from '../../styles/cover_image/desktop_view/desktop_device'

const DesktopDevice: FC = () => {
  const { wallpapers, wallpaper, hasShadow } = useWallpaper()
  const { background, effect } = parseWallpaper(wallpapers, wallpaper)

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

export default observer(DesktopDevice)
