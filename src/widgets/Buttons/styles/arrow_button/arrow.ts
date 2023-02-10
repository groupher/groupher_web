import styled from 'styled-components'

// import Img from '@/Img'
import type { TColorName } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import { Wrapper as ButtonWrapper } from '.'

type TArrow = { color: TColorName; linkColor: boolean; down?: boolean; up?: boolean }

const getColor = (color: TColorName, linkColor: boolean) => {
  return linkColor ? theme('link') : theme(`baseColor.${camelize(color)}`)
}

const BaseArrow = styled.div<TArrow>`
  width: 0;
  height: 1px;

  position: relative;
  background: transparent;
  border-color: inherit;

  transform: ${({ up, down }) => {
    if (down) return 'rotate(90deg)'
    if (up) return 'rotate(-90deg)'

    return 'none'
  }};

  background: ${({ color, linkColor }) => getColor(color, linkColor)};
  opacity: 0.68;

  ${ButtonWrapper}:hover & {
    width: 8px;
  }

  ${ButtonWrapper}:hover &:before {
    right: 0;
  }

  transition: 0.2s;

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    border: solid;
    border-color: ${({ color, linkColor }) =>
      linkColor ? theme('link') : theme(`baseColor.${camelize(color)}`)};
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);

    transition: 0.2s;
  }
`

export const LeftArrow = styled(BaseArrow)`
  box-sizing: border-box;
  margin-right: 8px;

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
  margin-left: 8px;

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
