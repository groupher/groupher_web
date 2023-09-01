import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-center')};
`
export const Button = styled.div`
  ${css.row('align-center')};
  border: 1px solid;
  border-color: ${theme('comment.indentLine')};

  border-radius: 10px;
  padding: 0 2px;
  padding-right: 5px;

  &:hover {
    border-color: ${theme('comment.indentActive')};
    cursor: pointer;
  }

  transition: 0.2s all;
`
export const UpWrapper = styled.div`
  margin-left: 5px;
  transform: scale(0.8);
  margin-top: 4px;
`
export const Alias = styled.div`
  color: ${theme('article.info')};
  margin-top: 1px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 5px;
  word-break: keep-all;
`
export const CountWrapper = styled.div`
  margin-left: 1px;
  margin-right: 3px;
  margin-top: -1px;
  transform: scale(0.88);
`
