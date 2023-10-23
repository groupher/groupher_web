import styled from 'styled-components'

import Button from '@/widgets/Buttons/Button'
import { WithMargin } from '@/widgets/Common'
import ArrowSVG from '@/icons/Arrow'

import css, { theme, animate } from '@/css'

export const Wrapper = styled.div`
  animation: ${animate.fadeInRight} 0.1s linear;
  padding: 0 5px;
`
export const Footer = styled(WithMargin)`
  ${css.row('align-center', 'justify-between')};
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
  padding-top: 12px;
  margin-bottom: 5px;
  margin-right: 5px;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(15)};
  margin-left: 3px;
  fill: ${theme('article.digest')};
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    fill: ${theme('article.digest')};
  }
  transition: all 0.2s;
`
export const Confirm = styled(Button)`
  border-radius: 5px;
  height: 22px;
`
