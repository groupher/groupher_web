import styled from 'styled-components'

import type { TTestable } from '@/spec'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>``

export const Label = styled.div`
  ${css.row('align-center')};
`
export const Icon = styled(Img)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
`
export const Text = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-right: 5px;
`
