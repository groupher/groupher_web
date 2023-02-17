/* *
 * HelpThread
 *
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import { HELP_LAYOUT } from '@/constant/layout'

import { Divider } from '@/widgets/Common'
import FaqList from '@/widgets/FaqList'

import BlocksLayout from './BlocksLayout'
import ListsLayout from './ListsLayout'
import ArticleLayout from './ArticleLayout'

import type { TStore } from './store'
import { Wrapper, FAQWrapper } from './styles'
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
  const { isArticleLayout, layout, faqLayout, isFAQArticleLayout } = store
  const { isMobile } = useMobileDetect()

  if (isArticleLayout) {
    return (
      <ArticleLayout isFAQArticleLayout={isFAQArticleLayout} isSidebarLayout={isSidebarLayout} />
    )
  }

  return (
    <Wrapper testid={testid} isSidebarLayout={isSidebarLayout}>
      {layout === HELP_LAYOUT.BLOCKS && <BlocksLayout />}
      {layout === HELP_LAYOUT.LISTS && <ListsLayout />}

      <Divider top={50} bottom={80} width={isMobile ? '90%' : '100%'} />

      <FAQWrapper>
        <FaqList layout={faqLayout} />
      </FAQWrapper>
    </Wrapper>
  )
}

export default bond(HelpThreadContainer, 'helpThread') as FC<TProps>
