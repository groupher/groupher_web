import TagsSchema from '~/unit/DsbThread/schema/tags'

import { type TDsbTagReindexContext, type TDsbTagSaveContext, type TDsbSaveRequest } from './types'

/** Builds the tag update mutation input after slug generation. */
export const buildTagSave = ({
  community,
  editingTag,
  slug,
}: TDsbTagSaveContext & { slug: string }): TDsbSaveRequest => ({
  schema: TagsSchema.updateCommunityTag,
  params: { ...editingTag, community, slug },
})

/** Builds the group and tag index payload for the paired reindex mutations. */
export const buildTagReindexSave = ({
  community,
  dashboard,
  activeTagThread,
}: TDsbTagReindexContext): TDsbSaveRequest & {
  thread: TDsbTagReindexContext['activeTagThread']
  groups: { id: string; index: number }[]
  tags: { id: string; groupId: string; index: number }[]
} => {
  const tags = dashboard.tagGroups.flatMap((group) =>
    group.tags.map((tag) => ({ id: tag.id, groupId: group.id, index: tag.index })),
  )
  const groups = dashboard.tagGroups.map((group) => ({ id: group.id, index: group.index }))

  return {
    schema: TagsSchema.reindexCommunityTagGroups,
    params: { community, thread: activeTagThread, groups },
    thread: activeTagThread,
    groups,
    tags,
  }
}
