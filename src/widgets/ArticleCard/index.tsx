import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticle } from '@/spec'
import { THREAD } from '@/constant/thread'
import SIZE from '@/constant/size'
import { cutRest } from '@/fmt'
import { previewArticle } from '@/signal'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useIsArticleViewing from '@/hooks/useIsArticleViewing'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'
import DigestSentence from '@/widgets/DigestSentence'
import { Br, SpaceGrow, DesktopOnly, MobileOnly } from '@/widgets/Common'
import ArticleImgWindow from '@/widgets/ArticleImgWindow'

import Footer from './Footer'

import { Wrapper, Title, MobileDigest, PinHintDot, ViewedHintDot } from './styles'

export type TProps = {
  data: TArticle
}

const ArticleCard: FC<TProps> = ({ data }) => {
  const { slug } = useViewingCommunity()
  const { innerId, title, digest, isPinned, viewerHasViewed } = data
  const isViewing = useIsArticleViewing(data)

  return (
    <Wrapper viewing={isViewing}>
      <PinHintDot>
        <ArticlePinLabel isPinned={isPinned} top={0} left={0} />
      </PinHintDot>

      <ViewedHintDot>
        <ArticleReadLabel viewed={viewerHasViewed} top={0} right={0} />
      </ViewedHintDot>

      <Br top={5} />
      <Title
        onClick={(e) => {
          e.preventDefault()
          previewArticle(data)
        }}
        href={`/${slug}/${THREAD.POST}/${innerId}`}
      >
        {title}
      </Title>

      <DesktopOnly>
        <DigestSentence
          top={5}
          bottom={16}
          size={SIZE.SMALL}
          onPreview={() => {
            previewArticle(data)
          }}
        >
          {cutRest(digest, 150)}
        </DigestSentence>
      </DesktopOnly>

      <MobileOnly>
        <MobileDigest>{digest}</MobileDigest>
      </MobileOnly>

      <Br top={4} />
      <ArticleImgWindow />
      <Br top={18} />
      <SpaceGrow />
      <Footer data={data} />
    </Wrapper>
  )
}

export default observer(ArticleCard)
