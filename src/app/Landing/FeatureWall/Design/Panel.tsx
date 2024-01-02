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
  const rotate = hovering ? -1 : -4

  return (
    <Wrapper>
      <Line top={10} left={0} $hovering={hovering} $rotate={rotate} />
      <Line top={160} left={0} $hovering={hovering} $rotate={rotate} />
      <Column top={0} left={10} $hovering={hovering} $rotate={rotate} />
      <LocateDot top={hovering ? 160 : 18} left={hovering ? 18 : 11} $rotate={rotate} />
      <LocateDot top={hovering ? 10 : 168} left={hovering ? 15 : 21} $rotate={rotate} />

      <CavansBlock right={-10} top={20} $rotate={rotate}>
        <CursorIcon top={hovering ? 30 : 15} right={hovering ? 40 : 50} wallpaper={wallpaper} />
        <CursorText top={hovering ? 48 : 34} right={hovering ? 20 : 30} wallpaper={wallpaper}>
          Mr. Tony
        </CursorText>

        <LeftIndexText top={72} left={5} $opacity={textOpacity}>
          wechat:
        </LeftIndexText>

        <IndexRowBar top={80} left={38} width={18} $opacity={stickOpacity} />

        <IndexBar top={34} left={70} height={26} $opacity={stickOpacity} />
        <IndexText top={15} left={50} $opacity={textOpacity}>
          mydear
        </IndexText>

        <IndexBar top={48} left={126} height={14} $opacity={stickOpacity} />
        <IndexText top={28} left={112} $opacity={textOpacity}>
          xym
        </IndexText>

        {hovering && <MainTextGradient wallpaper={wallpaper}>design</MainTextGradient>}
        {!hovering && <MainText>design</MainText>}

        <BottomIndexBar bottom={36} $opacity={hovering ? 0.8 : 0.4} />

        <IndexText bottom={31} left={110} $opacity={textOpacity}>
          1988 px
        </IndexText>

        <GridMask />
      </CavansBlock>
    </Wrapper>
  )
}

export default Panel
