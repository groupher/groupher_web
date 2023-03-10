import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

type TInnerWrapper = {
  testid: string
}

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TInnerWrapper>`
  ${css.flexColumn('align-both')};
`
export const Alias = styled.div`
  font-size: 13px;
  color: ${theme('article.info')};
  font-weight: 400;
`
export const Button = styled.div`
  ${css.flexColumn('align-both')};
  border: 1px solid;
  border-color: ${theme('button.upvoteBorder')};
  background: ${theme('alphaBg')};

  margin-top: -3px;
  border-radius: 10px;
  padding: 7px 10px;
  padding-bottom: 7px;
  margin-bottom: 8px;

  &:hover {
    border-color: ${theme('lightText')};
    cursor: pointer;
  }

  transition: 0.2s all;
`
export const UpWrapper = styled.div`
  margin-left: 5px;
`
export const CountWrapper = styled.div`
  margin-top: -4px;
`
