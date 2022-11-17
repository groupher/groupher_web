import Link from 'next/link'
import styled from 'styled-components'

import type { TMetric } from '@/spec'
import { METRIC } from '@/constant'
import css, { theme } from '@/utils/css'

export const Main = styled.div<{ metric: TMetric }>`
  ${({ metric }) => css.fitContentWidth(metric)};
  width: 100%;
  margin-top: 78px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 14px;
  position: relative;
`
export const PublishDateInfo = styled.div`
  font-size: 10px;
  color: ${theme('article.digest')};
`
export const CommunityInfo = styled.div`
  ${css.flex('align-start', 'justify-center')};
  margin-top: 5px;
  ${css.fitStickerWidth(METRIC.ARTICLE)};
`
export const Title = styled.div`
  font-size: 26px;
  color: ${theme('article.title')};
  margin-bottom: 30px;
  ${css.lineClamp(3)};
`
export const BottomInfo = styled.div`
  ${css.flex('align-center', 'justify-between')};
  padding-bottom: 30px;
  border-bottom: 1px solid;
  padding-left: 2px;
  padding-right: 2px;
  border-bottom-color: ${theme('border')};
  width: 100%;
  color: ${theme('article.digest')};
`
export const AuthorName = styled(Link)`
  color: ${theme('article.digest')};
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 1px;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.digest')};
    cursor: pointer;
  }
`
