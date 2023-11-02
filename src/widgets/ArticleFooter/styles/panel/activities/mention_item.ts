import styled from 'styled-components'

import css, { theme } from '@/css'

import MentionSVG from '@/icons/Mention'

export { Item, Content, Highlight } from '.'

export const MentionIcon = styled(MentionSVG)`
  ${css.size(12)};
  fill: ${theme('lightText')};
  margin-right: 9px;
`

export const holder = 1
