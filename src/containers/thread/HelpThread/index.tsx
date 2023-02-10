/* *
 * HelpThread
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import type { TStore } from './store'

import BlocksLayout from './BlocksLayout'
import ListsLayout from './ListsLayout'
import ArticleLayout from './ArticleLayout'

import { Wrapper } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:HelpThread')

type TProps = {
  helpThread?: TStore
  testid?: string
  title?: string
  desc?: string
  isSidebarLayout?: boolean
}

const HelpThreadContainer: FC<TProps> = ({
  helpThread: store,
  testid = 'help-thread',
  title = 'title',
  desc = 'desc',
  isSidebarLayout = false,
}) => {
  useInit(store)
  const { isArticleLayout, layout, isFAQArticleLayout } = store

  if (isArticleLayout) {
    return (
      <ArticleLayout isFAQArticleLayout={isFAQArticleLayout} isSidebarLayout={isSidebarLayout} />
    )
  }

  return (
    <Wrapper testid={testid} isSidebarLayout={isSidebarLayout}>
      {/* <ListsLayout /> */}
      <BlocksLayout />
    </Wrapper>
  )
}

export default bond(HelpThreadContainer, 'helpThread') as FC<TProps>
