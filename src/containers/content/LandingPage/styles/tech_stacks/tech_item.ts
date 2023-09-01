import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column('align-both')};
`
export const IconWrapper = styled.div`
  ${css.size(50)};
  ${css.row('align-both')};

  ${css.media.mobile`
    ${css.size(30)};
  `};
`
export const TeckIcon = styled(Img)<{ size?: number }>`
  ${({ size }) => css.size(size || 50)};
  border-radius: 5px;
  filter: drop-shadow(2px 4px 6px lightgrey);

  ${css.media.mobile`
    ${css.size(30)};
  `};
`

export const Name = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-top: 6px;
  z-index: 1;

  ${css.media.mobile`
    font-size: 12px;
  `};
`
