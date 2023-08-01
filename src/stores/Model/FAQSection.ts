import { T } from '@/utils/mobx'

export const FAQSection = T.model('FAQSection', {
  id: T.maybeNull(T.string),
  title: T.maybeNull(T.string),
  body: T.maybeNull(T.string),
  index: T.opt(T.number, 0),
})

export const emptyFAQSection = { id: '', title: '', body: '', index: 0 }
