import Button from '~/widgets/Buttons/Button'
import { WithMargin } from '~/widgets/Common'
import ArrowSVG from '~/icons/Arrow'

import styled, { css, theme } from '~/css'

export const Wrapper = styled(WithMargin)`
  ${css.row('align-center', 'justify-between')};
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
  padding-top: 12px;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(15)};
  margin-left: 3px;
  fill: ${theme('article.digest')};
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
    fill: ${theme('article.title')};
  }
  transition: all 0.1s;
`
export const Confirm = styled(Button)`
  border-radius: 5px;
  height: 22px;
`
