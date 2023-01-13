import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  height: auto;
`
export const Slogan = styled.div`
  ${css.flexColumn('align-both')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 38px;
  font-weight: 500;
  position: relative;
`

export const Desc = styled.div`
  font-size: 17px;
  ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;
`
//
export const Wall = styled.div`
  ${css.flexColumn('align-both')};
  width: 100%;
  margin-top: -120px;
`

export const FeatList = styled.div`
  ${css.flexColumn()};
  gap: 18px 0;
  margin-top: 28px;
`
