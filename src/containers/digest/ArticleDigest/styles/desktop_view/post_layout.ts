import Link from 'next/link'
import styled from 'styled-components'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import css, { theme } from '@/utils/css'

import DotDivider from '@/widgets/DotDivider'

export const Wrapper = styled.div<{ metric: TMetric }>`
  ${({ metric }) => css.fitContentWidth(metric)};
  width: 100%;
  margin-top: 50px;
  position: relative;

  ${css.media.mobile`
    margin-top: 24px;
    margin-left: 0;
    padding: 0 20px;
  `};
`
export const Topping = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 14px;
  position: relative;

  ${css.media.mobile`
    margin-bottom: 8px;
  `};
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

  ${css.media.mobile`
    font-size: 20px;
    margin-bottom: 15px;
  `};
`
export const BottomInfo = styled.div`
  ${css.flex('align-center', 'justify-between')};
  padding-bottom: 30px;
  border-bottom: 1px solid;
  padding-left: 2px;
  padding-right: 2px;
  border-bottom-color: ${theme('divider')};
  width: 100%;
  color: ${theme('article.digest')};

  ${css.media.mobile`
    padding-left: 0;
    padding-right: 0;
  `};
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

export const Divider = styled(DotDivider)`
  margin-left: 12px;
  margin-right: 12px;

  ${css.media.mobile`
    margin-left: 8px;
    margin-right: 8px;
  `};
`
