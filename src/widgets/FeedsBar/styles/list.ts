import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const ListItemWrapper = styled.div`
  width: 100%;
  color: ${theme('article.digest')};
  border-bottom: 1px solid;
  border-bottom-color: #034256;
  padding: 10px;

  &:last-child {
    border-bottom: none;
  }
`
export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 4px;
  color: ${theme('article.digest')};
`
export const Icon = styled(Img)`
  ${css.circle(13)};
  margin-right: 6px;
`
export const InfoIcon = styled(Img)`
  ${css.circle(13)};
  fill: ${theme('article.digest')};
  margin-left: 5px;
  opacity: 0;

  ${Header}:hover & {
    fill: ${theme('article.title')};
    cursor: pointer;
    opacity: 1;
  }
  transition: all 0.2s;
`
export const Timestamp = styled.div`
  ${css.flex()};
  color: ${theme('article.digest')};
  font-size: 12px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
