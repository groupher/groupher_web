import styled, { css, theme } from '@/css'

import { HighlightWord } from '..'

export { FeatList } from '..'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  height: 200px;

  *::selection {
    background-color: ${theme('rainbow.blue')} !important;
    color: white;
  }
`
export const Digest = styled.div`
  font-size: 18px;
  color: ${theme('hint')};
  margin-bottom: 20px;
  opacity: 0.9;
  margin-top: 10px;
  margin-left: 76px;
`
export const Highlight = styled(HighlightWord)`
  color: ${theme('rainbow.blue')};
  opacity: 0.9;
`
export const InnerWrapper = styled.div`
  ${css.column('align-start')};
  width: 800px;
`
export const FeatureWrapper = styled.div`
  ${css.row()};
  margin-left: 76px;
  flex-wrap: wrap;
`
export const FeatureItem = styled.div`
  width: 33%;
  margin-bottom: 10px;
`
