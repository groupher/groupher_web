import type { TActive, TColor } from '~/spec'
import styled, { css, rainbow, theme } from '~/css'

import CheckedSVG from '~/icons/CheckBold'
import { WithMargin } from '~/widgets/Common'

import { getIconSize, getFontSize, getBorderRadius } from './metric'

type TItem = { checked: boolean; size: string; disabled?: boolean } & TColor

type TWrapper = { $dimWhenIdle: boolean; disabled?: boolean } & TActive
export const Wrapper = styled(WithMargin)<TWrapper>`
  ${css.row('align-center')};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ $dimWhenIdle }) => ($dimWhenIdle ? 0.7 : 1)};

  &:hover {
    opacity: 1;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`
export const IconWrapper = styled.div<TItem>`
  ${css.row('align-both')};
  background: ${({ checked, $color }) => (checked ? rainbow($color) : 'transparent')};
  width: ${({ size }) => getIconSize(size)};
  height: ${({ size }) => getIconSize(size)};
  ${css.row('align-both')};
  padding: 1px;

  border: ${({ disabled }) => (!disabled ? '1px solid' : 'none')};
  border-color: ${({ $color }) => rainbow($color)};

  border-radius: ${({ size }) => getBorderRadius(size)};

  transition: all 0.2s;
`
export const CheckIcon = styled(CheckedSVG)<TItem>`
  fill: ${({ checked }) => (checked ? theme('button.fg') : 'none')};
  display: ${({ checked }) => (checked ? 'block' : 'none')};
  width: ${({ size }) => getIconSize(size)};
  height: ${({ size }) => getIconSize(size)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`
export const ChildWrapper = styled.div<TItem>`
  color: ${({ checked }) => (checked ? theme('article.title') : theme('article.digest'))};
  font-size: ${({ size }) => getFontSize(size)};
  margin-left: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    color: ${({ disabled }) => (disabled ? theme('article.digest') : theme('article.title'))};
  }

  transition: color 0.1s;
`
