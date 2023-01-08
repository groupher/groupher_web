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
  margin-top: 30px;
  width: 100%;
`

export const FeatBlock = styled.div`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  height: 730px;
  padding: 0 15%;

  background: radial-gradient(circle at 60% 50%, #e58a7894 0, transparent 30%),
    radial-gradient(circle at 80% 30%, #ddecf14a, transparent 30%);
`
