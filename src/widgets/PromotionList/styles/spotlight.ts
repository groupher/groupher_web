import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  background: #06303b;
  padding: 10px;
  width: 100%;
  min-height: 120px;
  border-radius: 5px;
  margin-left: -8px;
`
export const Header = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-left: 2px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  flex-grow: 1;
  font-size: 12px;
  margin-top: 12px;
`
export const JoinWrapper = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 12px;
`
export const JoinNumber = styled.div`
  color: ${theme('article.title')};
  margin-right: 3px;
`
