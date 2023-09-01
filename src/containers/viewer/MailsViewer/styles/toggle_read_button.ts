import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  &:hover {
    cursor: pointer;
  }
`
export const ToggleIcon = styled(Img)`
  fill: ${theme('banner.title')};
  ${css.size(25)};
  margin-right: 5px;
  display: block;
`

export const ToggleTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 0.9rem;
`
