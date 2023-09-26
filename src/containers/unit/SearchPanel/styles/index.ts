import styled from 'styled-components'

import type { TTestable } from '@/spec'
import Input from '@/widgets/Input'

import { theme } from '@/css'

export const Wrapper = styled.article.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 40px 40px;
  //
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 10px;
  margin-left: 2px;
`
export const SearchInput = styled(Input)``
