import styled from 'styled-components'

import type { TPrimaryColor, TSizeSM } from '@/spec'
import SIZE from '@/constant/size'

import HookSVG from '@/icons/CheckBold'
import css, { theme, primaryTheme } from '@/css'

export const Wrapper = styled.div<{ size: TSizeSM }>`
  ${css.row('align-center')};
  width: 60px;

  transform: ${({ size }) => (size === SIZE.SMALL ? 'scale(0.6)' : 'scale(1)')};
`
type TTrack = { checked: boolean } & TPrimaryColor
export const Track = styled.span<TTrack>`
  background: ${({ checked, primaryColor }) =>
    checked ? primaryTheme(primaryColor) : theme('divider')};
  border-radius: 20px;
  border: 2px solid;
  border-color: ${({ checked, primaryColor }) =>
    checked ? primaryTheme(primaryColor) : theme('divider')};
  cursor: pointer;
  display: flex;
  height: 30px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgb(185 185 185 / 25%) inset;
  transition: 0.5s;
`
export const Indicator = styled.span<TTrack>`
  width: 68px;
  height: 26px;
  border-radius: 20px;
  ${css.row('align-center', 'justify-start')};
  background: white;
  transform: ${({ checked }) => (checked ? 'translateX(30px)' : 'translateX(-30px)')};
  transition: 0.5s;
  box-shadow: 0 0 10px 3px rgb(0, 0, 0, 0.1);
`
export const CheckIcon = styled(HookSVG)<TTrack>`
  fill: ${({ primaryColor }) => primaryTheme(primaryColor)};
  ${css.size(15)};
  margin-left: 6px;
  opacity: ${({ checked }) => (checked ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  transition-delay: 0.1s;
`
