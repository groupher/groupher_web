import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

import FAQSVG from '@/icons/FAQ'
import CheckSVG from '@/icons/Check'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn()};
  width: 100%;
  min-width: 320px;
`
export const Header = styled.div<{ large: boolean }>`
  ${css.flex('align-both')};
  margin-bottom: ${({ large }) => (large ? '65px' : '50px')};
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
`
export const Content = styled.div`
  ${css.flex('justify-between')};
  flex-wrap: wrap;
  gap: 60px 0;
`
export const Section = styled.div<{ large: boolean }>`
  ${css.lineClamp(2)}
  width: 28%;
  font-size: ${({ large }) => (large ? '16px' : '15px')};
  color: ${theme('article.title')};
  font-weight: 400;

  transition: all 0.2s;
`
export const SectionHead = styled.div`
  ${css.flex('align-center')};
`
export const Title = styled.div<{ large: boolean }>`
  ${css.cutRest('250px')};
  color: ${theme('article.title')};
  font-size: ${({ large }) => (large ? '17px' : '15px')};
  font-weight: 500;
`
export const CheckIconWrapper = styled.div<{ large: boolean }>`
  ${css.size(16)};
  margin-right: ${({ large }) => (large ? '15px' : '10px')};
`
export const CheckIcon = styled(CheckSVG)<{ large: boolean }>`
  fill: ${theme('baseColor.greenLight')};
  ${({ large }) => css.size(large ? 18 : 16)};
`
export const Desc = styled.div<{ large: boolean }>`
  ${css.lineClamp(3)};
  color: ${theme('article.digest')};
  font-size: ${({ large }) => (large ? '16px' : '14px')};
  opacity: 0.8;
  margin-top: 15px;
  padding-left: ${({ large }) => (large ? '30px' : '25px')};
  line-height: 1.7;
`
