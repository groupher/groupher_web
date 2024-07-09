import { useState } from 'react'
import { keys } from 'ramda'

import Button from '~/widgets/Buttons/Button'

import useLogic from '../useLogic'
import {
  Wrapper,
  ShowMoreMask,
  Block,
  Image,
  ActiveSign,
  CheckIcon,
  CircleArrow,
} from '../styles/build_in/pictrue_group'

export default () => {
  const { getWallpaper, changePatternWallpaper } = useLogic()
  const { wallpaper, patternWallpapers } = getWallpaper()

  const [showMore, setShowMore] = useState(false)

  const _patternKeys = keys(patternWallpapers)
  const patternKeys = showMore ? _patternKeys : _patternKeys.slice(0, 4)

  return (
    <Wrapper showMore={showMore}>
      {patternKeys.map((name) => {
        // @ts-ignore
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
              onClick={() => changePatternWallpaper(name)}
            />
          </Block>
        )
      })}

      <ShowMoreMask showMore={showMore}>
        <Button ghost noBorder size="small" top={60} onClick={() => setShowMore(!showMore)}>
          <CircleArrow showMore={showMore} />
          {!showMore ? <>查看全部</> : <>收起</>}
        </Button>
      </ShowMoreMask>
    </Wrapper>
  )
}
