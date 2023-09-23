import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'
import ArrowSVG from '@/icons/ArrowUpRight'
import Img from '@/Img'

export const Wrapper = styled.div``

export const PreviewWrapper = styled.div`
  ${css.row('align-center')};
  width: 300px;
  margin-bottom: 10px;
  margin-top: 15px;
`
export const Brand = styled.div`
  ${css.row('align-center')};
  background: ${theme('hoverBg')};
  padding: 2px 5px;
  border-radius: 4px;
  margin-right: 8px;
`
export const Favicon = styled(Img)`
  ${css.size(16)};
  margin-right: 5px;
`
export const SiteName = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  word-break: keep-all;
`
export const Title = styled(Link)`
  color: ${theme('article.digest')};
  text-decoration: none;
  font-size: 14px;
  ${css.cutRest('130px')};
  margin-top: -1px;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.digest')};
  }
`
export const ArrowBox = styled.div`
  ${css.size(14)};
  opacity: 0;
  ${PreviewWrapper}:hover & {
    opacity: 1;
  }
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(14)};
  fill: ${theme('hint')};
`
