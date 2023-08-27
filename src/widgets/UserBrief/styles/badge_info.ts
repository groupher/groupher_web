import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flexColumn('justify-center', 'align-center')};
`

export const BadgeWrapper = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 4px;
`

export const BadgeIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(12)};
  margin-right: 3px;
`
export const BadgeTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 0.75rem;
`
