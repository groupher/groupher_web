import styled from 'styled-components'

import type { TTestable, TColor } from '@/spec'
import css, { theme, rainbow } from '@/css'
import { WithMargin } from '@/widgets/Common'

import {
  getActiveBackground,
  getLabelColor,
  getLabelFontsize,
  getRadioBoxSize,
  getRadioBoxTop,
  getRadioBoxLeft,
} from './metric/radio'

type TWrapper = TTestable

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')}
`
type TLabel = {
  size: string
  checked: boolean
  dimOnActive: boolean
} & TColor

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

  background: ${({ checked, dimOnActive, $color }) =>
    checked ? getActiveBackground(dimOnActive, $color) : 'transparent'};
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
    border-color: ${({ checked, $color }) => (checked ? theme('button.fg') : rainbow($color))};
    border-radius: 50%;
  }

  transition: 0.25s all ease;
`
