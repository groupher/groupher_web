import type { DocumentNode } from 'graphql'

import type { TDsbFieldMap, TTag, TThread } from '~/spec'

export type TDsbSaveRequest = {
  schema: DocumentNode
  params: Record<string, unknown>
  readConfirmed?: TDsbConfirmedReader
}

export type TDsbConfirmedReader = (data: unknown) => Partial<TDsbFieldMap>

export type TDsbSaveContext = {
  community: string
  dashboard: TDsbFieldMap
  original: TDsbFieldMap
}

export type TDsbTagSaveContext = TDsbSaveContext & {
  editingTag: TTag
}

export type TDsbTagReindexContext = TDsbSaveContext & {
  activeTagThread: TThread
}
