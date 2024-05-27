/*
 *
 * FaqList
 *
 */

import { type FC, memo } from 'react'

import type { TArticle, TSpace, TDocFAQLayout, TFAQSection } from '@/spec'
import { DOC_FAQ_LAYOUT } from '@/const/layout'
// import { FAQ as DefaultFAQ } from '@/const/landingPage'

import Flat from './Flat'
import SearchHint from './SearchHint'
import Collapse from './Collapse'

import { Wrapper } from './styles'

export type TProps = {
  testid?: string
  layout?: TDocFAQLayout
  articles?: TArticle[]
  large?: boolean
  sections?: TFAQSection[]
} & TSpace

const FaqList: FC<TProps> = ({
  testid = 'faq-list',
  layout = DOC_FAQ_LAYOUT.FLAT,
  sections = [],
  large = false,
  ...restProps
}) => {
  return (
    <Wrapper $testid={testid} {...restProps}>
      {layout === DOC_FAQ_LAYOUT.FLAT && <Flat sections={sections} large={large} />}
      {layout === DOC_FAQ_LAYOUT.SEARCH_HINT && <SearchHint sections={sections} />}
      {layout === DOC_FAQ_LAYOUT.COLLAPSE && <Collapse sections={sections} />}
    </Wrapper>
  )
}

export default memo(FaqList)
