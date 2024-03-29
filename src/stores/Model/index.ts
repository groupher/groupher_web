import { T } from '@/mobx'

export { Community, Moderator, PagedCommunities } from './Community'
export { default as Article } from './Article'
export { Comment, PagedComments } from './Comment'
export { Post, PagedPosts } from './Post'
export { Doc, PagedDocs } from './Doc'
export { Changelog, PagedChangelogs } from './Changelog'
export { Tag, PagedTags, emptyTag } from './Tag'
export { FAQSection, emptyFAQSection } from './FAQSection'
export { Category, PagedCategories } from './Category'
export { FavoriteCategory, PagedFavoriteCategories } from './FavoriteCategory'

export { GithubUser } from './GithubUser'
export { emptyPagi } from './helper/common'

export { SimpleUser } from './Common'
export { EmptyUser, EmptyAchievement, User, PagedUsers } from './User'

export { MailStatus, MentionMsg, PagedMentionMessages } from './Mail'

export const Mention = T.model('Mention', {
  id: T.string,
  name: T.string,
  avatar: T.string,
})

export { articleFields, Document } from './helper/article'
