import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'
import FAQSVG from '@/icons/FAQ'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn()};
  width: 320px;
  min-width: 320px;
  color: ${theme('article.digest')};
  padding-top: 25px;
  padding-left: 50px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
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
`
export const Section = styled.div`
  ${css.lineClamp(2)}
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 400;
  margin-bottom: 14px;

  &:hover {
    font-weight: 500;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const Footer = styled.div`
  ${css.flex('align-center')};
  margin-top: 15px;
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
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
