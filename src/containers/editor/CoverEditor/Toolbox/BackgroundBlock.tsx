import { useState, FC } from 'react'
import { keys } from 'ramda'

import type { TWallpaper } from '@/spec'
import { GRADIENT_WALLPAPER, GRADIENT_DIRECTION } from '@/constant'
import { parseWallpaper } from '@/utils/wallpaper'

import Tooltip from '@/widgets/Tooltip'

import {
  Wrapper,
  Block,
  Panel,
  Title,
  BgRow,
  DirRow,
  Divider,
  BgImage,
  Desc,
  ImageWrapper,
  ImageBlock,
  DirWrapper,
  DirArrowIcon,
} from '../styles/toolbox/background_block'
import { wallpaperOnChange, gradientDirOnChange } from '../logic'

type TProps = {
  wallpapers: Record<string, TWallpaper>
  wallpaper: string
  direction: string
}

const BackgroundBlock: FC<TProps> = ({ wallpapers, wallpaper, direction }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Title>渐变背景色:</Title>
            <BgRow>
              {keys(GRADIENT_WALLPAPER).map((themeName) => (
                <ImageWrapper key={themeName} $active={wallpaper === themeName}>
                  <ImageBlock
                    background={parseWallpaper(wallpapers, themeName).background}
                    onClick={() => wallpaperOnChange(themeName)}
                  />
                </ImageWrapper>
              ))}
            </BgRow>
            <Divider />
            <Title>渐变方向:</Title>
            <DirRow>
              {keys(GRADIENT_DIRECTION).map((dir) => (
                <DirWrapper
                  key={dir}
                  $active={dir === direction}
                  onClick={() => gradientDirOnChange(GRADIENT_DIRECTION[dir])}
                >
                  <DirArrowIcon dir={dir} />
                </DirWrapper>
              ))}
            </DirRow>
          </Panel>
        }
        placement="top-end"
        trigger="mouseenter focus"
        onShow={() => setPanelOpen(true)}
        onHide={() => setPanelOpen(false)}
        hideOnClick={false}
        offset={[26, 5]}
        noPadding
      >
        <Block $active={panelOpen}>
          <BgImage background={parseWallpaper(wallpapers, wallpaper).background} />
        </Block>
      </Tooltip>

      <Desc $active={panelOpen}>背景</Desc>
    </Wrapper>
  )
}

export default BackgroundBlock
