import styled from 'styled-components'

import type { TActive, TSpace } from '@/spec'
import css, { theme } from '@/css'

import CheckedSVG from '@/icons/CheckBold'

import { getIconSize, getFontSize, getBorderRadius } from './metric'

type TItem = { checked: boolean; size: string; disabled?: boolean }

type TWrapper = { dimWhenIdle: boolean; disabled?: boolean } & TActive & TSpace
export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ dimWhenIdle }) => (dimWhenIdle ? 0.7 : 1)};

  ${(props) => css.spaceMargins(props)};

  &:hover {
    fill: #00a59b;
    opacity: 1;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`
export const IconWrapper = styled.div<TItem>`
  ${css.row('align-both')};
  background: ${({ checked }) => (checked ? theme('article.digest') : 'transparent')};
  width: ${({ size }) => getIconSize(size)};
  height: ${({ size }) => getIconSize(size)};
  ${css.row('align-both')};
  padding: 1px;

  border: ${({ disabled }) => (!disabled ? '1px solid' : 'none')};

  border-color: ${theme('article.digest')};
  border-radius: ${({ size }) => getBorderRadius(size)};

  transition: all 0.2s;
`
export const CheckIcon = styled(CheckedSVG)<TItem>`
  fill: ${({ checked }) => (checked ? 'white' : 'none')};
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
