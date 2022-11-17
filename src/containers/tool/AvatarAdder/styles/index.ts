import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.circle(36)};
  ${css.flex('align-both')};

  background: #03343f;
  &:hover {
    border-color: #005759;
    cursor: pointer;
  }
`
export const SettingIcon = styled(Img)`
  ${css.size(18)};
  fill: ${theme('article.digest')};

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }
`
