import { useRef, useEffect } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import useWallpaper from '@/hooks/useWallpaper'

import HighWay from './HighWay'
import OurWay from './OurWay'

import {
  Wrapper,
  Slogan,
  Tips,
  Title,
  Desc,
  Wall,
  GridBgWrapper,
  CompareWraper,
  VS,
  YesNote,
  NoNote,
  YesIcon,
  NoIcon,
  GradientText,
} from '../styles/enjoy_dev'

export default () => {
  const ref = useRef(null)
  const { isMobile } = useMobileDetect()
  const { wallpaper } = useWallpaper()

  useEffect(() => {
    if (isMobile && ref) {
      ref.current.scrollLeft += 310
    }
  }, [isMobile, ref])

  return (
    <Wrapper>
      <Slogan>
        <Tips>It's Simple !</Tips>
        <Title>
          上线、<GradientText wallpaper={wallpaper}>获取反馈</GradientText>、迭代
        </Title>
        <Desc>将用户反馈融入开发流程，避免平行世界闭门造车</Desc>
      </Slogan>
      <Wall ref={ref}>
        <OurWay />
        <CompareWraper>
          <YesNote>
            <YesIcon />
            与用户共赢
          </YesNote>
          <VS>VS</VS>
          <NoNote>
            <NoIcon />
            团队两行泪
          </NoNote>
        </CompareWraper>
        <HighWay />
        <GridBgWrapper />
      </Wall>
    </Wrapper>
  )
}
