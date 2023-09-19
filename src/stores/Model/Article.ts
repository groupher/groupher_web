import { T } from '@/mobx'

const Article = T.model('Article', {
  id: T.maybeNull(T.string),
  title: T.maybeNull(T.string),
  desc: T.opt(T.string, ''),
})

export default Article
