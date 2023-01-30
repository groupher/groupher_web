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
  ${css.flexColumn('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};

  border-radius: 10px;
  padding: 8px 10px;

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
