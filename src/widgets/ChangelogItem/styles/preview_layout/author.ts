import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
`
export const Avatar = styled(Img)`
  ${css.circle(18)};
`
export const Name = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-left: 8px;
`
