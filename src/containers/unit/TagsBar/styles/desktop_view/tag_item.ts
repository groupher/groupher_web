import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'

import css, { theme, rainbowTheme, primaryLightTheme } from '@/css'

import Img from '@/Img'

import { TagsWrapper } from '.'

type TTag = TActive & { color?: string } & TPrimaryColor

export const Wrapper = styled.div<TTag>`
  ${css.row('align-center')};
  margin-left: -2px;
  padding: 4px;
  max-width: 180px;
  border-radius: 8px;

  background: ${({ $active, primaryColor }) =>
    $active ? primaryLightTheme(primaryColor) : 'transparent'};

  &:hover {
    background: ${({ $active, primaryColor }) =>
      $active ? primaryLightTheme(primaryColor) : theme('hoverBg')};
    cursor: pointer;
  }
`
export const AllTagIcon = styled(Img)`
  fill: ${theme('banner.desc')};
  margin-right: 10px;
  ${css.size(14)};
  transform: rotate(17deg);
`
export const DotWrapper = styled.div`
  ${css.size(15)};
  ${css.row('align-both')};
  margin-right: 6px;
  margin-left: 2px;
`
type THashSign = TActive & { color?: string }
export const DotSign = styled.div<THashSign>`
  ${css.circle(8)};
  background: ${({ color }) => (color ? rainbowTheme(color) : 'none')};
  opacity: ${({ $active }) => ($active ? 1 : theme('tags.dotOpacity'))};

  ${Wrapper}:hover & {
    opacity: 0.9;
  }

  transition: filter 0.1s;
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
export const Title = styled.div`
  letter-spacing: 1px;
  font-weight: 400;
  color: ${theme('tags.text')};
  filter: saturate(0);

  ${Wrapper}:hover & {
    font-weight: 500;
    filter: saturate(1);
  }
`
export const RawWrapper = styled.div<TActive>`
  ${css.row('align-center')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};

  ${Wrapper}:hover & {
    cursor: pointer;
    opacity: 1;
  }
  transition: all 0.1s;
`
export const Raw = styled.div`
  color: ${theme('tags.text')};
  font-size: 12px;
  margin-top: 1px;
  opacity: 0.8;
`
export const CountInfoWrapper = styled.div`
  opacity: 0;

  ${TagsWrapper}:hover & {
    opacity: 1;
  }

  transition: opacity 0.3s;
  transition-delay: 0.5s;
`
