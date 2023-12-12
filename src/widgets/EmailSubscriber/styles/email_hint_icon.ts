import type { TTestable } from '@/spec'
import Img from '@/Img'
import styled, { css, theme, animate } from '@/css'

import { Wrapper as ParentWrapper } from '.'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
`
export const MailIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  transform: rotate(10deg);
  margin-right: 12px;

  ${ParentWrapper}:hover & {
    animation: ${animate.shake} 10s linear;
  }
`
export const CurveLineIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(24)};
  margin-right: 10px;
  transform: rotateZ(386deg);
`
export const MailBoxIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(20)};
`
