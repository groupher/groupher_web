import styled, { css, theme } from '@/css'

import type { TActive } from '@/spec'

import ArrowTopSVG from '@/icons/Arrow2Top'
import NotifySVG from '@/icons/Notify'
import PeopleSVG from '@/icons/HeartPulse'
import I18nSVG from '@/icons/I18n'
import MoreSVG from '@/icons/menu/MoreL'

type TWrapper = {
  $expand: boolean
  $withTop: boolean
  $menuHeight: string
  $forceHidden: boolean
}

export const Wrapper = styled.div<TWrapper>`
  position: relative;
  height: ${({ $expand, $menuHeight }) => ($expand ? $menuHeight : '40px')};
  width: ${({ $expand, $withTop }) => {
    if ($withTop && $expand) return '200px'

    if ($withTop) return '200px'

    return '185px'
  }};
  margin-left: ${({ $expand, $withTop }) => {
    if ($expand && $withTop) return '-10px'

    return 0
  }};
  box-shadow: ${({ $expand }) => ($expand ? theme('shadow.md') : 'none')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 15px;
  background: ${theme('popover.bg')};
  overflow: ${({ $forceHidden }) => ($forceHidden ? 'hidden' : 'visible')};

  &:hover {
    box-shadow: ${theme('shadow.md')};
  }

  transition: all .2s cubic-bezier(0.4, 0.01, 0.3, 1.2);
`
export const ButtonBar = styled.div`
  ${css.row('align-both')};
  height: 36px;
  width: calc(100% - 2px);
  position: absolute;
  bottom: 1px;
  left: 1px;
  gap: 0 5px;
  background: ${theme('htmlBg')};
  border-radius: 10px;
`
export const TipText = styled.div`
  color: ${theme('article.digest')};
  padding: 1px 4px;
`
export const IconBox = styled.div<TActive>`
  ${css.size(26)};
  ${css.row('align-both')};
  border-radius: 5px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  &:hover {
    box-shadow: ${theme('shadow.xl')};
    background: ${theme('hoverBg')};
  }
`
export const PeopleBox = styled(IconBox)<TActive>`
  background: ${({ $active }) => ($active ? theme('rainbow.redBg') : '')};
  &:hover {
    background: ${theme('rainbow.redBg')};
  }
`
export const TopBox = styled(IconBox)<{ $show: boolean }>`
  max-width: ${({ $show }) => ($show ? '26px' : '0')};
  transition: all .2s;
`
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(16)};
    fill: ${theme('article.digest')};
    cursor: pointer;

    &:hover {
      fill: ${theme('article.title')};
    }
  `
}

export const Icon = {
  ArrowTop: commonIcon(ArrowTopSVG),
  Notify: commonIcon(NotifySVG),
  People: styled(commonIcon(PeopleSVG))<TActive>`
    ${css.size(15)};
    fill: ${({ $active }) => ($active ? theme('rainbow.red') : theme('article.digest'))};

    ${PeopleBox}:hover & {
      fill: ${theme('rainbow.red')};
    }
  `,
  I18n: styled(commonIcon(I18nSVG))`
    ${css.size(18)};
  `,
  More: commonIcon(MoreSVG),
}
