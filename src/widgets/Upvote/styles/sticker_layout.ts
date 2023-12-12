import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  margin-left: -8px;
`
export const FacesWrapper = styled.div<{ count: number }>`
  margin-left: ${({ count }) => {
    if (count === 1 || count === 2) {
      return '2px'
    }

    return '5px'
  }};
`
export const Button = styled.div`
  ${css.column('align-both')};
  border: 1px solid;
  border-color: ${theme('button.upvoteBorder')};
  background: ${theme('alphaBg')};

  border-radius: 10px;
  padding: 7px 10px;
  padding-bottom: 4px;

  margin-bottom: 12px;

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
