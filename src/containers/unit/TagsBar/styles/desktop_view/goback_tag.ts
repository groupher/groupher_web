import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 8px;
  max-width: 180px;
  padding: 5px 2px;
`
export const TagIcon = styled(Img)`
  fill: ${theme('banner.desc')};
  margin-right: 6px;
  ${css.size(14)};
`
export const TagTitle = styled.div`
  color: ${theme('tags.text')};
  font-size: 14px;
  letter-spacing: 1px;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  transition: all 0.2s;
`
