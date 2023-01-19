import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import ArrowSVG from '@/icons/Arrow'
// import InfoSVG from '@/icons/Info'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start')};
  gap: 16px 0px;
  margin-top: 10px;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-right: 10px;
`
