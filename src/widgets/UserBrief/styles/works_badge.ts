import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  margin-bottom: 10px;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-bottom: 12px;
`
export const List = styled.div`
  ${css.row()};
  flex-wrap: wrap;
`
export const Item = styled.div`
  ${css.column('align-both')};
  margin-right: 18px;
`
export const Cover = styled(Img)`
  ${css.size(36)};
  border-radius: 5px;
`
