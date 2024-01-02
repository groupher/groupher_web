import { FC, memo, useState } from 'react'

import type { TWallpaperInfo } from '@/spec'
import useThemeData from '@/hooks/useThemeData'
import { parseWallpaper } from '@/wallpaper'

import Button from '@/widgets/Buttons/Button'
import { Row } from '@/widgets/Common'

import SectionLabel from '../SectionLabel'

import {
  Wrapper,
  Section,
  ContentWrapper,
  PreviewerWrapper,
  PreviewImage,
  Actions,
  ContentBlock,
  ContentBar,
} from '../styles/layout/blur_effect'

type TProps = {
  wallpaperInfo: TWallpaperInfo
}

const hex2RGB = (hex) => {
  const hexValues = hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16))
    .join(' ')

  return hexValues
}

const blurRGB = (hex, blur = 100) => {
  if (!blur || blur === 100) return hex

  return `rgb(${hex2RGB(hex)} / ${blur}%)`
}

const BlurEffect: FC<TProps> = ({ wallpaperInfo }) => {
  const { wallpapers, wallpaper, customWallpaper } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)
  const [blur, setBlur] = useState(100)

  const themeData = useThemeData()

  const bgColor = `${blurRGB(themeData.htmlBg, blur)}`

  console.log('## coverted: ', bgColor)
  console.log('## blur: ', blur)

  return (
    <Wrapper>
      <Section>
        <SectionLabel title="毛玻璃效果" desc="主要页面的高斯模糊值，类似主流音乐播放器效果" />

        <ContentWrapper>
          <PreviewerWrapper>
            <PreviewImage style={{ background }} effect={effect} noHover />
            <ContentBlock $bgColor={bgColor}>
              <ContentBar long={30} />
              <ContentBar long={80} />
              <ContentBar long={60} />
              <ContentBar long={20} />
              <ContentBar long={70} />
              <ContentBar long={30} />
            </ContentBlock>
          </PreviewerWrapper>
          <Actions>
            <div>默认为无模糊白色背景，设置模糊透明度以后，界面会根据壁纸产生对应的毛玻璃效果.</div>
            <Row>
              <Button ghost onClick={() => setBlur(30)}>
                30%
              </Button>

              <Button ghost onClick={() => setBlur(50)}>
                50%
              </Button>

              <Button ghost onClick={() => setBlur(80)}>
                80%
              </Button>

              <Button ghost onClick={() => setBlur(100)}>
                100%
              </Button>
            </Row>
          </Actions>
        </ContentWrapper>
      </Section>
    </Wrapper>
  )
}

export default memo(BlurEffect)
