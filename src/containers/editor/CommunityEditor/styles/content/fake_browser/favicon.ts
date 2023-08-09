import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

export const HolderIcon = styled.div`
  ${css.size(14)};
  border-radius: 3px;
  background: ${theme('lightText')};
  margin-left: 15px;
`
export const RealIcon = styled(Img)`
  margin-left: 15px;
  ${css.size(14)};
  border-radius: 3px;
  background: ${theme('lightText')};
`
