import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  line-height: 24px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
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
export const ShareItem = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
`
