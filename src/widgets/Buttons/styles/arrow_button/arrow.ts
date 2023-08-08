import styled from 'styled-components'

// import Img from '@/Img'
import type { TColorName } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import { Wrapper as ButtonWrapper } from '.'

type TArrow = { color: TColorName; reverseColor: boolean; down?: boolean; up?: boolean }

const BaseArrow = styled.div<TArrow>`
  width: 0;
  height: 0;

  position: relative;
  background: transparent;
  border-color: inherit;

  border: dotted;
  border-width: 0 0px 1px 0;

  transform: ${({ up, down }) => {
    if (down) return 'rotate(90deg)'
    if (up) return 'rotate(-90deg)'

    return 'none'
  }};

  ${ButtonWrapper}:hover & {
    width: 8px;
    height: 1px;
  }

  ${ButtonWrapper}:hover &:before {
    right: 0;
  }

  transition: 0.1s;

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    border: solid;
    border-color: ${({ color, reverseColor }) => {
      if (reverseColor) return 'white'

      return color === COLOR_NAME.BLACK ? theme('link') : theme(`baseColor.${camelize(color)}`)
    }};
    border-width: 0 1px 1px 0;
    padding: 3px;
    transform: rotate(-45deg);
    transition: 0.1s ease-out;
  }
`

export const LeftArrow = styled(BaseArrow)`
  box-sizing: border-box;
  margin-right: 6px;

  ${ButtonWrapper}:hover & {
    width: 8px;
    margin-right: 0;
  }

  ${ButtonWrapper}:hover &:before {
    left: -1px;
  }

  &:before {
    ${css.size(11)};
    border-width: 1px 0 0 1px;
    transform: rotate(-45deg) scale(0.7);
    top: -5px;
    left: 2px;
  }
`

export const RightArrow = styled(BaseArrow)`
  box-sizing: border-box;
  margin-left: 6px;

  ${ButtonWrapper}:hover & {
    width: 8px;
    margin-left: 0px;
  }

  ${ButtonWrapper}:hover &:before {
    right: 0;
  }

  &:before {
    top: -3px;
    right: 3px;
  }
`

export const DownArrow = styled(RightArrow)`
  margin-left: 4px;
  margin-top: 8px;

  ${ButtonWrapper}:hover & {
    width: 8px;
    margin-left: 0;
    margin-top: 0;
  }
`

export const UpArrow = styled(RightArrow)`
  margin-left: 4px;
  margin-top: -9px;

  ${ButtonWrapper}:hover & {
    width: 8px;
    margin-left: 0;
    margin-top: 2px;
  }
`
