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
export const Header = styled.div`
  ${css.flex('align-both')};
  margin-bottom: 50px;
`
export const FAQIcon = styled(FAQSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 10px;
  opacity: 0.8;
  margin-top: 2px;
`
export const BrandText = styled.div`
  color: ${theme('article.title')};
  font-weight: bold;
  font-size: 20px;
`
export const Content = styled.div`
  ${css.flex('justify-between')};
  flex-wrap: wrap;
  gap: 60px 0;
`
export const Section = styled.div`
  ${css.lineClamp(2)}
  width: 28%;
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 400;

  &:hover {
    font-weight: 500;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const SectionHead = styled.div`
  ${css.flex('align-center')};
`
export const Title = styled.div`
  ${css.cutRest('250px')};
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: 500;
`
export const CheckIconWrapper = styled.div`
  ${css.size(16)};
  margin-right: 10px;
`
export const CheckIcon = styled(CheckSVG)`
  fill: ${theme('baseColor.greenLight')};
  ${css.size(16)};
`

export const Desc = styled.div`
  ${css.lineClamp(3)};
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.8;
  margin-top: 15px;
  padding-left: 25px;
`
