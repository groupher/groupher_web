import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  margin-left: 10px;
  margin-top: -12px;
`
export const Digest = styled.div`
  ${css.cutRest('250px')};
  color: ${theme('article.digest')};
  margin-top: 6px;
  font-size: 12px;

  transition: all 0.2s;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 7px;
`
export const ArticleStateBadgeWrapper = styled.div`
  margin-left: -2px;
`
