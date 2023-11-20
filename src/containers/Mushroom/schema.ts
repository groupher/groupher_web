import { P, F } from '@/schemas'

const schema = {
  getUpvoteSchema: F.getUpvoteSchema,
  getUndoUpvoteSchema: F.getUndoUpvoteSchema,
  pagedPosts: P.pagedPosts,
}

export default schema
