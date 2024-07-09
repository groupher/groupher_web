import styled, { css, theme } from '~/css'

import { HighlightWord } from '..'

export { FeatList } from '..'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  height: 200px;
`
export const Digest = styled.div`
  font-size: 18px;
  color: ${theme('article.title')};
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: 76px;
`
export const Highlight = styled(HighlightWord)`
  color: ${theme('rainbow.blue')};
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
