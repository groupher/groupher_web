import styled, { css, theme } from '@/css'

import { BaseCard } from '..'

export const Wrapper = styled(BaseCard)``

export const Header = styled.div`
  ${css.column()};
  width: 100%;
  padding: 15px 18px;
  margin-top: 6px;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.8;
`
