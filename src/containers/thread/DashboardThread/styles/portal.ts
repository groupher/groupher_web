import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div``
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 19px;
  width: auto;

  ${css.media.mobile`
    display: none;
  `};
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-top: 10px;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(15)};
  fill: ${theme('article.title')};
  margin-left: 5px;
  transform: rotate(-90deg);
`

export const MobileTitle = styled.div`
  font-size: 17px;
  display: none;

  ${css.media.mobile`
    ${css.flex('align-center')};
  `};
`

export const MobileMenu = styled.div`
  width: 200px;
  height: 500px;
  overflow: scroll;
  display: none;

  ${css.media.mobile`
    display: block;
  `};
`
