import type { TButton, TSize } from '@/spec'
import styled, { css, theme } from '@/css'

import { Wrapper as BaseBtnWrapper } from '../button'
import { OrSignBase } from '.'

export const Wrapper = styled.div<{ size: TSize }>`
  ${css.row('align-center')};
  position: relative;
`
const BaseButton = styled(BaseBtnWrapper)<TButton>`
  ${css.row('align-both')};
  width: 50%;
  color: ${({ active }) => (active ? theme('button.fg') : '#99b9bf')};
  background: ${({ active }) => (active ? theme('button.primary') : '#024250')};
  border-color: ${({ active }) => (active ? theme('button.primary') : '#024250')};

  &:hover {
    color: ${({ active }) => (active ? theme('button.fg') : '#99b9bf')};
    border-color: ${({ active }) => (active ? theme('button.hoverBg') : '#065061')};
    background-color: ${({ active }) => (active ? theme('button.hoverBg') : '#065061')};
  }
`
export const LeftButton = styled(BaseButton)<TButton>`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  /* border-color: #024250; */
`
export const OrSign = styled(OrSignBase)``

export const RightButton = styled(BaseButton)<TButton>`
  border-color: #024250;
  margin-left: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`
