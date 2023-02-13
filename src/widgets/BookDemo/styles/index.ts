import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
export const Content = styled.div`
  min-height: 60vh;
  padding-left: 10%;
`
export const Thanks = styled.div`
  font-size: 30px;
  margin-left: 6px;
  margin-bottom: 5px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 32px;
`
export const Bold = styled.span`
  color: ${theme('article.title')};
  font-weight: 500;
`
export const P = styled.p`
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 25px;
  width: 500px;
  line-height: 1.75;
`
