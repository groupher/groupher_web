import type { TActive } from '@/spec'
import styled, { css, theme } from '@/css'
import ArrowSVG from '@/icons/ArrowSimple'

import { NaviArea } from '.'

export const Wrapper = styled.div<TActive>`
  ${css.column('align-both')};
  position: absolute;
  left: 10px;
  top: 35vh;
  z-index: 1;
  color: ${theme('drawer.font')};
  width: 34px;
  height: 70px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  gap: 0 10px;
  box-shadow: ${theme('drawer.shadow')};

  opacity: 0;

  ${NaviArea}:hover & {
    opacity: 1;
  }

  transition: opacity 0.2s linear;
`
const SwitchBlock = styled.div`
  cursor: pointer;
  position: absolute;
  left: 1px;
  width: 30px;
  height: 34px;
  ${css.row('align-both')};
  opacity: 0.6;

  &:hover {
    background: ${theme('hoverBg')};
    opacity: 1;
    cursor: pointer;
  }

  transition: opacity 0.3s;
`
export const UpSwitchBlock = styled(SwitchBlock)`
  top: -2px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`
export const UpArrow = styled(ArrowSVG)`
  ${css.size(24)};
  fill: ${theme('article.info')};
  transform: rotate(90deg);
`
export const DownSwitchBlock = styled(SwitchBlock)`
  top: 36px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
export const DownArrow = styled(UpArrow)`
  transform: rotate(-90deg);
`
export const IndexWrapper = styled.div`
  position: absolute;
  width: 100px;
  color: ${theme('article.digest')};
  font-size: 10px;

  opacity: 0;

  ${SwitchBlock}:hover & {
    opacity: 1;
    cursor: pointer;
  }

  transition: opacity 0.2s;
`
export const UpIndexWrapper = styled(IndexWrapper)`
  left: 35px;
  top: -46px;
`
export const DownIndexWrapper = styled(IndexWrapper)`
  left: 35px;
  top: 28px;
`
