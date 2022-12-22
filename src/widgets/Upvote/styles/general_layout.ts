import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

import { LineDivider as LineDividerBase } from '@/widgets/Common'

type TInnerWrapper = {
  testid: string
}

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TInnerWrapper>`
  ${css.flex('align-center')};
`
export const UpvoteBtnWrapper = styled.div`
  transform: scale(0.8);
  margin-top: 6px;
`
export const DescWrapper = styled.div`
  ${css.flex('align-center')};
  margin-left: 2px;
`
export const Text = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-top: 1px;
`
export const Count = styled.div<{ noOne: boolean }>`
  color: ${theme('article.info')};
  font-weight: ${({ noOne }) => (noOne ? 400 : 600)};
`
export const LineDivider = styled(LineDividerBase)`
  height: 10px;
  background: ${theme('article.digest')};
  opacity: 0.5;
  margin-left: 12px;
  margin-right: 10px;
  margin-top: 1px;
`
