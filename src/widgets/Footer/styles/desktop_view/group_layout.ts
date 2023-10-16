import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'

import Img from '@/Img'
import HeartSVG from '@/icons/Heart'

export const Wrapper = styled.footer`
  ${css.column('align-center')};
  width: 100%;
`
export const InnerWrapper = styled.div`
  width: 100%;

  ${css.row('justify-between')};
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
  ${css.column()};
  width: 40%;
`
export const BrandLogo = styled(Img)`
  ${css.size(35)};
`
export const BrandTitle = styled.div`
  color: ${theme('article.title')};
  font-weight: 600;
  font-size: 18px;
`
export const BrandDesc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 14px;
  font-size: 14px;
`

export const Column = styled.div`
  ${css.column()};
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
  ${css.column('justify-start')};
  color: ${theme('footer.text')};
  gap: 12px 0;
`
type TItem = { normal?: boolean; offsetTop?: string }
export const Item = styled(Link)<TItem>`
  color: ${theme('article.digest')};
  margin-left: -1px;

  font-size: 14px;
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
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  margin-left: -1px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
    cursor: pointer;
  }
`

export const HeartIcon = styled(HeartSVG)`
  ${css.size(13)};
  fill: ${theme('rainbow.red')};
  margin-top: 2px;
  margin-right: 6px;
`
