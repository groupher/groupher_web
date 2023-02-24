import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  position: absolute;
  left: -180px;
  top: 50px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(11)};
  fill: ${theme('article.info')};
  margin-right: 6px;
`

export const Title = styled(Link)`
  font-size: 13px;
  color: ${theme('article.info')};
  text-decoration: none;

  ${Wrapper}:hover & {
    text-decoration: underline;
  }
`
