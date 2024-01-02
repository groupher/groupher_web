import { FC, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import type { TWallpaperInfo } from '@/spec'
import { WIDTH } from '@/css'
import { callWallpaperEditor } from '@/signal'
import { parseWallpaper } from '@/wallpaper'
import { blurRGB } from '@/fmt'

import useThemeData from '@/hooks/useThemeData'
import useTheme from '@/hooks/useTheme'
import THEME from '@/constant/theme'

import { Brick } from '@/widgets/Common'
import CheckLabel from '@/widgets/CheckLabel'

import SectionLabel from '../SectionLabel'

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

type TProps = {
  wallpaperInfo: TWallpaperInfo
  gossBlur: number
}

const Wallpaper: FC<TProps> = ({ wallpaperInfo, gossBlur }) => {
  const { wallpapers, wallpaper, customWallpaper, hasShadow } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)

  const { curTheme } = useTheme()
  const themeData = useThemeData()

  const handleCallEditor = useCallback(() => callWallpaperEditor(), [])
  const bgColor = `${blurRGB(themeData.htmlBg, gossBlur)}`

  return (
    <Wrapper>
      <Section>
        <SectionLabel
          title="壁纸设置"
          withThemeSelect
          desc={
            <>
              「壁纸」为宽屏（屏幕尺寸大于 {WIDTH.COMMUNITY.PAGE}
              ）下，超出内容部分显示的背景图片，除内置壁纸外，你还可以上传和社区话题相关的自定义图片。
            </>
          }
          width="84%"
        />

        <PreviewWrapper>
          <HoverMask onClick={handleCallEditor}>
            <UploadIcon />
            <PreviewImage
              style={{ background }}
              effect={effect}
              $darker={curTheme === THEME.NIGHT}
            />
            <CheckLabel title="原图" top={15} left={-15} $active={false} />
          </HoverMask>
          <PreviewerWrapper>
            <RealPreview>
              <PreviewImage
                style={{ background }}
                effect={effect}
                noHover
                $darker={curTheme === THEME.NIGHT}
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
