import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { theme } from '@/utils/css'
import ArrowLink from '@/widgets/Buttons/ArrowLink'

// import { getPadding } from '../../metrics'

export const Wrapper = styled.footer`
  ${css.flexColumn('align-center')};
  width: 100%;
  padding-top: 30px;
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
  // 20 是经典布局为缩小帖子列表"视觉宽度"手动缩小的值
  padding: 0 20px;

  ${css.flex('justify-between')};
  margin-top: 20px;
  margin-bottom: 30px;
  padding-left: 30px;

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

export const Column = styled.div<{ margin?: string }>`
  ${css.flexColumn()};
  min-width: 105px;
  margin-right: ${({ margin }) => margin || '50px'};
  opacity: 0.8;
`
export const Title = styled.div`
  color: ${theme('footer.title')};
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold;
`
export const Body = styled.div`
  ${css.flexColumn('justify-start')};
  color: ${theme('footer.text')};
`
type TItem = { normal: boolean; offsetTop?: string }
export const Item = styled.a<TItem>`
  color: ${theme('footer.text')};

  font-size: 14px;
  margin-bottom: 10px;
  margin-top: ${({ offsetTop }) => offsetTop || '0'};
  text-decoration: none;

  &:hover {
    color: ${theme('footer.hover')};
    text-decoration: ${({ normal }) => (normal ? 'none' : 'underline')};
    cursor: pointer;
  }
  transition: color 0.2s;
`
export const LinkItem = styled(ArrowLink)`
  margin-bottom: 10px;
`
