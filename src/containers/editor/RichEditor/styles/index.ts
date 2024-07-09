import styled, { css, theme } from '~/css'

import { getWidth, getMinHeight } from './metric'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  position: relative;
  width: 100%;
  /* height: 100%; */
`
export const InnerWrapper = styled.div<{ type: string }>`
  width: ${({ type }) => getWidth(type)};
`
const EditWrapperBase = styled.div<{ type: string }>``
export const EditorWrapper = styled(EditWrapperBase).attrs(() => ({
  spellCheck: false,
}))`
  color: ${theme('article.title')};
  min-height: ${({ type }) => getMinHeight(type)};
  // media therdhold is 651
  width: 100%;
  padding-top: 10px;
  padding-bottom: 32px;
  padding-left: 10px;
  padding-right: 0;
  /* background: #052630; */
`
