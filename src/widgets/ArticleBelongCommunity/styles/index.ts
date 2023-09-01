import Link from 'next/link'
import styled from 'styled-components'

import type { TTestable } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'
import SiteLogo from '@/icons/CPLogo'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
  position: relative;
`
export const HomeLogo = styled(SiteLogo)`
  ${css.size(32)};
  fill: #007fa8;
`
export const Icon = styled(Img)`
  ${css.size(32)};
  fill: ${theme('article.digest')};
`
export const Name = styled(Link)`
  text-decoration: none;
  color: ${theme('article.title')};
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 2px;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
export const JoinDesc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-top: 1px;
  margin-bottom: 10px;
`
