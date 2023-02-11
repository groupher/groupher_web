/*
 *
 * FaqList
 *
 */

import { FC, memo } from 'react'

import type { TArticle, TSpace, THelpFAQLayout } from '@/spec'
import { HELP_FAQ_LAYOUT } from '@/constant/layout'
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
  layout?: THelpFAQLayout
  articles?: TArticle[]
  large?: boolean
} & TSpace

const FaqList: FC<TProps> = ({
  testid = 'faq-list',
  layout = HELP_FAQ_LAYOUT.FAQ_FLAT,
  articles = DefaultFAQ,
  large = false,
  ...restProps
}) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      {layout === HELP_FAQ_LAYOUT.FAQ_FLAT && <Flat articles={articles} large={large} />}
      {layout === HELP_FAQ_LAYOUT.FAQ_SEARCH_HINT && <SearchHint articles={articles} />}
      {layout === HELP_FAQ_LAYOUT.FAQ_COLLAPSE && <Collapse articles={articles} />}
    </Wrapper>
  )
}

export default memo(FaqList)
