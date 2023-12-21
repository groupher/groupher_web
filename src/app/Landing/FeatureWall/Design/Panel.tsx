import { FC } from 'react'

import useWallpaper from '@/hooks/useWallpaper'

import {
  Wrapper,
  GridMask,
  CavansBlock,
  CursorIcon,
  CursorText,
  MainTextGradient,
  MainText,
  Line,
  IndexBar,
  LeftIndexText,
  IndexRowBar,
  IndexText,
  BottomIndexBar,
  Column,
  LocateDot,
} from '../../styles/feature_wall/design/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  const { wallpaper } = useWallpaper()

  const stickOpacity = hovering ? 1 : 0.4
  const textOpacity = hovering ? 1 : 0.8

  return (
    <Wrapper>
      <Line top={10} left={0} $hovering={hovering} $rotate={hovering ? -1 : -4} />
      <Line top={160} left={0} $hovering={hovering} $rotate={hovering ? -1 : -4} />
      <Column top={0} left={10} $hovering={hovering} $rotate={hovering ? -1 : -4} />
      <LocateDot top={hovering ? 160 : 18} left={hovering ? 18 : 11} $rotate={hovering ? -1 : -4} />
      <LocateDot top={hovering ? 10 : 167} left={hovering ? 15 : 21} $rotate={hovering ? -1 : -4} />

      <CavansBlock right={-10} top={20} $rotate={hovering ? -1 : -4}>
        <CursorIcon top={hovering ? 30 : 15} right={hovering ? 40 : 50} wallpaper={wallpaper} />
        <CursorText top={hovering ? 48 : 34} right={hovering ? 20 : 30} wallpaper={wallpaper}>
          Mr. Tony
        </CursorText>

        <LeftIndexText top={72} left={5} $opacity={textOpacity}>
          styled
        </LeftIndexText>
        <IndexRowBar top={80} left={38} width={18} $opacity={stickOpacity} />

        <IndexBar top={34} left={70} height={26} $opacity={stickOpacity} />
        <IndexText top={16} left={47} $opacity={textOpacity}>
          padding
        </IndexText>

        <IndexBar top={48} left={127} height={14} $opacity={stickOpacity} />
        <IndexText top={28} left={107} $opacity={textOpacity}>
          margin
        </IndexText>

        {hovering && <MainTextGradient wallpaper={wallpaper}>design</MainTextGradient>}
        {!hovering && <MainText>design</MainText>}

        <BottomIndexBar bottom={36} $opacity={hovering ? 0.8 : 0.4} />

        <IndexText bottom={31} left={121} $opacity={textOpacity}>
          98 px
        </IndexText>

        <GridMask />
      </CavansBlock>
    </Wrapper>
  )
}

export default Panel
