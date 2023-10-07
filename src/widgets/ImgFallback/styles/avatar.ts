import styled from 'styled-components'

import type { TAvatarLayout, TColorName, TTestable } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme, baseColorTheme, baseColorBgTheme } from '@/css'

import type { TAvatarProps } from '..'
import { getFontSize } from './metric/avatar'

type TWrapper = TTestable & TAvatarProps & { avatarLayout: TAvatarLayout; color: TColorName }

export const Wrapper = styled.div.attrs<TWrapper>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-both')};

  background: ${({ color }) => baseColorBgTheme(color)};

  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};

  margin-top: ${({ top }) => `${top}px`};
  margin-bottom: ${({ bottom }) => `${bottom}px`};
  margin-left: ${({ left }) => `${left}px`};
  margin-right: ${({ right }) => `${right}px`};
  border: none;

  /* border: 2px solid; */
  /* border-color: white; */
  /* border: ${({ quote }) => (quote ? '2px solid' : 'none')}; */
  /* border-color: ${({ quote }) => (quote ? theme('avatar.quote') : 'none')}; */
`
type TName = { size: number; color: TColorName }
export const Name = styled.div<TName>`
  color: ${({ color }) => baseColorTheme(color)};
  font-size: ${({ size }) => getFontSize(size)};
`
