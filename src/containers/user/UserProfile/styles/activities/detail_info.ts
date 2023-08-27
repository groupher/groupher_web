import styled from 'styled-components'

import css, { theme } from '@/css'
import EditPenSVG from '@/icons/EditPen'

export const Wrapper = styled.div<{ first: boolean }>`
  position: relative;
  ${css.flexColumn()};
  padding: 10px 30px;
  color: ${theme('article.digest')};
  min-height: ${({ first }) => (first ? '130px' : '100px')};
  border-left: 3px solid;
  border-left-color: #103d46;

  padding-top: ${({ first }) => (first ? '40px' : '10px')};
`
export const IconWrapper = styled.div<{ first: boolean }>`
  position: absolute;
  top: ${({ first }) => (first ? '43px' : '13px')};
  left: -13px;
  ${css.circle(23)};
  ${css.flex('align-both')};
  background: #033d45;
`
export const Icon = styled(EditPenSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
`
export const Content = styled.div``
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;

  ${css.media.mobile`
    ${css.cutRest('200px')};
  `};
`
export const Digest = styled.div`
  color: ${theme('article.digest')};
  ${css.cutRest('400px')};
  font-size: 13px;
  padding-top: 4px;

  ${css.media.mobile`
    ${css.cutRest('200px')};
  `};
`
