import { keyframes } from 'styled-components'
import styled, { css, theme, rainbow } from '@/css'

import type { TUpvoteLayout, TActive, TColorName } from '@/spec'

import UpvoteIcon from '@/icons/Upvote'
import { pixelAdd } from '@/dom'

import { getIconSize } from './metric'

const topBubbles = keyframes`
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`

const bottomBubbles = keyframes`
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }

`
type TWrapper = {
  $showAnimation: boolean
  type: TUpvoteLayout
}

export const Wrapper = styled.div<TWrapper>`
  display: inline-block;
  color: ${theme('article.info')};
  font-size: 15px;
  /* padding: 5px 0; */
  margin-top: 0;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s;

  &:hover {
    will-change: transform;
  }

  &:focus {
    outline: 0;
  }

  &:before {
    position: absolute;
    content: '';
    width: 250%;
    height: 120%;
    left: -30%;
    z-index: -1;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
    /** base end */

    display: ${({ $showAnimation }) => ($showAnimation ? 'block' : 'none')};

    top: -75%;
    background-image: radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, ${theme('button.primary')} 20%, transparent 30%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, ${theme('button.primary')} 15%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;

    animation: ${topBubbles} ease-in-out 1s infinite;
  }

  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 120%;
    left: -65%;
    z-index: -1;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
    /** base end */

    display: ${({ $showAnimation }) => ($showAnimation ? 'block' : 'none')};
    bottom: -60%;
    background-image: radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, ${theme('button.primary')} 15%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%),
      radial-gradient(circle, ${theme('button.primary')} 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;

    animation: ${bottomBubbles} ease-in-out 1s infinite;
    transform: rotate(200deg);
  }
`
type TIconWrapper = { type: TUpvoteLayout }
export const IconWrapper = styled.div<TIconWrapper>`
  ${css.row('align-both')};
  border-radius: 100%;
  position: relative;

  width: ${({ type }) => pixelAdd(getIconSize(type), 2)};
  height: ${({ type }) => pixelAdd(getIconSize(type), 2)};

  padding-bottom: 0.5px;
  z-index: 1;
`
type TUpIcon = { type: TUpvoteLayout; count: number } & TActive & { color: TColorName }
export const UpIcon = styled(UpvoteIcon)<TUpIcon>`
  fill: ${({ $active, color }) => ($active ? rainbow(color, 'article.title') : theme('hint'))};
  width: ${({ type }) => getIconSize(type)};
  height: ${({ type }) => getIconSize(type)};

  filter: brightness(1.1);
  transition: all 0.2s;
`
