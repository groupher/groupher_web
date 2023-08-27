import Link from 'next/link'
import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

import { L_MENU_HEIGHT } from '../metrics/index'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-both')};
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
