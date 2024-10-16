import type { TTestable } from '~/spec'
import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>``

export const Tail = styled(Img)`
  position: absolute;
  fill: #257f7c; // ${theme('article.digest')};
  opacity: 0.8;
  ${css.size(16)};
  top: 24px;
  left: -2px;
  transform: rotate(-10deg);
  z-index: 1;

  transition: all 0.2s;
`
