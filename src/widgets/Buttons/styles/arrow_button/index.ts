import styled from 'styled-components'

import type { TColorName, TSize, TSpace } from '@/spec'
import SIZE from '@/constant/size'
import { COLOR_NAME } from '@/constant/colors'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

type TWrapper = {
  disabled: boolean
  dimWhenIdle: boolean
  color: TColorName
  reverseColor: boolean
  size: TSize
  width: number
} & TSpace

export const Wrapper = styled.button<TWrapper>`
  position: relative;
  ${css.flex('align-center')};
  display: inline-flex;
  opacity: ${({ dimWhenIdle, disabled }) => (dimWhenIdle || disabled ? '0.65' : 1)};
  color: ${({ color, reverseColor }) => {
    if (reverseColor) return 'white'

    return color === COLOR_NAME.BLACK ? theme('link') : theme(`baseColor.${camelize(color)}`)
  }};

  border: none;
  background: transparent;
  vertical-align: middle;
  font-weight: 500;

  gap: 0 0.5em;

  transform: ${({ size }) => {
    if (size === SIZE.SMALL) return 'scale(0.85);'
    if (size === SIZE.LARGE) return 'scale(1.2);'

    return 'none'
  }};
  ${(props) => css.spaceMargins(props)};

  width: ${({ width }) => `${width + 25}px`};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.65 : 0.8)};
  }

  transition: all 0.2s;
`
export const Text = styled.div`
  word-break: keep-all;
  line-height: 15px;
  font-size: 13px;
`
