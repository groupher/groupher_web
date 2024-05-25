import { FC, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { WIDTH } from '@/css'
import { callWallpaperEditor } from '@/signal'
import { parseWallpaper } from '@/wallpaper'
import { blurRGB } from '@/fmt'

import THEME from '@/const/theme'
import useThemeData from '@/hooks/useThemeData'
import useGossBlur from '@/hooks/useGossBlur'
import useTheme from '@/hooks/useTheme'

import { Brick } from '@/widgets/Common'
import CheckLabel from '@/widgets/CheckLabel'

import SectionLabel from '../SectionLabel'

import useWallpaperInfo from '../hooks/useWallpaperInfo'
import {
  Wrapper,
  Section,
  PreviewWrapper,
  HoverMask,
  UploadIcon,
  RealPreview,
  PreviewerWrapper,
  PreviewImage,
  ContentBlock,
} from '../styles/layout/wallpaper'

const Wallpaper: FC = () => {
  const gossBlur = useGossBlur()
  const { wallpapers, wallpaper, customWallpaper, hasShadow } = useWallpaperInfo()

  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)

  const { theme } = useTheme()
  const themeData = useThemeData()

  const handleCallEditor = useCallback(() => callWallpaperEditor(), [])
  const bgColor = `${blurRGB(themeData.htmlBg, gossBlur)}`

  return (
    <Wrapper>
      <Section>
        <SectionLabel
          title="壁纸设置"
          desc={
            <>
              「壁纸」为宽屏（屏幕尺寸大于 {WIDTH.COMMUNITY.PAGE}
              ）下，超出内容部分显示的背景图片，除内置壁纸外，你还可以上传和社区话题相关的自定义图片。
            </>
          }
          width="96%"
        />

        <PreviewWrapper>
          <HoverMask onClick={handleCallEditor}>
            <UploadIcon />
            <PreviewImage style={{ background }} effect={effect} $darker={theme === THEME.NIGHT} />
            <CheckLabel title="原图" top={15} left={-15} $active={false} />
          </HoverMask>
          <PreviewerWrapper>
            <RealPreview>
              <PreviewImage
                style={{ background }}
                effect={effect}
                noHover
                $darker={theme === THEME.NIGHT}
              />
              <ContentBlock hasShadow={hasShadow} $bgColor={bgColor}>
                <Brick $width={100} $height={7} $opacity={0.25} top={14} left={20} />
                <Brick $width={180} $height={7} $opacity={0.15} top={32} left={20} />

                <Brick $width={100} $height={7} $opacity={0.22} top={54} left={20} />
                <Brick $width={180} $height={7} $opacity={0.12} top={70} left={20} />

                <Brick $width={100} $height={7} $opacity={0.2} top={94} left={20} />
                <Brick $width={180} $height={7} $opacity={0.1} top={108} left={20} />

                <Brick $width={100} $height={7} $opacity={0.18} top={134} left={20} />
                <Brick $width={180} $height={7} $opacity={0.08} top={148} left={20} />
              </ContentBlock>
            </RealPreview>
            <CheckLabel title="预览效果" top={15} left={-15} $active={false} />
          </PreviewerWrapper>
        </PreviewWrapper>
      </Section>
    </Wrapper>
  )
}

export default observer(Wallpaper)
