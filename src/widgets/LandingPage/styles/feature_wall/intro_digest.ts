import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-start')};
  width: 45%;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
`
export const Desc = styled.div`
  font-size: 17px;
  ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;
`
