import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  font-size: 13px;
  margin-bottom: 3px;
`
export const Home = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
  }

  transition: all 0.2s;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(9)};
  fill: ${theme('article.digest')};
  opacity: 0.6;
  margin-right: 7px;

  ${Home}:hover & {
    fill: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Slash = styled.div`
  font-size: 10px;
  color: ${theme('article.info')};
  margin-left: 7px;
  margin-right: 7px;
`
export const Cur = styled.div`
  color: ${theme('article.digest')};
`
