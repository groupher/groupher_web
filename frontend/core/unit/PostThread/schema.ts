import { changelogPage } from '../../schemas/pages/changelog'
import { communityTagStats as communityTagStatsQuery } from '../../schemas/pages/misc'
import { postPage } from '../../schemas/pages/post'

const PAGED_ARTICLE_SCHEMA = {
  post: postPage,
  changelog: changelogPage,
}

const getPagedArticlesSchema = (thread) => {
  return PAGED_ARTICLE_SCHEMA[thread]
}

const communityTagStats = communityTagStatsQuery

const schema = {
  communityTagStats,
  getPagedArticlesSchema,
}

export default schema
