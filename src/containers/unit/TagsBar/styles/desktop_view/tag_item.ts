import styled from 'styled-components'

import type { TActive, TColor } from '@/spec'

import css, { theme, rainbowLight } from '@/css'

import Img from '@/Img'
import CloseSVG from '@/icons/CloseLight'

type TTag = TActive & TColor

export const Wrapper = styled.div<TActive>`
  ${css.row('align-center')};
  margin-left: -2px;
  padding: 4px;
  padding-left: ${({ $active }) => ($active ? '8px' : '4px')};
  max-width: 200px;
  border-radius: 8px;
  border: 1px solid;
  border-color: transparent;
  border-color: ${({ $active }) => ($active ? theme('divider') : 'transparent')};

  &:hover {
    border-color: ${theme('divider')};
    cursor: pointer;
  }
`
export const AllTagIcon = styled(Img)`
  fill: ${theme('banner.desc')};
  margin-right: 10px;
  ${css.size(14)};
  transform: rotate(17deg);
`
type TDotWrapper = TTag & { $round: boolean }
export const DotWrapper = styled.div<TDotWrapper>`
  width: 21px;
  height: 18px;
  margin-top: 1px;
  ${css.row('align-both')};
  margin-right: 6px;
  margin-left: ${({ $active }) => ($active ? '-5px' : '-1px')};
  border-radius: ${({ $round }) => ($round ? '50%' : '4px')};
  background: ${({ $active, $color }) => ($active ? rainbowLight($color) : 'transparent')};

  ${Wrapper}:hover & {
    background: ${({ $color }) => rainbowLight($color)};
  }

  transition: background 0.2s;
`

export const Tag = styled.div<TTag>`
  ${css.row('align-end', 'justify-between')};
  width: 100%;
  font-size: 14px;
  padding-left: 4px;

  font-weight: ${({ $active }) => (!$active ? 'bold' : 'normal')};

  ${Wrapper}:hover & {
    cursor: pointer;
  }

  transition: all 0.1s;
`
export const Title = styled.div<TActive>`
  letter-spacing: 1px;
  font-weight: 400;
  filter: saturate(0);

  color: ${({ $active }) => ($active ? theme('article.title') : theme('tags.text'))};

  ${Wrapper}:hover & {
    filter: saturate(1);
  }
`
export const CloseWrapper = styled.div`
  ${css.size(20)};
  width: 28px;
  ${css.row('align-both')};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${theme('hoverBg')};
  }

  transition: all 0.2s;
`
export const CloseIcon = styled(CloseSVG)`
  ${css.size(15)};
  fill: ${theme('hint')};

  &:hover {
    fill: ${theme('article.digest')};
  }
`
