import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

import { Wrapper as WrapperBase, Entry as EntryBase } from '.'

export const Wrapper = styled(WrapperBase)`
  width: 100%;
`
export const BodyWrapper = styled.div`
  ${css.rowWrap('align-center')};
`
export const Entry = styled(EntryBase)<{ index: number }>`
  ${css.row('align-center')};
  width: 48%;
  height: auto;
  margin-bottom: 10px;
  margin-right: ${({ index }) => (index % 2 !== 0 ? '0' : '10px')};
  background: #0d3442;
  border-radius: 8px;
  padding: 10px 8px;
`
export const Logo = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(20)};

  ${Entry}:hover & {
    fill: #2d7eb1; /* primaryColor */
    cursor: pointer;
  }
`
export const Intro = styled.div`
  ${css.column('align-start')};
  margin-top: 8px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 12px;

  ${Entry}:hover & {
    color: #2d7eb1; /* primaryColor */
    cursor: pointer;
  }
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  ${css.cutRest('100px')};
  font-size: 11px;
  margin-top: 2px;
`
