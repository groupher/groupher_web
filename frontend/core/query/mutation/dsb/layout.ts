import { serializeKanbanBoards } from '~/const/dashboard'
import type { TDsbFieldMap } from '~/spec'
import AppearanceSchema from '~/unit/DsbThread/schema/appearance'

import type { TDsbSaveContext, TDsbSaveRequest } from './types'

type TLayoutResponse = { updateDashboardLayout?: { layout?: Partial<TDsbFieldMap> } }
const readLayoutResponse = (data: unknown): Partial<TDsbFieldMap> =>
  Object.fromEntries(
    Object.entries((data as TLayoutResponse)?.updateDashboardLayout?.layout ?? {}).filter(
      ([, value]) => value != null,
    ),
  )

/** Builds the broadcast-enable layout mutation input. */
export const buildBroadcastEnableSave = ({
  community,
  dashboard,
}: TDsbSaveContext): TDsbSaveRequest => ({
  schema: AppearanceSchema.updateDashboardLayout,
  params: { community, broadcastEnable: dashboard.broadcastEnable },
  readConfirmed: readLayoutResponse,
})

/** Builds a single layout mutation input and serializes Kanban boards. */
export const buildLayoutSave = ({
  community,
  dashboard,
  field,
}: TDsbSaveContext & { field: keyof TDsbFieldMap }): TDsbSaveRequest => {
  const value = dashboard[field]
  const serializedValue =
    field === 'kanbanBoards' ? serializeKanbanBoards(value as TDsbFieldMap['kanbanBoards']) : value

  return {
    schema: AppearanceSchema.updateDashboardLayout,
    params: { community, [field]: serializedValue },
    readConfirmed: readLayoutResponse,
  }
}
