import type { TTestable, TSpace } from '~/spec'

import EnterSVG from '~/icons/Enter'
import styled, { css, theme } from '~/css'

type TWrapper = TSpace & TTestable

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.row('align-center')};
  position: absolute;
  left: ${({ left }) => `${left}px`};
  right: ${({ right }) => `${right}px`};
  top: ${({ top }) => `${top}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  opacity: 0.6;
`
export const EnterIcon = styled(EnterSVG)`
  fill: ${theme('article.digest')};
  ${css.size(12)};
  margin-right: 5px;
  transform: rotateY(180deg);
`
export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
