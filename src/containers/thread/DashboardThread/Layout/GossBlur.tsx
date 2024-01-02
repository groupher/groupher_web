import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TWallpaperInfo } from '@/spec'
import { blurRGB } from '@/fmt'
import useThemeData from '@/hooks/useThemeData'
import useTheme from '@/hooks/useTheme'
import THEME from '@/constant/theme'

import { parseWallpaper } from '@/wallpaper'

import { Brick } from '@/widgets/Common'
import RangeSlider from '@/widgets/RangeSlider'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

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
} from '../styles/layout/goss_blur'
import { edit } from '../logic'

type TProps = {
  wallpaperInfo: TWallpaperInfo
  gossBlur: number
  saving: boolean
  isTouched: boolean
}

const GossBlur: FC<TProps> = ({ wallpaperInfo, gossBlur, saving, isTouched }) => {
  const { wallpapers, wallpaper, customWallpaper } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)

  const { curTheme } = useTheme()
  const themeData = useThemeData()

  const bgColor = `${blurRGB(themeData.htmlBg, gossBlur)}`

  return (
    <Wrapper key={wallpaper}>
      <Section>
        <SectionLabel
          title="毛玻璃效果"
          desc="主要页面的高斯模糊值，类似主流音乐播放器效果"
          withThemeSelect
          width="84%"
        />

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
            <Desc>透明度过低会导致内容无法辨认。</Desc>
            <Desc>个别浏览器不支持相应特性，会导致效果失效。</Desc>
            <Desc>可根据浅色和暗色主题设置不同的透明度。</Desc>

            <br />
            <RangeSlider
              value={gossBlur}
              onChange={(v) => edit(v, 'gossBlur')}
              top={10}
              min={50}
              max={100}
              unit="%"
              width="275px"
            />
          </Actions>
        </ContentWrapper>

        <SavingBar
          width="84%"
          isTouched={isTouched}
          field={SETTING_FIELD.GOSS_BLUR}
          loading={saving}
          top={20}
        />
      </Section>
    </Wrapper>
  )
}

export default observer(GossBlur)
