import styled from 'styled-components'

import type { TTestable } from '@/spec'
import { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  position: relative;
  height: 100%;
`
export const Banner = styled.div`
  padding: 20px 30px;
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
  overflow-y: scroll;
  overflow-x: hidden;
`
