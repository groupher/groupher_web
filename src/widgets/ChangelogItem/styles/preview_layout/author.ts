import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  margin-top: 20px;
  margin-left: 5px;
`
export const Avatar = styled(Img)`
  ${css.circle(18)};
`
export const Name = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-left: 8px;
`
