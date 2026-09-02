import type { TColorName, TConstValues, TDsbPath, TTransKey } from '~/spec'
import type { TDsbFieldMap } from '~/spec'

import type { DSB_MENU_ICON, FIELD } from './constant'
import type { TDsbMenuIcon } from './SideMenu/icons'

export { TNameAlias } from '~/spec'

type TMenuGroupName = 'BASIC' | 'ANALYSIS' | 'CMS' | 'INTEGRATE'

export type TDsbMenuGroup = {
  title: TTransKey
  icon: TConstValues<typeof DSB_MENU_ICON>
  overviewSlug: string
  initFold: boolean
  children: TDsbMenuItem[]
}

type TDsbMenuItem = { title: TTransKey; slug: TDsbPath; icon: TDsbMenuIcon; alias?: string }

export type TDsbMenu = {
  [k: TMenuGroupName]: TDsbMenuGroup
}

export type TDsbEditableFieldKey = keyof TDsbFieldMap
export type TDsbFieldKey = TDsbEditableFieldKey | TConstValues<typeof FIELD>

type TDocFile = {
  index: number
  name: string
  articleId: string
  linkAddr: string
}

type TDocCategory = {
  name: string
  index: number
  color: TColorName
  files: TDocFile[]
}

export type TDocSettings = {
  categories: TDocCategory[]
}

export type THeaderEditType = 'logo' | 'title'
export type TFooterEditType = THeaderEditType | 'social'

export type TMoveLinkDir = 'up' | 'down' | 'top' | 'bottom'
