import { FC } from 'react'

import {
  Wrapper,
  CurlyLineIcon,
  Desc,
  Desc2,
  Desc3,
  Desc4,
} from '../../styles/feature_wall/curly_line_desc/k2c'

const CurlyLineDesc: FC = () => {
  return (
    <Wrapper>
      <Desc>新增功能 x</Desc>
      <Desc2>修复问题 Y</Desc2>
      <Desc3>解决性能问题 G</Desc3>
      <Desc4>感谢 A,B,C 用户的贡献</Desc4>
      <CurlyLineIcon />
    </Wrapper>
  )
}

export default CurlyLineDesc
