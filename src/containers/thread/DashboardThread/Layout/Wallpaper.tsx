import { FC, memo, useCallback } from 'react'

import type { TWallpaperInfo } from '@/spec'
import { WIDTH } from '@/utils/css'
import { callWallpaperEditor } from '@/utils/signal'
import { parseWallpaper } from '@/utils/wallpaper'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import CheckLabel from '@/widgets/CheckLabel'
import { Space, Inline } from '@/widgets/Common'

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
  ContentBar,
} from '../styles/layout/wallpaper'

type TProps = {
  wallpaperInfo: TWallpaperInfo
}

const Wallpaper: FC<TProps> = ({ wallpaperInfo }) => {
  const { wallpapers, wallpaper, customWallpaper, hasShadow } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)

  const handleCallEditor = useCallback(() => callWallpaperEditor(), [])

  return (
    <Wrapper>
      <Section>
        <SectionLabel
          title="壁纸设置"
          desc={
            <>
              「壁纸」为宽屏（屏幕尺寸大于 ${WIDTH.COMMUNITY.PAGE}
              ）下，超出内容部分显示的背景图片，除内置壁纸外，你还可以上传和社区话题相关的自定义图片。
              <Inline>
                <ArrowButton onClick={handleCallEditor} size="tiny" arrowStyle="simple">
                  更换壁纸
                </ArrowButton>
              </Inline>
            </>
          }
        />

        <PreviewWrapper>
          <HoverMask onClick={handleCallEditor}>
            <UploadIcon />
            <PreviewImage style={{ background }} effect={effect} />
            <CheckLabel title="原图" top={15} left={-15} $active={false} />
          </HoverMask>
          <Space right={48} />
          <PreviewerWrapper>
            <RealPreview>
              <PreviewImage style={{ background }} effect={effect} noHover />
              <ContentBlock hasShadow={hasShadow}>
                <ContentBar long={30} />
                <ContentBar long={80} />
                <ContentBar long={60} />
                <ContentBar long={20} />
                <ContentBar long={70} />
                <ContentBar long={30} />
              </ContentBlock>
            </RealPreview>
            <CheckLabel title="预览效果" top={15} left={-15} $active={false} />
          </PreviewerWrapper>
        </PreviewWrapper>
      </Section>
    </Wrapper>
  )
}

export default memo(Wallpaper)
