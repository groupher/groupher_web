import styled, { css, theme } from '~/css'

import TagSVG from '~/icons/Tag'
import GtdWipSVG from '~/icons/GtdWip'

export { Item, Content, Highlight } from '.'

export const TagIcon = styled(TagSVG)`
  ${css.size(13)};
  fill: ${theme('lightText')};
  margin-right: 9px;
`
export const GtdWipIcon = styled(GtdWipSVG)`
  ${css.size(15)};
  fill: ${theme('lightText')};
  margin-right: 9px;
  margin-left: -2px;
`
