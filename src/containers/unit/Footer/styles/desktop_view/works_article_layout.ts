import Link from 'next/link'
import styled from 'styled-components'

import METRIC from '@/constant/metric'
import css, { theme } from '@/utils/css'

export { NoLinkItem } from './article_layout'
export { HeartCrabIcon } from './home_layout'

export const Wrapper = styled.div`
  ${css.flexColumn('align-end')};
  width: 100%;
  ${css.fitContentWidth(METRIC.WORKS_ARTICLE)};
`
export const InnerWrapper = styled.div`
  width: 100%;
`
export const MainInfos = styled.footer`
  margin-bottom: 20px;
  ${css.media.tablet`display: none;`};
`
const LinkBase = styled(Link)`
  text-decoration: none;
  font-weight: bolder;
  color: ${theme('footer.text')};
  transition: color 0.3s;
  &:hover {
    text-decoration: underline;
    color: ${theme('footer.hover')};
  }
`
export const BaseInfo = styled.div`
  ${css.flex()};
`
export const Item = styled(LinkBase)`
  ${css.flex('align-center')};
  margin-right: 25px;
`
