import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>``

export const ContributesWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 10px;

  ${css.media.mobile`
    padding: 0 15px;
  `};
`
export const Divider = styled.div`
  width: 100%;
  padding: 0 5px;
  height: 1px;
  background: ${theme('article.digest')};
  opacity: 0.2;
  margin-top: 40px;
  margin-bottom: 40px;
`
