import { useState, FC } from 'react'
import { keys } from 'ramda'

import type { TWallpaper } from '@/spec'
import { GRADIENT_WALLPAPER } from '@/constant'
import { parseWallpaper } from '@/utils/wallpaper'

import Tooltip from '@/widgets/Tooltip'

import {
  Wrapper,
  Block,
  Panel,
  BgImage,
  Desc,
  ImageWrapper,
  ImageBlock,
} from '../styles/toolbox/background_block'
import { wallpaperOnChange } from '../logic'

type TProps = {
  wallpapers: Record<string, TWallpaper>
  wallpaper: string
}

const BackgroundBlock: FC<TProps> = ({ wallpapers, wallpaper }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            {keys(GRADIENT_WALLPAPER).map((themeName) => (
              <ImageWrapper key={themeName} $active={wallpaper === themeName}>
                <ImageBlock
                  background={parseWallpaper(wallpapers, themeName).background}
                  onClick={() => wallpaperOnChange(themeName)}
                />
              </ImageWrapper>
            ))}
          </Panel>
        }
        placement="top"
        trigger="click"
        onShow={() => setPanelOpen(true)}
        onHide={() => setPanelOpen(false)}
        hideOnClick={false}
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
