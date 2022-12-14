import Link from 'next/link'
import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.article.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  margin-top: 50px;
`
export const Note = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.6;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`

export const Addr = styled(Link)`
  font-size: 12px;
  color: ${theme('article.digest')};
  text-decoration: none;
  margin-left: 2px;
  margin-right: 2px;

  &:hover {
    color: ${theme('article.title')};
    text-decoration: underline;
  }

  transition: all 0.2s;
`

export const BottomWrapper = styled.div`
  margin-top: 5px;
  ${css.flex('align-center')};
`
