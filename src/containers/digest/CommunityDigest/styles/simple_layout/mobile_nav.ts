import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-size: 13px;
  margin-left: 2px;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
  margin-left: 2px;
`
export const Panel = styled.div`
  ${css.flexColumn()};
  gap: 14px;
  width: 140px;
  padding: 15px 20px;
`

export const Item = styled(Link)`
  color: ${theme('article.title')};
  font-size: 15px;

  text-decoration: none;
`
