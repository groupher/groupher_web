import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'
import ArchivedSVG from '@/icons/Archived'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center')};
  padding: 0 8px;
  cursor: default;
`
export const SignIcon = styled(ArchivedSVG)`
  ${css.size(12)};
  fill: ${theme('article.info')};
  margin-right: 5px;

  ${Wrapper}:hover & {
    fill: ${theme('article.info')};
  }
`
export const Text = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;

  ${Wrapper}:hover & {
    color: ${theme('article.info')};
  }
`
