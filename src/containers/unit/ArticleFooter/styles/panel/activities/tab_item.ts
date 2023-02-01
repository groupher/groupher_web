import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import TagSVG from '@/icons/Tag'

export { Item, Content, Highlight } from '.'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  position: relative;
  width: 100%;
`
export const TagIcon = styled(TagSVG)`
  ${css.size(13)};
  fill: ${theme('lightText')};
  margin-right: 9px;
`