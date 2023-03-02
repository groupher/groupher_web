import { FC } from 'react'

import {
  Wrapper,
  Circle,
  CurlyLineIcon,
  Desc,
  Desc2,
  Desc3,
  Desc4,
  Desc5,
} from '../../styles/feature_wall/curly_line_desc/u2d'

const CurlyLineDesc: FC = () => {
  return (
    <Wrapper>
      <Circle />
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
