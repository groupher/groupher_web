import styled from 'styled-components'

import type { TAvatarLayout, TColorName, TTestable } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { rainbow, rainbowLight } from '@/css'

import type { TAvatarProps } from '..'
import { getFontSize } from './metric/avatar'

type TWrapper = TTestable & TAvatarProps & { $avatarLayout: TAvatarLayout; color: TColorName }

export const Wrapper = styled.div.attrs<TWrapper>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-both')};

  background: ${({ color }) => rainbowLight(color)};

  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: ${({ $avatarLayout }) =>
    $avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%'};

  margin-top: ${({ top }) => `${top}px`};
  margin-bottom: ${({ bottom }) => `${bottom}px`};
  margin-left: ${({ left }) => `${left}px`};
  margin-right: ${({ right }) => `${right}px`};
  border: none;
`
type TName = { size: number; color: TColorName }
export const Name = styled.div<TName>`
  color: ${({ color }) => rainbow(color)};
  font-size: ${({ size }) => getFontSize(size)};
`
