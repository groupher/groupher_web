import type { FC } from 'react'

import type { TActive, TSpace } from '~/spec'

import Img from '~/Img'
import styled, { css, theme } from '~/css'

import { getLocalSVG } from '~/icons'

// import CloseCross from '~/icons/CloseCross'
// import AirBalloon from '~/icons/AirBalloon'

import type { TProps as TIconButtonProps } from '../IconButton'

type TWrapper = Omit<TIconButtonProps, 'path'>
export const Wrapper = styled.div<TWrapper>`
  ${({ size }) => css.size(size)}
  position: relative;
  ${css.row('align-both')};

  margin-left: ${({ left }) => `${left || 0}px`};
  margin-right: ${({ right }) => `${right || 0}px`};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`
export const Content = styled.div`
  z-index: 2;
`
export const HoverBg = styled.div<{ size: number }>`
  position: absolute;
  ${({ size }) => css.circle(size + 4)};
  left: -2px;
  top: -2px;
  background: ${theme('hoverBg')};
  opacity: 0;
  cursor: pointer;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: 0.25s;
`
export const Hint = styled.div`
  color: ${theme('article.info')};
  text-align: center;
  min-width: 80px;
  padding: 5px;
`

type TIcon = { size: number; $dimWhenIdle: boolean } & TSpace & TActive
export const Icon = styled(Img)<TIcon>`
  fill: ${({ $active }) => ($active ? '#00a59b' : theme('article.info'))};
  ${({ size }) => css.size(size)};

  opacity: ${({ $dimWhenIdle }) => ($dimWhenIdle ? 0.7 : 1)};

  &:hover {
    fill: ${theme('article.info')};
    opacity: 1;
    cursor: pointer;
  }

  transition: fill 0.2s;
`

const styledIcon = (comp: FC): FC<TIcon> => {
  return styled(comp)<TIcon>`
    fill: ${({ $active }) => ($active ? '#00a59b' : theme('article.info'))};
    ${({ size }) => css.size(size)};

    opacity: ${({ $dimWhenIdle }) => ($dimWhenIdle ? 0.7 : 1)};

    &:hover {
      fill: ${theme('article.info')};
      opacity: 1;
      cursor: pointer;
    }

    transition: all 0.2s;
  `
}

export const getLocalIcon = (type: string): FC<TIcon> => {
  return getLocalSVG(type, styledIcon)
}
