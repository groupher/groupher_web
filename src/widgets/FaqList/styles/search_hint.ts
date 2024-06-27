import Link from 'next/link'

import type { TColorName, TTestable } from '~/spec'

import styled, { css, theme, rainbow } from '~/css'

import FAQSVG from '~/icons/FAQ'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column()};
  width: 100%;
  min-width: 320px;
  color: ${theme('article.digest')};

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
  color: ${theme('article.digest')};
  font-size: 13px;
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
  width: 45%;
  padding-left: 15px;
  margin-left: 2px;
  margin-bottom: 22px;
  position: relative;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

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
    background-color: ${({ color }) => rainbow(color)};
    opacity: 0.5;
  }
`
export const CatItem = styled(Link)`
  ${css.lineClamp(1)}
  font-size: 13px;
  color: ${theme('article.title')};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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
