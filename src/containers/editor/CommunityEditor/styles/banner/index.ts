import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('justify-center')};

  width: 100%;
  position: relative;
  min-height: 170px;
  border-bottom: 1px solid;
  border-bottom: ${theme('banner.spliter')};
`
export const SloganTextWrapper = styled.div<{ $highlight: boolean }>`
  margin-left: 3px;
  margin-right: 3px;

  font-weight: ${({ $highlight }) => ($highlight ? 'bold' : '')};
  color: ${({ $highlight }) => ($highlight ? theme('article.title') : theme('article.digest'))};
`
