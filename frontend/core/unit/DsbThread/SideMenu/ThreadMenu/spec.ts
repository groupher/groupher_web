import type { ReactNode } from 'react'

import type { MENU_VIEW } from '../../constant'
import type { TSubMenuItem, TSubMenuScope } from '../spec'

export type TThreadMenuView = Exclude<`${MENU_VIEW}`, `${MENU_VIEW.MAIN}`>

export type TThreadMenuConfig = {
  baseRoute: string
  defaultSlug: string
  entryPath: string
  entrySlug: string
  items: readonly TSubMenuItem[]
  scope: TSubMenuScope
}

export type TThreadMenuProps = {
  activeSlug: string | null
  collapsed: boolean
  collapsedClassName?: string
  onCollapse: () => void
  onExpand: () => void
  returnTo: string | null
}

export type TThreadMenuFrameProps = TThreadMenuProps & {
  config: TThreadMenuConfig
  endSlots?: Readonly<Partial<Record<string, ReactNode>>>
  view: TThreadMenuView
}
