import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'
import Img from '@/Img'

import { SubTitleWrapper } from '.'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  position: absolute;
  top: 21px;
  left: -66px;
  ${css.row('align-center')};
  width: 60px;
  cursor: pointer;
  visibility: hidden;

  ${SubTitleWrapper}:hover & {
    visibility: visible;
  }

  transition: visibility 0.2s;
`
export const Icon = styled(Img)`
  fill: ${theme('editor.placeholder')};
  ${css.size(12)};

  ${Wrapper}:hover & {
    fill: ${theme('rainbow.red')};
  }
`
export const Title = styled.div`
  font-size: 12px;
  color: ${theme('editor.placeholder')};
  margin-left: 5px;

  ${Wrapper}:hover & {
    color: ${theme('rainbow.red')};
  }
`
