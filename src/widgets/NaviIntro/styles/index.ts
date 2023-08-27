import styled from 'styled-components'

import type { TTestable } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center')};
  margin-bottom: 15px;
  padding-bottom: 18px;
  border-bottom: 1px solid;
  border-bottom-color: #054351;
`
export const Logo = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(30)};
`
export const Digest = styled.div`
  ${css.flexColumn('align-start')};
  margin-left: 12px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  font-weight: bold;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
