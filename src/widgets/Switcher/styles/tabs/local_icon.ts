import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/css'
import PostSVG from '@/icons/Post'
import CitySVG from '@/icons/City'
//
// import TabRepoSVG from '@/SvgIcons/TabRepoSVG'
// import TabCheatsheetSVG from '@/SvgIcons/TabCheatsheetSVG'

// user page
import PublishSVG from '@/icons/Publish'
import BillingSVG from '@/icons/Billing'
import TabCommentsSVG from '@/SvgIcons/TabCommentsSVG'
import SettingSVG from '@/icons/Setting'
import TabFavoritesSVG from '@/widgets/SvgIcons/TabFavoritesSVG'

export const LableWrapper = styled.div`
  ${css.flex('align-center')};
`

type TCommonIcon = { $active: boolean; $small: boolean }

const commonIcon = (comp) => {
  return styled(comp)<TCommonIcon>`
    fill: ${({ $active }: { $active: boolean }) =>
      $active ? theme('article.title') : theme('article.digest')};
    width: ${({ $small }: { $small: boolean }) => ($small ? '13px' : '15px')};
    height: ${({ $small }) => ($small ? '13px' : '15px')};
    margin-right: 5px;
    display: block;
  `
}

// export const PostIcon = commonIcon(PostSVG)
export const CityIcon = commonIcon(CitySVG)
export const PostIcon = styled(PostSVG)<TCommonIcon>`
  fill: ${({ $active }: { $active: boolean }) =>
    $active ? theme('article.title') : theme('article.digest')};
  width: ${({ $small }: { $small: boolean }) => ($small ? '14px' : '15px')};
  height: 16px;
  margin-right: 8px;
  display: block;
`

// export const TabRepoIcon = commonIcon(TabRepoSVG)
// export const TabCheatsheetIcon = commonIcon(TabCheatsheetSVG)

// user page
export const PublishIcon = commonIcon(PublishSVG)
export const TabBillingIcon = commonIcon(BillingSVG)
export const TabCommentsIcon = commonIcon(TabCommentsSVG)
export const SettingIcon = commonIcon(SettingSVG)
export const TabFavoritesIcon = commonIcon(TabFavoritesSVG)
