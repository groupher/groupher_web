import styled, { css, theme } from '@/css'

import ArrowTopSVG from '@/icons/Arrow2Top'
import NotifySVG from '@/icons/Notify'
import PeopleSVG from '@/icons/HeartPulse'
import MoreSVG from '@/icons/menu/MoreL'
import ShareSVG from '@/icons/ShareArrow'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  height: 40px;
  width: 200px;
  gap: 0 5px;
  border: 1px solid;
  border-left: 2px solid;
  border-color: ${theme('divider')};
  border-radius: 15px;

  &:hover {
    box-shadow: ${theme('shadow.md')};
  }

  transition: all .2s;
`
export const IconBox = styled.div`
  ${css.size(26)};
  ${css.row('align-both')};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    box-shadow: ${theme('shadow.xl')};
    background: ${theme('hoverBg')};
  }
`
export const PeopleBox = styled(IconBox)`
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

export const ICON = {
  ArrowTop: commonIcon(ArrowTopSVG),
  Notify: commonIcon(NotifySVG),
  People: styled(commonIcon(PeopleSVG))`
    ${css.size(15)};
    ${PeopleBox}:hover & {
      fill: ${theme('rainbow.red')};
    }
  `,
  Share: commonIcon(ShareSVG),
  More: commonIcon(MoreSVG),
}
