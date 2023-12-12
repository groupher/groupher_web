import styled, { css, theme } from '@/css'

import TagSVG from '@/icons/Tag'

export { Item, Content, Highlight } from '.'

export const Wrapper = styled.div`
  ${css.column()};
  position: relative;
  width: 100%;
`
export const TagIcon = styled(TagSVG)`
  ${css.size(13)};
  fill: ${theme('lightText')};
  margin-right: 9px;
`
