import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  width: 100%;
  height: 50vh;
  color: ${theme('baseColor.red')};
  font-size: 14px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`
