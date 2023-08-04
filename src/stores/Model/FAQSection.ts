import { T } from '@/utils/mobx'

export const FAQSection = T.model('FAQSection', {
  title: T.maybeNull(T.string),
  body: T.maybeNull(T.string),
  index: T.opt(T.number, 0),
})

export const emptyFAQSection = { title: '', body: '', index: 0 }
