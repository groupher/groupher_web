import styled from 'styled-components'

import type { TPrimaryColor } from '@/spec'

import css, { theme, rainbowTheme } from '@/css'

// user page
import DiscussSVG from '@/icons/Discuss'
import KanbanSVG from '@/icons/Kanban'
import GuideSVG from '@/icons/Book'
import TadaSVG from '@/icons/TadaRaw'
import InfoSVG from '@/icons/Info'
import ArrowSVG from '@/icons/ArrowUpRight'

import PublishSVG from '@/icons/Publish'
import BillingSVG from '@/icons/Billing'
import TabCommentsSVG from '@/SvgIcons/TabCommentsSVG'
import SettingSVG from '@/icons/Setting'
import TabFavoritesSVG from '@/widgets/SvgIcons/TabFavoritesSVG'

import { Label } from './tab_item'

export const LableWrapper = styled.div`
  ${css.row('align-center')};
`

type TCommonIcon = { $active: boolean; $small: boolean } & TPrimaryColor

const commonIcon = (comp) => {
  return styled(comp)<TCommonIcon>`
    fill: ${({ $active, primaryColor }) => ($active ? rainbowTheme(primaryColor) : theme('hint'))};
    width: ${({ $small }: { $small: boolean }) => ($small ? '12px' : '14px')};
    height: ${({ $small }) => ($small ? '12px' : '14px')};
    margin-right: 5px;
    display: block;

    ${Label}:hover & {
      fill: ${({ primaryColor }) => rainbowTheme(primaryColor)};
    }
  `
}

// export const TabRepoIcon = commonIcon(TabRepoSVG)
// export const TabCheatsheetIcon = commonIcon(TabCheatsheetSVG)
export const DiscussIcon = styled(commonIcon(DiscussSVG))`
  transform: scale(0.96);
  margin-top: 2px;
`
export const TadaIcon = commonIcon(TadaSVG)
export const InfoIcon = commonIcon(InfoSVG)
export const ArrowIcon = commonIcon(ArrowSVG)

export const KanbanIcon = styled(commonIcon(KanbanSVG))`
  transform: rotate(180deg);
`
export const GuideIcon = commonIcon(GuideSVG)

// user page
export const PublishIcon = commonIcon(PublishSVG)
export const TabBillingIcon = commonIcon(BillingSVG)
export const TabCommentsIcon = commonIcon(TabCommentsSVG)
export const SettingIcon = commonIcon(SettingSVG)
export const TabFavoritesIcon = commonIcon(TabFavoritesSVG)
