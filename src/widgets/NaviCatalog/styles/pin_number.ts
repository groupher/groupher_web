import styled, { css, theme } from '~/css'
import Img from '~/Img'

import { Item } from '.'

export const Wrapper = styled.div`
  position: relative;
`
export const Num = styled.div`
  color: ${theme('article.digest')};
  font-size: 11px;
  display: block;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }

  ${Wrapper}:hover & {
    display: none;
  }
`
export const PinIcon = styled(Img)`
  fill: ${theme('button.primary')};
  display: none;
  ${css.size(16)};

  &:hover {
    cursor: pointer;
  }

  ${Wrapper}:hover & {
    display: block;
  }
`
export const TooltipPopContent = styled.div`
  padding: 3px 6px;
`
