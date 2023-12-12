import { FC, useRef, useEffect } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import HighWay from './HighWay'
import OurWay from './OurWay'

import {
  Wrapper,
  Slogan,
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
} from '../styles/enjoy_dev'

const EnjoyDev: FC = () => {
  const ref = useRef(null)
  const { isMobile } = useMobileDetect()

  useEffect(() => {
    if (isMobile && ref) {
      ref.current.scrollLeft += 310
    }
  }, [isMobile, ref])

  return (
    <Wrapper>
      <Slogan>
        <Title>上线、获取反馈、迭代</Title>
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

export default EnjoyDev
