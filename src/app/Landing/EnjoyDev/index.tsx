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
        <Desc>将用户反馈融入开发流程，优先满足用户真正关心的需求</Desc>
      </Slogan>
      <Wall ref={ref}>
        <HighWay />
        <CompareWraper>
          <NoNote>
            <NoIcon />
            团队两行泪
          </NoNote>
          <VS>VS</VS>
          <YesNote>
            <YesIcon />
            与用户共赢
          </YesNote>
        </CompareWraper>
        <OurWay />
        <GridBgWrapper />
      </Wall>
    </Wrapper>
  )
}

export default EnjoyDev
