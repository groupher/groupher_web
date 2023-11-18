/* *
 * DocThread
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { DOC_LAYOUT } from '@/constant/layout'

import { Divider } from '@/widgets/Common'
import FaqList from '@/widgets/FaqList'

import useBannerLayout from '@/hooks/useBannerLayout'

import BlocksLayout from './BlocksLayout'
import ListsLayout from './ListsLayout'
import CardsLayout from './CardsLayout'
import ArticleLayout from './ArticleLayout'

import { useStore } from './store'
import { Wrapper, FAQWrapper } from './styles'
import { useInit } from './logic'

// const log = buildLog('C:DocThread')

type TProps = {
  title?: string
}

const DocThread: FC<TProps> = ({ title = 'title' }) => {
  const store = useStore()
  useInit(store)

  const { isArticleLayout, layout, faqLayout, isFAQArticleLayout, faqSections } = store
  const { isMobile } = useMobileDetect()
  const bannerLayout = useBannerLayout()

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

export default observer(DocThread)
