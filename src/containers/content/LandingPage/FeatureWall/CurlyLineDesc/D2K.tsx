import { FC } from 'react'

import {
  Wrapper,
  CurlyLineIcon,
  Desc,
  Desc2,
  Desc3,
  Desc4,
} from '../../styles/feature_wall/curly_line_desc/d2k'

const CurlyLineDesc: FC = () => {
  return (
    <Wrapper>
      <Desc>功能 x 计划中</Desc>
      <Desc2>功能 Z 已完成</Desc2>
      <Desc3>Bug Y 修复中</Desc3>
      <Desc4>Bug Z 已修复</Desc4>
      <CurlyLineIcon />
    </Wrapper>
  )
}

export default CurlyLineDesc
