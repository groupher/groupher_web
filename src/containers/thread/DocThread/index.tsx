/* *
 * DocThread
 */

import type { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { DOC_LAYOUT } from '@/const/layout'

import { Divider } from '@/widgets/Common'
import FaqList from '@/widgets/FaqList'

import useLayout from '@/hooks/useLayout'

import BlocksLayout from './BlocksLayout'
import ListsLayout from './ListsLayout'
import CardsLayout from './CardsLayout'
import ArticleLayout from './ArticleLayout'

import { useStore } from './store'
import { Wrapper, FAQWrapper } from './styles'
import { useInit } from './logic'

type TProps = {
  title?: string
}

const DocThread: FC<TProps> = ({ title = 'title' }) => {
  const store = useStore()
  useInit(store)

  const { isArticleLayout, layout, faqLayout, isFAQArticleLayout, faqSections } = store
  const { isMobile } = useMobileDetect()
  const { bannerLayout } = useLayout()

  if (isArticleLayout) {
    return <ArticleLayout isFAQArticleLayout={isFAQArticleLayout} />
  }

  return (
    <Wrapper $testid="doc-thread" $bannerLayout={bannerLayout}>
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

export default DocThread
