import styled from 'styled-components'

import type { TTestable, TSpace, TPrimaryColor } from '@/spec'
import css, { theme, primaryTheme } from '@/css'

import {
  getActiveBackground,
  getLabelColor,
  getLabelFontsize,
  getRadioBoxSize,
  getRadioBoxTop,
  getRadioBoxLeft,
} from './metric/radio'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')}

  ${(props) => css.spaceMargins(props)};
`
type TLabel = {
  size: string
  checked: boolean
  dimOnActive: boolean
} & TPrimaryColor

export const Label = styled.label<TLabel>`
  position: relative;
  font-size: ${({ size }) => getLabelFontsize(size)};
  margin-right: ${({ checked }) => (checked ? '16px' : '8px')};
  padding-left: ${({ checked }) => (checked ? '14px' : '24px')};
  font-weight: ${({ checked }) => (checked ? 600 : 400)};

  padding-right: 14px;
  padding-top: 2px;
  padding-bottom: 2px;
  cursor: pointer;

  background: ${({ checked, dimOnActive, primaryColor }) =>
    checked ? getActiveBackground(dimOnActive, primaryColor) : 'transparent'};
  color: ${({ checked, dimOnActive }) => getLabelColor(checked, dimOnActive)};
  border-radius: 15px;

  &:before {
    display: ${({ checked }) => (checked ? 'none' : 'block')};
    box-sizing: border-box;
    content: ' ';
    position: absolute;
    top: ${({ size }) => getRadioBoxTop(size)};
    left: ${({ size }) => getRadioBoxLeft(size)};

    width: ${({ size }) => getRadioBoxSize(size)};
    height: ${({ size }) => getRadioBoxSize(size)};
    border: 2px solid;
    border-color: ${({ checked, primaryColor }) =>
      checked ? theme('button.fg') : primaryTheme(primaryColor)};
    border-radius: 50%;
  }

  transition: 0.25s all ease;
`
