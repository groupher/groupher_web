import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  margin-bottom: 8px;
`
export const InnerWrapper = styled.div`
  ${css.rowWrap()};
`
export const HintTitle = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 10px;
  margin-left: 2px;
`
