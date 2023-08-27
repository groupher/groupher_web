import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'

import { LineDivider } from '@/widgets/Common'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div<{ lineHeight: boolean }>`
  ${css.flex('align-center')};
  line-height: ${({ lineHeight }) => (lineHeight ? '24px' : '')};
`
export const Title = styled.div<{ withMaxWidth: boolean }>`
  font-size: 13px;
  color: ${theme('article.title')};

  ${({ withMaxWidth }) => (withMaxWidth ? css.lineClamp(1) : '')};
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
  margin-left: 2px;

  ${css.media.mobile`
    opacity: 0.6;
  `};
`

export const ModelineDivider = styled(LineDivider)`
  background-color: ${theme('article.digest')};
  opacity: 0.5;
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
