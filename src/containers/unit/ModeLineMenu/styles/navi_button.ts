import type { TTestable } from '~/spec'
import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 68px;
  position: relative;
  /* height: 74px; */
`
export const Icon = styled(Img)<{ type: string }>`
  fill: ${theme('article.title')};
  ${css.circle(32)};
  padding: 8px;
  padding: ${({ type }) => (type === 'avatar' ? '2px' : '8px')};
  background: #023544;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  margin-top: 8px;
  ${css.cutRest('80px')};
`

export const Desc = styled.div`
  position: absolute;
  bottom: -18px;
  color: ${theme('hint')};
  font-size: 12px;
  ${css.cutRest('80px')};
`
