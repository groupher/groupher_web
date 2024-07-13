import type { TActive, TColor } from '~/spec'

import styled, { css, theme, rainbowLight } from '~/css'

import Img from '~/Img'
import CloseSVG from '~/icons/CloseLight'

type TTag = TActive & TColor

export const Wrapper = styled.div<TActive>`
  ${css.row('align-center')};
  margin-left: -2px;
  padding: 4px;
  margin-top: ${({ $active }) => ($active ? '3px' : 0)};
  margin-bottom: ${({ $active }) => ($active ? '3px' : 0)};
  padding-left: 4px;
  max-width: 200px;
  border-radius: 8px;
  border: 1px solid;
  border-color: transparent;
  border-color: ${({ $active }) => ($active ? theme('divider') : 'transparent')};

  &:hover {
    border-color: ${theme('divider')};
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`
export const AllTagIcon = styled(Img)`
  fill: ${theme('article.digest')};
  margin-right: 10px;
  ${css.size(14)};
  transform: rotate(17deg);
`

export const Tag = styled.div<TTag>`
  ${css.row('align-center')};
  width: auto;
  font-size: 14px;
  border-radius: 5px;
  padding-left: 3px;
  padding-right: 8px;

  background: ${({ $active, $color }) => ($active ? rainbowLight($color) : 'transparent')};

  ${Wrapper}:hover & {
    cursor: pointer;
  }

  transition: all 0.1s;
`

export const Grow = styled.div`
  flex-grow: 1;
  height: 20px;
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
