import styled from 'styled-components'

import type { TColorName, TTestable } from '@/spec'

import css, { theme } from '@/css'
import { camelize } from '@/utils/fmt'

import FAQSVG from '@/icons/FAQ'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column()};
  width: 100%;
  min-width: 320px;
  color: ${theme('article.digest')};
  padding-top: 25px;
  margin-left: 156px;

  ${css.media.mobile`
    margin-left: 5px;
  `};
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 20px;
`
export const FAQIcon = styled(FAQSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 10px;
  opacity: 0.8;
  margin-top: 2px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Body = styled.div`
  ${css.rowWrap('align-center')};
`
export const Section = styled.div`
  width: 44%;
  ${css.lineClamp(1)}

  margin-bottom: 14px;

  ${css.media.mobile`
    width: 50%;
  `};
`
export const CatSection = styled.div<{ color: TColorName }>`
  width: 44%;
  padding-left: 15px;
  margin-left: 2px;
  margin-bottom: 22px;
  position: relative;

  ${css.media.mobile`
    width: 48%;
  `};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: 4px;
    border-radius: 5px;
    background-color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
    opacity: 0.5;
  }
`
export const CatItem = styled.div`
  ${css.lineClamp(1)}
  font-size: 13px;
  color: ${theme('article.title')};
`
export const CatDesc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.65;
  margin-top: 2px;
`
export const Item = styled.span`
  font-size: 14px;
  color: ${theme('article.digest')};
  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
  }

  transition: all 0.2s;
`

export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 15px;
  padding-top: 20px;
  font-size: 12px;
  color: ${theme('article.digest')};
`
export const MoreLink = styled.div`
  color: ${theme('link')};
  margin-left: 1px;

  &:hover {
    cursor: pointer;
  }

  transition: all 0.2s;
`
