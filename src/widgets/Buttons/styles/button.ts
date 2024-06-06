import styled, { css, theme } from '@/css'
import type { TSize, TButtonStyle, TSpace, TColor } from '@/spec'

import {
  getColor,
  getBackgroundColor,
  getBorderColor,
  getHeight,
  getPadding,
  getLineHeight,
  getFontSize,
} from './metircs/button'

type TWrapper = TButtonStyle & TSpace & TColor
export const Wrapper = styled.button<TWrapper>`
  ${css.row('align-both')};
  -webkit-appearance: button;
  outline: none;
  // otherwise the slim effect will appear outside
  overflow: hidden;
  text-align: center;
  touch-action: manipulation;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: ${({ size }) => getPadding(size)};
  line-height: ${({ size }) => getLineHeight(size)};
  ${({ space }) => `${space !== null ? `padding-left: ${space}px;padding-right: ${space}px` : ''}`};

  font-size: ${({ size }) => getFontSize(size)};
  border-radius: ${({ size }) => (size === 'tiny' ? '6px' : '10px')};
  height: ${({ size }) => getHeight(size)};
  user-select: none;
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;

  color: ${({ $ghost, disabled }) => getColor($ghost, disabled)};
  background-color: ${({ $ghost, disabled, $color }) =>
    getBackgroundColor($color, $ghost, disabled)};
  border-color: ${({ $noBorder, disabled, $ghost, $color }) =>
    getBorderColor($color, $noBorder, disabled, $ghost)};
  box-shadow: ${({ $ghost, $noBorder }) => ($ghost && $noBorder ? '' : theme('button.boxShadow'))};

  opacity: ${({ $noBorder }) => ($noBorder ? '0.8' : 1)};

  ${(props) => css.spaceMargins(props)};

  &::after {
    content: '';
    display: ${({ $ghost, $noBorder }) => ($ghost || $noBorder ? 'block' : 'none')};
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    filter: blur(5px);
    transform: translateX(-180px) skewX(-15deg);
  }

  &:hover {
    color: ${({ $ghost, disabled }) => getColor($ghost, disabled)};
    opacity: 1;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    filter: saturate(0.9) brightness(1.1);

    &::before,
    &::after {
      transform: translateX(300px) skewX(-15deg);
      transition: ${({ disabled, $ghost, $noBorder }) =>
        disabled || $ghost || $noBorder ? 0 : '0.8s'};
    }
  }

  &:focus {
    color: ${({ $ghost, disabled }) => getColor($ghost, disabled)};
    filter: brightness(0.95);
    opacity: 1;
  }

  &:active {
    color: ${({ $ghost, disabled }) => getColor($ghost, disabled)};
    filter: brightness(0.95);
    opacity: 1;
  }
`
type TChildrenWrapper = { size: TSize; $ghost: boolean; $noBorder: boolean }
export const ChildrenWrapper = styled.div<TChildrenWrapper>`
  ${css.row('align-both')};
  width: 100%;
  font-size: ${({ size }) => getFontSize(size)};
  font-weight: ${({ $ghost, $noBorder }) => ($ghost && $noBorder ? 400 : 500)};
  position: relative;
  z-index: 2;
`
export const RedWrapper = styled(Wrapper)`
  font-weight: 400;
  color: ${({ $ghost, disabled }) => {
    if (disabled) return theme('rainbow.red')

    return $ghost ? theme('rainbow.red') : theme('button.fg')
  }};
  background-color: ${({ $ghost, disabled }) => {
    if (disabled) return theme('hoverBg')

    return !$ghost ? theme('rainbow.red') : 'transparent'
  }};
  border-color: ${({ $noBorder, disabled }) => {
    if (disabled) return theme('divider')

    return $noBorder ? 'transparent' : theme('rainbow.red')
  }};

  &:hover  {
    color: ${({ $ghost, disabled }) => {
      if (disabled) return theme('rainbow.red')

      return $ghost ? theme('rainbow.red') : theme('button.fg')
    }};

    background-color: ${({ $ghost, disabled }) => {
      // not work, seems styled bug
      if (disabled) theme('hoverBg')

      return !$ghost ? theme('rainbow.redSoft') : 'transparent'
    }};

    border-color: ${({ disabled }) => {
      // not work, seems styled bug
      if (disabled) return theme('hoverBg')

      return theme('rainbow.red')
    }};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? '' : 'scale(0.98)')};
    border-color: ${({ disabled }) => (disabled ? 'transparent' : theme('rainbow.red'))};

    background-color: ${({ $ghost, disabled }) => {
      if (disabled) return theme('hoverBg')

      return !$ghost ? theme('rainbow.redSoft') : 'transparent'
    }};
  }

  &:focus {
    color: ${({ $ghost }) => {
      return $ghost ? theme('rainbow.red') : theme('button.fg')
    }};

    background-color: ${({ $ghost }) => {
      return !$ghost ? theme('rainbow.redSoft') : 'transparent'
    }};
  }

  transition: all 0.2s;
`
