import { FC } from 'react'

import {
  Wrapper,
  CurlyLineIcon,
  Desc,
  Desc2,
  Desc3,
  Desc4,
} from '../../styles/feature_wall/curly_line_desc/c2h'

const CurlyLineDesc: FC = () => {
  return (
    <Wrapper>
      <Desc>常见问题</Desc>
      <Desc2>新手指南</Desc2>
      <Desc3>开发文档</Desc3>
      <Desc4>配置指南</Desc4>
      <CurlyLineIcon />
    </Wrapper>
  )
}

export default CurlyLineDesc
