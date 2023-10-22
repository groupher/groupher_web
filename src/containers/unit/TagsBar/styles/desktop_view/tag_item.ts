import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'

import css, { theme, rainbow, rainbowLight } from '@/css'

import Img from '@/Img'
import HashSVG from '@/icons/HashTagLight'
import CloseSVG from '@/icons/CloseLight'

type TTag = TActive & { color?: string } & TPrimaryColor

export const Wrapper = styled.div<TActive>`
  ${css.row('align-center')};
  margin-left: -2px;
  padding: 4px;
  padding-left: ${({ $active }) => ($active ? '8px' : '2px')};
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
export const DotWrapper = styled.div<TTag>`
  width: 24px;
  height: 16px;
  ${css.row('align-both')};
  margin-right: 6px;
  margin-left: ${({ $active }) => ($active ? '-5px' : 0)};
  border-radius: 4px;
  background: ${({ $active, primaryColor }) =>
    $active ? rainbowLight(primaryColor) : 'transparent'};
`
type THashSign = TActive & { color?: string }
export const DotSign = styled.div<THashSign>`
  ${css.circle(8)};
  background: ${({ color }) => (color ? rainbow(color) : 'none')};
  opacity: ${({ $active }) => ($active ? 1 : theme('tags.dotOpacity'))};

  ${Wrapper}:hover & {
    opacity: 0.9;
  }

  transition: filter 0.1s;
`
type THashIcon = { color: string } & TActive
export const HashIcon = styled(HashSVG)<THashIcon>`
  ${css.size(12)};
  fill: ${({ color }) => (color ? rainbow(color) : 'none')};
`
export const Tag = styled.div<TTag>`
  ${css.row('align-end', 'justify-between')};
  width: 100%;
  font-size: 13px;
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
