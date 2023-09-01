import Link from 'next/link'
import styled from 'styled-components'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import css, { theme } from '@/css'

import Img from '@/Img'
import ArrowSVG from '@/icons/Arrow'
import DotDivider from '@/widgets/DotDivider'

export const Wrapper = styled.div<{ metric: TMetric }>`
  ${css.column('align-start')};
  margin-left: 20px;
  margin-top: 50px;
  position: relative;
`
export const Topping = styled.div`
  ${css.row('align-both')};
  margin-left: -2px;
  margin-bottom: 16px;
  margin-top: -5px;
  position: relative;
`
export const BackBtnWrapper = styled.div`
  ${css.row('align-both')};
  padding: 2px 5px;
  border-radius: 8px;
  color: ${theme('article.digest')};

  &:hover {
    background: ${theme('hoverBg')};
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 5px;
  opacity: 0.6;

  ${BackBtnWrapper}:hover & {
    opacity: 1;
  }
`
export const CommunityInfo = styled.div`
  ${css.row('align-start', 'justify-center')};
  margin-top: 5px;
  ${css.fitStickerWidth(METRIC.ARTICLE)};
`
export const Title = styled.div`
  font-size: 26px;
  color: ${theme('article.title')};
  margin-bottom: 14px;
  max-width: 620px;

  ${css.media.mobile`
    font-size: 20px;
    margin-bottom: 15px;
  `};
`

export const SubTitle = styled.span`
  display: inline-block;
  color: ${theme('article.digest')};
  opacity: 0.4;
  font-size: 22px;
  margin-left: 10px;
  margin-top: -2px;

  &:before {
    content: '#';
    margin-top: 1px;
    margin-right: 3px;
    font-size: 19px;
  }
`
export const BottomInfo = styled.div`
  ${css.row('align-center', 'justify-between')};
  padding-bottom: 30px;

  width: 100%;
  color: ${theme('article.digest')};
`
export const Avatar = styled(Img)`
  ${css.size(16)};
  border-radius: 4px;
  margin-right: 8px;
`
export const AuthorName = styled(Link)`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  text-decoration: none;
  font-size: 14px;
  margin-top: 1px;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.digest')};
    cursor: pointer;
  }
`

export const Divider = styled(DotDivider)`
  margin-right: 12px;
`
