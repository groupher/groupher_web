import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

import CheckSVG from '@/icons/CheckBold'
import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-start')};
  width: 52%;
  height: 430px;
`
export const Title = styled.div`
  /* color: ${theme('article.title')}; */
  color: #ec6760;
  font-size: 30px;
  font-weight: 600;
`
export const Desc = styled.div`
  font-size: 17px;
  ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;
`

export const FeatList = styled.div`
  ${css.flexColumn()};
  gap: 18px 0;
  margin-top: 28px;
`
export const FeatItem = styled.div`
  ${css.flex('align-center')};
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(16)};
  fill: #ec6760;
  margin-right: 14px;
`
export const FeatText = styled.div`
  color: ${theme('article.digest')};
  font-size: 17px;
`

export const MoreLink = styled(Link)`
  ${css.flex('align-center')};
  text-decoration: none;
`
export const MoreText = styled.div`
  color: #ec6760;
  font-weight: 600;
  font-size: 18px;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(14)};
  fill: #ec6760;
  margin-left: 10px;
  transform: rotate(180deg);
`
