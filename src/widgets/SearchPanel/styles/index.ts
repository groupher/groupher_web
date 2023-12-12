import type { TTestable } from '@/spec'

import CloseSVG from '@/icons/CloseLight'
import Input from '@/widgets/Input'

import styled, { css, theme } from '@/css'

export const Wrapper = styled.article.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  padding: 40px 40px;
  height: 100%;
  position: relative;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 10px;
  margin-left: 2px;
`
export const SearchInput = styled(Input)``

export const CloseIcon = styled(CloseSVG)`
  ${css.size(24)};
  fill: ${theme('hint')};
  position: absolute;
  right: 20px;
  top: 15px;
  cursor: pointer;

  &:hover {
    fill: ${theme('article.digest')};
  }
`
