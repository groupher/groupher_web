import styled from 'styled-components'

import type { TActive } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'
import CheckedSVG from '@/icons/CheckBold'
import CircleArrowSVG from '@/icons/CircleArrow'

export const Wrapper = styled.div<{ showMore: boolean }>`
  ${css.rowWrap()};
  width: calc(100% + 30px);
  gap: 15px 16px;
  margin-top: 10px;
  position: relative;
  margin-bottom: ${({ showMore }) => (showMore ? '60px' : 0)};

  ${css.media.mobile`
    width: 100%;
    gap: 10px 12px;
  `};
`

export const Block = styled.div<TActive>`
  position: relative;
  width: 168px;
  height: 110px;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid;
  border-color: ${({ $active }) => ($active ? theme('article.title') : 'transparent')};
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};

  &:hover {
    border-color: ${theme('article.title')};
    cursor: pointer;
  }

  ${css.media.mobile`
    width: 47%;
  `};

  transition: all 0.2s linear;
`
export const Image = styled(Img)<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => height || 'auto'};
  object-fit: cover;
`

export const ActiveSign = styled.div`
  ${css.circle(20)};
  background: ${theme('article.title')};
  position: absolute;
  top: -5px;
  right: -2px;
  z-index: 3;
  border: 1px solid;
  border-color: ${theme('article.title')};
`
export const CheckIcon = styled(CheckedSVG)`
  fill: white;
  ${css.size(14)};
  position: absolute;
  top: 3px;
  left: 3px;
`

export const ShowMoreMask = styled.div<{ showMore: boolean }>`
  ${css.row('align-both')};
  position: absolute;
  bottom: ${({ showMore }) => (!showMore ? 0 : '-25px')};
  width: 350px;
  height: 60px;
  background: ${({ showMore }) =>
    !showMore ? 'linear-gradient(0deg, white 30%, transparent 100%)' : ''};
  opacity: ${({ showMore }) => (!showMore ? 1 : 0.4)};

  &:hover {
    opacity: 1;
  }

  ${css.media.mobile`
    width: 100%;
  `};
  transition: all 0.2s;
`

export const CircleArrow = styled(CircleArrowSVG)<{ showMore: boolean }>`
  ${({ showMore }) => (showMore ? css.size(15) : css.size(12))};
  fill: ${theme('article.digest')};
  margin-right: 5px;
  transform: ${({ showMore }) => (!showMore ? 'rotate(180deg)' : 'rotate(0)')};
`
