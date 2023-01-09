/*
 *
 * FaqList
 *
 */

import { FC, memo } from 'react'

import type { TArticle, TSpace } from '@/spec'
import { buildLog } from '@/utils/logger'

import { FAQ as DefaultFAQ } from '@/constant/landingPage'

import Flat from './Flat'
import SearchHint from './SearchHint'
import Collapse from './Collapse'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:FaqList:index')

export type TProps = {
  testid?: string
  mode?: 'flat' | 'search-hint' | 'collapse'
  articles?: TArticle[]
  large?: boolean
} & TSpace

const FaqList: FC<TProps> = ({
  testid = 'faq-list',
  mode = 'flat',
  articles = DefaultFAQ,
  large = false,
  ...restProps
}) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      {mode === 'flat' && <Flat articles={articles} large={large} />}
      {mode === 'search-hint' && <SearchHint articles={articles} />}
      {mode === 'collapse' && <Collapse articles={articles} />}
    </Wrapper>
  )
}

export default memo(FaqList)
