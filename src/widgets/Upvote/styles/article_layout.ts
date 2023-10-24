import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
`
export const Button = styled.div`
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('button.upvoteBorder')};
  background: ${theme('alphaBg')};

  border-radius: 10px;
  padding: 12px 46px;
  padding-top: 13px;
  padding-left: 44px;

  &:hover {
    border-color: ${theme('lightText')};
    cursor: pointer;
  }

  transition: 0.2s all;
`
export const CountWrapper = styled.div`
  margin-left: 8px;
`
export const Alias = styled.div`
  font-size: 15px;
  color: ${theme('article.info')};
  margin-left: 5px;
  font-weight: 400;
`
