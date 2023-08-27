import styled from 'styled-components'

import type { TSizeSM } from '@/spec'
import SIZE from '@/constant/size'

import HookSVG from '@/icons/Hook'
import css, { theme } from '@/css'

export const Wrapper = styled.div<{ size: TSizeSM }>`
  ${css.flex('align-center')};
  width: 60px;

  transform: ${({ size }) => (size === SIZE.SMALL ? 'scale(0.6)' : 'scale(1)')};
`
export const Track = styled.span<{ checked: boolean }>`
  background: ${({ checked }) => (checked ? theme('article.title') : theme('divider'))};
  border-radius: 20px;
  border: 2px solid;
  border-color: ${({ checked }) => (checked ? theme('article.digest') : theme('divider'))};
  cursor: pointer;
  display: flex;
  height: 30px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgb(185 185 185 / 25%) inset;
  transition: 0.5s;
`
export const Indicator = styled.span<{ checked: boolean }>`
  width: 68px;
  height: 26px;
  border-radius: 20px;
  ${css.flex('align-center', 'justify-start')};
  background: white;
  transform: ${({ checked }) => (checked ? 'translateX(30px)' : 'translateX(-30px)')};
  transition: 0.5s;
  box-shadow: 0 0 10px 3px rgb(0, 0, 0, 0.1);
`
export const CheckIcon = styled(HookSVG)<{ checked: boolean }>`
  fill: ${theme('article.title')};
  ${css.size(14)};
  margin-left: 6px;
  opacity: ${({ checked }) => (checked ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  transition-delay: 0.1s;
`
