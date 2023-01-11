import { FC, useEffect, useState } from 'react'
import { keys } from 'ramda'

import { COLORS, COLOR_NAME } from '@/constant/colors'

import {
  Wrapper,
  MagicWrapper,
  MagicIcon,
  CurlyLineIcon,
  Desc,
  Desc2,
  Desc3,
  Desc4,
  Desc5,
} from '../../styles/feature_wall/curly_line_desc/u2d'

const COLOR_NAME_KEYS = [
  COLOR_NAME.RED,
  COLOR_NAME.YELLOW,
  COLOR_NAME.PURPLE,
  COLOR_NAME.CYAN,
  COLOR_NAME.GREEN,
  COLOR_NAME.BLUE,
  COLOR_NAME.BROWN,
]

const CurlyLineDesc: FC = () => {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((index) => (index >= COLOR_NAME_KEYS.length - 1 ? 0 : colorIndex + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [colorIndex])

  return (
    <Wrapper>
      <MagicWrapper>
        <MagicIcon color={COLOR_NAME[COLOR_NAME_KEYS[colorIndex]]} />
      </MagicWrapper>
      <Desc>收集沉淀</Desc>
      <Desc2>细节讨论</Desc2>
      <Desc3>SEO 友好</Desc3>
      <Desc4>分享反馈</Desc4>
      <Desc5>直达团队</Desc5>
      <CurlyLineIcon />
    </Wrapper>
  )
}

export default CurlyLineDesc
