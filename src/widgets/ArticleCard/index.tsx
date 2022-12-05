import { FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TArticle, TThread } from '@/spec'
import { SIZE, THREAD, EVENT } from '@/constant'

import { cutRest } from '@/utils/helper'
import { send } from '@/utils/signal'
import DigestSentence from '@/widgets/DigestSentence'
import { Br, SpaceGrow } from '@/widgets/Common'
import ArticleImgWindow from '@/widgets/ArticleImgWindow'

import Footer from './Footer'

import { Wrapper, Title, MobileDigest } from './styles'

export type TProps = {
  data: TArticle
  thread?: TThread
}

const ArticleCard: FC<TProps> = ({ data, thread = THREAD.POST }) => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper>
      <Br top={8} />
      <Title>{data.title}</Title>

      {isMobile ? (
        <MobileDigest>{data.digest}</MobileDigest>
      ) : (
        <DigestSentence
          top={5}
          bottom={16}
          size={isMobile ? SIZE.SMALL : SIZE.MEDIUM}
          onPreview={() => send(EVENT.PREVIEW_ARTICLE, { article: data })}
        >
          {cutRest(data.digest, 150)}
        </DigestSentence>
      )}
      <Br top={6} />
      <ArticleImgWindow />
      <Br top={18} />
      <SpaceGrow />
      <Footer data={data} />
    </Wrapper>
  )
}

export default memo(ArticleCard)
