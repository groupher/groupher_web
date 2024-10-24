import type { TTestable } from '~/spec'
// import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  flex-grow: 1;
  font-size: 14px;
`
export const OptionWrapper = styled.div`
  opacity: 0.8;
  padding-right: 5px;

  ${Wrapper}:hover & {
    opacity: 1;
  }
  transition: opacity 0.2s;
`
