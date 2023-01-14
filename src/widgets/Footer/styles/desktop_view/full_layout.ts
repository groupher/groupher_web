import styled from 'styled-components'
import Link from 'next/link'

import type { TMetric } from '@/spec'
import css, { theme } from '@/utils/css'

import HeartSVG from '@/icons/Heart'

export const Wrapper = styled.footer`
  ${css.flexColumn('align-center')};
  width: 100%;
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
  // 20 是经典布局为缩小帖子列表"视觉宽度"手动缩小的值

  ${css.flex('justify-between')};
  margin-top: 20px;
  margin-bottom: 30px;

  &:hover {
    opacity: 1;
  }
  transition: opacity 0.25s;

  ${css.media.laptopM`
    padding: 15px;
  `}

  ${css.media.tablet`display: none;`};
`

export const BrandWrapper = styled.div`
  ${css.flexColumn()};
  width: 45%;
  height: 100px;
`
export const BrandTitle = styled.div`
  color: ${theme('article.title')};
  font-weight: 600;
  font-size: 18px;
`
export const BrandDesc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 4px;
  font-size: 13px;
  opacity: 0.8;
`
export const SocialInfo = styled.div``

export const Column = styled.div`
  ${css.flexColumn()};
  min-width: 105px;
  opacity: 0.8;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
`
export const Body = styled.div`
  ${css.flexColumn('justify-start')};
  color: ${theme('footer.text')};
`
type TItem = { normal?: boolean; offsetTop?: string }
export const Item = styled(Link)<TItem>`
  color: ${theme('article.digest')};
  margin-left: -1px;

  font-size: 14px;
  margin-bottom: 10px;
  margin-top: ${({ offsetTop }) => offsetTop || '0'};
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    text-decoration: none;
    cursor: pointer;
  }
  transition: color 0.2s;
`
export const LinkItem = styled(Link)`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  margin-bottom: 10px;
  margin-left: -1px;
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`

export const HeartIcon = styled(HeartSVG)`
  ${css.size(13)};
  fill: ${theme('baseColor.red')};
  margin-top: 2px;
  margin-right: 6px;
`
