import Link from 'next/link'

import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

import { L_MENU_HEIGHT } from '../metrics/index'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-both')};
  height: ${L_MENU_HEIGHT};
  margin-top: -20px;
`
export const A = styled(Link)`
  color: ${theme('article.title')};
  text-decoration: none;

  &:active {
    color: ${theme('article.title')};
    text-decoration: none;
  }

  &:hover {
    color: ${theme('article.title')};
    text-decoration: none;
  }
`
export const Title = styled.div`
  color: ${theme('article.title')};
`
