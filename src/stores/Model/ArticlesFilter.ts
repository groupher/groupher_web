import FILTER from '@/constant/filter'
import { T } from '@/utils/mobx'

export const ArticlesFilter = T.model('ArticlesFilter', {
  when: T.opt(
    T.enum('when', ['', FILTER.TODAY, FILTER.THIS_WEEK, FILTER.THIS_MONTH, FILTER.THIS_YEAR]),
    '',
  ),

  sort: T.opt(
    T.enum('sort', [
      '',
      FILTER.MOST_VIEWS,
      FILTER.MOST_FAVORITES,
      FILTER.MOST_STARS,
      FILTER.MOST_COMMENTS,
      FILTER.MOST_GITHUB_STAR,
      FILTER.MOST_GITHUB_FORK,
      FILTER.MOST_GITHUB_WATCH,
    ]),
    '',
  ),
  length: T.opt(T.enum('length', ['', FILTER.MOST_WORDS, FILTER.LEAST_WORDS]), ''),
  read: T.opt(T.enum('read', ['', FILTER.READ, FILTER.UNREAD]), ''),
})

export const holder = 1
