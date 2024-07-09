import styled, { css, theme } from '~/css'

import ArrowSVG from '~/icons/ArrowSimple'
import ListSVG from '~/icons/List'

type TWrapper = { open: boolean; onClick: () => void }
export const Wrapper = styled.div<TWrapper>`
  position: absolute;
  top: 12%;
  left: ${({ open }) => (open ? '214px' : '20px')};
  transform: ${({ open }) => (open ? '' : 'rotate(180deg)')};

  ${({ open }) => (open ? css.circle(24) : css.circle(28))};
  ${css.row('align-both')};
  background: ${theme('hoverBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  z-index: 2;

  &:hover {
    box-shadow: ${css.cardShadow};
    background: white;
    cursor: pointer;
    box-shadow: rgb(17 17 26 / 10%) 0px 0px 16px;
  }
  transition: all 0.1s;
`

export const ToggleArrowIcon = styled(ArrowSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`

export const ToggleListIcon = styled(ListSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  opacity: 0.6;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`
