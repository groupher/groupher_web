import styled from 'styled-components'

import type { TColorName, TSize, TSpace } from '@/spec'
import { SIZE } from '@/constant'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

type TWrapper = {
  disabled: boolean
  dimWhenIdle: boolean
  color: TColorName
  linkColor: boolean
  size: TSize
} & TSpace

export const Wrapper = styled.button<TWrapper>`
  position: relative;
  ${css.flex('align-center')};
  display: inline-flex;
  opacity: ${({ dimWhenIdle, disabled }) => (dimWhenIdle || disabled ? '0.65' : 1)};
  color: ${({ color, linkColor }) =>
    linkColor ? theme('link') : theme(`baseColor.${camelize(color)}`)};

  border: none;
  background: transparent;
  vertical-align: middle;

  gap: 0 0.5em;
  font-size: 15px;

  transform: ${({ size }) => (size === SIZE.SMALL ? 'scale(0.82);' : 'none')};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.65 : 0.8)};
  }

  transition: all 0.2s;
`
export const Text = styled.div`
  line-height: 15px;
  font-size: 14px;
`
