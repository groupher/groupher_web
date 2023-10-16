import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

import FAQSVG from '@/icons/FAQ'
import CheckSVG from '@/icons/Check'

import { MarkdownStyles } from '@/widgets/Common'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column()};
  width: 100%;
  min-width: 320px;
`
export const Header = styled.div<{ large: boolean }>`
  ${css.row('align-both')};
  margin-bottom: ${({ large }) => (large ? '65px' : '50px')};

  ${css.media.mobile`
    margin-bottom: 35px;
  `};
`
export const FAQIcon = styled(FAQSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 10px;
  opacity: 0.8;
  margin-top: 2px;
`
export const BrandText = styled.div<{ large: boolean }>`
  color: ${theme('article.title')};
  font-weight: bold;
  font-size: ${({ large }) => (large ? '26px' : '20px')};

  ${css.media.mobile`
    font-size: 22px;
  `};
`
export const Content = styled.div<{ large: boolean }>`
  ${css.rowWrap('justify-between')};
  gap: ${({ large }) => (large ? '45px' : '50px')};

  ${css.media.mobile`
    ${css.row('justify-around')};
    gap: 20px 10px;
    padding: 0 15px;
  `};
`
export const Section = styled.div<{ large: boolean }>`
  ${css.lineClamp(2)}
  width: 28%;
  font-size: ${({ large }) => (large ? '16px' : '15px')};
  color: ${theme('article.title')};
  font-weight: 400;

  transition: all 0.2s;

  ${css.media.mobile`
    width: 45%;
  `};
`
export const SectionHead = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div<{ large: boolean }>`
  ${css.cutRest('250px')};
  color: ${theme('article.title')};
  font-size: ${({ large }) => (large ? '16px' : '15px')};
  font-weight: 500;

  ${css.media.mobile`
    ${css.cutRest('280px')};
    font-size: 14px;
  `};
`
export const CheckIconWrapper = styled.div<{ large: boolean }>`
  ${css.size(16)};
  margin-right: ${({ large }) => (large ? '15px' : '10px')};

  ${css.media.mobile`
    margin-right: 6px;
  `};
`
export const CheckIcon = styled(CheckSVG)<{ large: boolean }>`
  fill: ${theme('rainbow.greenLight')};
  ${({ large }) => css.size(large ? 17 : 16)};

  ${css.media.mobile`
    ${css.size(14)};
  `};
`
export const Body = styled(MarkdownStyles)<{ large: boolean }>`
  ${css.lineClamp(3)};
  color: ${theme('article.digest')};
  font-size: ${({ large }) => (large ? '15px' : '14px')};
  opacity: 0.8;
  margin-top: 15px;
  padding-left: ${({ large }) => (large ? '30px' : '25px')};
  line-height: 1.7;

  ${css.media.mobile`
    font-size: 13px;
    margin-top: 8px;
    padding-left: 20px;
  `};
`
