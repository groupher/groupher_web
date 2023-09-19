/* *
 * DocThread
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/mobx'
import { DOC_LAYOUT } from '@/constant/layout'

import { Divider } from '@/widgets/Common'
import FaqList from '@/widgets/FaqList'

import BlocksLayout from './BlocksLayout'
import ListsLayout from './ListsLayout'
import CardsLayout from './CardsLayout'
import ArticleLayout from './ArticleLayout'

import type { TStore } from './store'
import { Wrapper, FAQWrapper } from './styles'
import { useInit } from './logic'

// const log = buildLog('C:DocThread')

type TProps = {
  docThread?: TStore
  testid?: string
  title?: string
  desc?: string
  isSidebarLayout?: boolean
}

const DocThreadContainer: FC<TProps> = ({
  docThread: store,
  testid = 'doc-thread',
  title = 'title',
  desc = 'desc',
  isSidebarLayout = false,
}) => {
  useInit(store)

  const { isArticleLayout, layout, faqLayout, isFAQArticleLayout, faqSections } = store
  const { isMobile } = useMobileDetect()

  if (isArticleLayout) {
    return (
      <ArticleLayout isFAQArticleLayout={isFAQArticleLayout} isSidebarLayout={isSidebarLayout} />
    )
  }

  return (
    <Wrapper testid={testid} isSidebarLayout={isSidebarLayout}>
      {layout === DOC_LAYOUT.BLOCKS && <BlocksLayout />}
      {layout === DOC_LAYOUT.LISTS && <ListsLayout />}
      {layout === DOC_LAYOUT.CARDS && <CardsLayout />}

      <Divider top={50} bottom={80} width={isMobile ? '90%' : '100%'} />

      <FAQWrapper>
        <FaqList layout={faqLayout} sections={faqSections} />
      </FAQWrapper>
    </Wrapper>
  )
}

export default bond(DocThreadContainer, 'docThread') as FC<TProps>
