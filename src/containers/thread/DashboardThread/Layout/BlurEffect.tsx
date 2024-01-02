import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import type { TWallpaperInfo } from '@/spec'
import { blurRGB } from '@/fmt'
import useThemeData from '@/hooks/useThemeData'
import useTheme from '@/hooks/useTheme'
import THEME from '@/constant/theme'

import { parseWallpaper } from '@/wallpaper'

import { Brick } from '@/widgets/Common'
import RangeSlider from '@/widgets/RangeSlider'

import SectionLabel from '../SectionLabel'

import {
  Wrapper,
  Section,
  ContentWrapper,
  PreviewerWrapper,
  PreviewImage,
  Actions,
  Title,
  Desc,
  ContentBlock,
} from '../styles/layout/blur_effect'

type TProps = {
  wallpaperInfo: TWallpaperInfo
}

const BlurEffect: FC<TProps> = ({ wallpaperInfo }) => {
  const { wallpapers, wallpaper, customWallpaper } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)
  const [blur, setBlur] = useState(100)

  const { curTheme } = useTheme()
  const themeData = useThemeData()

  const bgColor = `${blurRGB(themeData.htmlBg, blur)}`

  return (
    <Wrapper key={wallpaper}>
      <Section>
        <SectionLabel title="毛玻璃效果" desc="主要页面的高斯模糊值，类似主流音乐播放器效果" />

        <ContentWrapper>
          <PreviewerWrapper>
            <PreviewImage
              style={{ background }}
              effect={effect}
              $darker={curTheme === THEME.NIGHT}
            />
            <ContentBlock $bgColor={bgColor}>
              <Brick $width={100} $height={7} $opacity={0.25} top={24} left={20} />
              <Brick $width={180} $height={7} $opacity={0.15} top={42} left={20} />

              <Brick $width={100} $height={7} $opacity={0.22} top={64} left={20} />
              <Brick $width={180} $height={7} $opacity={0.12} top={80} left={20} />

              <Brick $width={100} $height={7} $opacity={0.2} top={104} left={20} />
              <Brick $width={180} $height={7} $opacity={0.1} top={118} left={20} />

              <Brick $width={100} $height={7} $opacity={0.18} top={144} left={20} />
              <Brick $width={180} $height={7} $opacity={0.08} top={158} left={20} />

              <Brick $width={100} $height={7} $opacity={0.15} top={184} left={20} />
              <Brick $width={180} $height={7} $opacity={0.06} top={198} left={20} />
            </ContentBlock>
          </PreviewerWrapper>
          <Actions>
            <Title>透明度</Title>
            <Desc>默认为无模糊白（黑）色背景。</Desc>
            <Desc>设置透明度以后，会根据壁纸颜色产生对应的毛玻璃效果。</Desc>
            <Desc>透明度过低会导致内容无法辨认。</Desc>
            <Desc>个别浏览器不支持该效果，不影响布局或内容呈现。</Desc>

            <br />
            <RangeSlider
              value={blur}
              onChange={(v) => setBlur(v)}
              top={10}
              min={50}
              max={100}
              unit="%"
              width="275px"
            />
          </Actions>
        </ContentWrapper>
      </Section>
    </Wrapper>
  )
}

export default observer(BlurEffect)
