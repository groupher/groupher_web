import styled from 'styled-components'

import css, { theme } from '@/css'
import CopySVG from '@/icons/Copy'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
`
export const CopyIcon = styled(CopySVG)`
  fill: ${theme('article.digest')};
  ${css.size(16)};
  margin-right: 2px;
  opacity: 0.8;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`
export const CopyedHint = styled.div`
  ${css.flex('align-both')};
`
export const CopyedText = styled.div`
  font-size: 12px;
  color: ${theme('baseColor.green')};
`
