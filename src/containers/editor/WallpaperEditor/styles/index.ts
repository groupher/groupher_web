import styled from 'styled-components'

import type { TTestable } from '@/spec'
import { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  height: 100%;
  position: relative;
`
export const Banner = styled.div`
  padding: 20px 62px;
`
export const Title = styled.div`
  font-size: 17px;
  color: ${theme('article.title')};
  font-weight: bold;
  margin-bottom: 16px;
  margin-left: 2px;
`
export const Content = styled.div`
  padding: 0 30px;
  height: 100%;
`
