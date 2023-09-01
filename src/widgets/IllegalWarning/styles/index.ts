import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  color: ${theme('article.digest')};
  width: 280px;
  border: 1px solid;
  border-top: 3px solid;
  border-radius: 5px;
  border-color: ${theme('baseColor.red')};
  min-height: 100px;
  padding: 10px 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 12px;
`
export const Reason = styled.div`
  color: ${theme('article.title')};
`
export const Content = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
`
export const IllegalItem = styled.div`
  color: ${theme('article.title')};
  background: #4c312c;
  font-size: 12px;
  padding: 2px 5px;
  margin-right: 10px;
  margin-left: -2px;
  border-radius: 5px;
  margin-bottom: 6px;
`
