import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn()};
  width: 200px;
  min-width: 200px;
  color: ${theme('article.digest')};
  padding-top: 25px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-bottom: 25px;
`
export const TabWrapper = styled.div`
  ${css.flex('align-center')};
  position: relative;
  margin-bottom: 25px;
  margin-left: -10px;

  &:before {
    content: '';
    height: 1px;
    width: 180px;
    position: absolute;
    left: 13px;
    bottom: 0;
    background: lightgrey;
    opacity: 0.5;
  }
`
