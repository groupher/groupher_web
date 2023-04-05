import { pagedPosts, pagedPublishedPosts, post, groupedKanbanPosts } from './post'

import { user, sessionState } from './user'
import { community, subscribedCommunities, pagedCommunities } from './community'
import { pagedComments } from './comment'
import { pagedCategories, pagedArticleTags } from './misc'
import { mentions } from './mail'

import { reaction, undoReaction, setTag, unsetTag, follow, undoFollow } from './action'

const P = {
  // community
  community,
  subscribedCommunities,
  pagedCommunities,
  groupedKanbanPosts,
  // comment
  pagedComments,
  // misc
  pagedCategories,
  pagedArticleTags,
  // post
  pagedPosts,
  pagedPublishedPosts,
  post,
  // user
  user,
  sessionState,
  // action
  // mentions
  mentions,
  reaction,
  undoReaction,
  setTag,
  unsetTag,
  follow,
  undoFollow,
}

export default P
