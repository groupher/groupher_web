import Link from 'next/link'
import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import css, { theme } from '@/css'
import DotDividerBase from '@/widgets/DotDivider'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  font-size: 15px;
  width: 100%;
`
export const DotDivider = styled(DotDividerBase)`
  background-color: transparent;
`
type TSiteLink = TTestable & TActive
export const SiteLink = styled(Link).attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TSiteLink>`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-weight: ${({ active }) => (active ? 600 : 400)};

  height: 33px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    color: ${theme('article.info')};
  }
`
