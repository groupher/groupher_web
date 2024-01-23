import styled, { css, theme } from '@/css'

import HashTagBoldSVG from '@/icons/HashTag'

export { Icon } from '@/widgets/ArticleSettingMenu/styles/icon'
export { MenuItem, MenuTitle, DangerMenuItem } from '@/widgets/ArticleSettingMenu/styles/menu'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 10px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 150px;
  height: 350px;
  border-radius: 6px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 11;
  position: absolute;
  bottom: 200px;
  right: 35px;
  background: rgb(247 247 247 / 57%);
  backdrop-filter: blur(50px);
`

export const TagIcon = styled(HashTagBoldSVG)`
  ${css.size(14)};
  fill: ${theme('rainbow.blue')};
  margin-right: 6px;
  margin-top: 1px;
`
