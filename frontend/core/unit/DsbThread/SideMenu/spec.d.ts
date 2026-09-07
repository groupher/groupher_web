import type { TTransKey } from '~/spec'

import type { TDsbMenuIcon } from './icons'

export type TSubMenuScope = 'changelog' | 'doc' | 'kanban' | 'post'

export type TSubMenuItem = {
  icon: TDsbMenuIcon
  path: string
  slug: string
  title: TTransKey
}
