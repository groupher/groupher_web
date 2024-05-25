import type { TColor, TSizeSM } from '@/spec'
import SIZE from '@/const/size'

import HookSVG from '@/icons/CheckBold'
import styled, { css, theme, rainbow } from '@/css'

export const Wrapper = styled.div<{ size: TSizeSM }>`
  ${css.row('align-center')};
  width: 60px;

  transform: ${({ size }) => (size === SIZE.SMALL ? 'scale(0.6)' : 'scale(1)')};
`
type TTrack = { checked: boolean } & TColor
export const Track = styled.span<TTrack>`
  background: ${({ checked, $color }) => (checked ? rainbow($color) : theme('divider'))};
  border-radius: 20px;
  border: 2px solid;
  border-color: ${({ checked, $color }) => (checked ? rainbow($color) : theme('divider'))};
  cursor: pointer;
  display: flex;
  height: 30px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: ${theme('toggle.shadow')};
  transition: 0.5s;
`
export const Indicator = styled.span<TTrack>`
  width: 68px;
  height: 26px;
  border-radius: 20px;
  ${css.row('align-center', 'justify-start')};
  background: ${theme('toggle.ball')};
  transform: ${({ checked }) => (checked ? 'translateX(30px)' : 'translateX(-30px)')};
  transition: 0.5s;
`
export const CheckIcon = styled(HookSVG)<TTrack>`
  fill: ${({ $color }) => rainbow($color)};
  ${css.size(15)};
  margin-left: 6px;
  opacity: ${({ checked }) => (checked ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  transition-delay: 0.1s;
`
