import MENU from '~/const/menu'

// import type { TTestable } from '~/spec'

import styled, { css, theme } from '~/css'

import ArrowSVG from '~/icons/Arrow'
import Arrow2TopSVG from '~/icons/Arrow2Top'
import SettingSVG from '~/icons/Setting'
import DeleteSVG from '~/icons/Trash'

export const Wrapper = styled.div`
  ${css.row('justify-between', 'align-center')};
  padding: 3px 4px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`

export const DeleteTitle = styled(Title)`
  ${Wrapper}:hover & {
    color: ${theme('rainbow.red')};
  }
`

const ArrowLeftIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
const ArrowRightIcon = styled(ArrowLeftIcon)`
  transform: rotate(-180deg);
`

const Arrow2LeftIcon = styled(Arrow2TopSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: -1px;
  transform: rotate(-90deg);

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
const Arrow2RightIcon = styled(Arrow2LeftIcon)`
  transform: rotate(90deg);
`

const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(-90deg);
`
const Arrow2TopIcon = styled(Arrow2TopSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: -1px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`

const Arrow2BottomIcon = styled(Arrow2TopIcon)`
  transform: rotate(180deg);
`

export const SettingIcon = styled(SettingSVG)`
  ${css.size(9)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
  margin-left: 1px;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }
`

export const DeleteIcon = styled(DeleteSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};

  ${Wrapper}:hover & {
    fill: ${theme('rainbow.red')};
  }
`

export const MenuIcon = {
  [MENU.ARROW_LEFT]: ArrowLeftIcon,
  [MENU.ARROW_TO_LEFT]: Arrow2LeftIcon,
  [MENU.ARROW_RIGHT]: ArrowRightIcon,
  [MENU.ARROW_TO_RIGHT]: Arrow2RightIcon,

  [MENU.ARROW_UP]: ArrowUpIcon,
  [MENU.ARROW_DOWN]: ArrowDownIcon,

  [MENU.ARROW_TO_TOP]: Arrow2TopIcon,
  [MENU.ARROW_TO_BOTTOM]: Arrow2BottomIcon,
  [MENU.SETTING]: SettingIcon,
  [MENU.DELETE]: DeleteIcon,
}
