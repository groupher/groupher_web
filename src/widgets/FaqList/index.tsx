/*
 *
 * FaqList
 *
 */

import { FC, memo } from 'react'

import type { TArticle, TSpace, TDocFAQLayout } from '@/spec'
import { DOC_FAQ_LAYOUT } from '@/constant/layout'
import { FAQ as DefaultFAQ } from '@/constant/landingPage'

import { buildLog } from '@/utils/logger'

import Flat from './Flat'
import SearchHint from './SearchHint'
import Collapse from './Collapse'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:FaqList:index')

export type TProps = {
  testid?: string
  layout?: TDocFAQLayout
  articles?: TArticle[]
  large?: boolean
} & TSpace

const FaqList: FC<TProps> = ({
  testid = 'faq-list',
  layout = DOC_FAQ_LAYOUT.FLAT,
  articles = DefaultFAQ,
  large = false,
  ...restProps
}) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      {layout === DOC_FAQ_LAYOUT.FLAT && <Flat articles={articles} large={large} />}
      {layout === DOC_FAQ_LAYOUT.SEARCH_HINT && <SearchHint articles={articles} />}
      {layout === DOC_FAQ_LAYOUT.COLLAPSE && <Collapse articles={articles} />}
    </Wrapper>
  )
}

export default memo(FaqList)
