import type { ReactNode } from 'react'

import type { TTransKey } from '~/spec'

import type { TAB } from './constant'
import type { TSelectionUpdate } from './utils'

export type TTab = `${TAB}`

type TActionMeta = {
  heading: string
  bold: string
  italic: string
  quote: string
  code: string
  linkText: string
  listItem: string
  taskItem: string
}

export type TFormat = {
  label: ReactNode
  hint: string
  action: (textarea: HTMLTextAreaElement) => TSelectionUpdate
  className?: string
}

export type TFormatConfig = {
  label: ReactNode
  hintKey: TTransKey
  action: (textarea: HTMLTextAreaElement, meta: TActionMeta) => TSelectionUpdate
  className?: string
}
