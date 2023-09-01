import styled from 'styled-components'

import css, { theme } from '@/css'
import ArrowSVG from '@/icons/ArrowSolid'

export const Wrapper = styled.div`
  position: relative;
  ${css.row('align-both')};
  margin-bottom: 34px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 22px;
  font-weight: 500;
  margin-left: -35px;

  ${css.media.mobile`
    margin-left: -10px;
  `};
`
export const MenuIcon = styled(ArrowSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);
`
export const MenuWrapper = styled.div`
  cursor: pointer;
  margin-left: 5px;
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.3s;
`
