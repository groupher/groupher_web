import Link from 'next/link'
import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.article.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
`
export const Note = styled.div`
  font-size: 12px;
  color: ${theme('thread.articleDigest')};
  margin-bottom: 5px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`

export const Addr = styled(Link)`
  color: ${theme('thread.articleDigest')};
  text-decoration: none;
  margin-left: 2px;
  margin-right: 2px;

  &:hover {
    color: ${theme('thread.articleTitle')};
  }

  transition: all 0.2s;
`
