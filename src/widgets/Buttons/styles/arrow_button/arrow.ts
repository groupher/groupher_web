import styled from 'styled-components'

// import Img from '@/Img'
import type { TColorName } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import { Wrapper as ButtonWrapper } from '.'

type TArrow = { color: TColorName; linkColor: boolean }

const BaseArrow = styled.div<TArrow>`
  width: 8px;
  height: 1px;
  position: relative;
  background: transparent;
  border-color: inherit;
  opacity: 0.68;

  transition: 0.2s;

  ${ButtonWrapper}:hover & {
    background-color: ${({ color, linkColor }) =>
      linkColor ? theme('link') : theme(`baseColor.${camelize(color)}Bg`)};
  }

  ${ButtonWrapper}:hover &:before {
    right: 0;
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    border: solid;
    border-color: ${({ color, linkColor }) =>
      linkColor ? theme('link') : theme(`baseColor.${camelize(color)}Bg`)};
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);

    transition: 0.2s;
  }
`

export const LeftArrow = styled(BaseArrow)`
  box-sizing: border-box;
  margin-right: 1px;

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
  ${ButtonWrapper}:hover &:before {
    right: 0;
  }

  &:before {
    top: -3px;
    right: 3px;
  }
`
