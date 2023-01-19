import { FC, memo, useState } from 'react'
import { keys } from 'ramda'

import type { TWallpaperPic } from '@/spec'

import Button from '@/widgets/Buttons/Button'

import {
  Wrapper,
  ShowMoreMask,
  Block,
  Image,
  ActiveSign,
  CheckIcon,
  CircleArrow,
} from '../styles/build_in/pictrue_group'

import { changeWallpaper } from '../logic'

type TProps = {
  wallpaper: string
  patternWallpapers: Record<string, TWallpaperPic>
}

const PictureGroup: FC<TProps> = ({ wallpaper, patternWallpapers }) => {
  const [showMore, setShowMore] = useState(false)

  const _patternKeys = keys(patternWallpapers)
  const patternKeys = showMore ? _patternKeys : _patternKeys.slice(0, 4)

  return (
    <Wrapper showMore={showMore}>
      {patternKeys.map((name) => {
        const { bgImage } = patternWallpapers[name]
        const bgSrc = bgImage === '/wallpaper/ms.svg' ? '/wallpaper/ms.png' : bgImage

        return (
          <Block key={name} $active={name === wallpaper}>
            {name === wallpaper && (
              <ActiveSign>
                <CheckIcon />
              </ActiveSign>
            )}
            <Image
              src={bgSrc}
              height={name === 'ms' ? '110px' : 'auto'}
              onClick={() => changeWallpaper(name)}
            />
          </Block>
        )
      })}
      <ShowMoreMask showMore={showMore}>
        <Button ghost noBorder size="small" top={60} onClick={() => setShowMore(!showMore)}>
          <CircleArrow showMore={showMore} />
          {!showMore && <>查看全部</>}
        </Button>
      </ShowMoreMask>
    </Wrapper>
  )
}

export default memo(PictureGroup)
