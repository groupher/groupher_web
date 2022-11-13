import { FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TArticle, TThread } from '@/spec'
import { SIZE, THREAD, EVENT } from '@/constant'

import { cutRest, send } from '@/utils/helper'
import DigestSentence from '@/widgets/DigestSentence'
import { Br, SpaceGrow } from '@/widgets/Common'
import ArticleImgWindow from '@/widgets/ArticleImgWindow'

import Footer from './Footer'

import { Wrapper, MobileDigest } from './styles'

export type TProps = {
  data: TArticle
  thread?: TThread
}

const ArticleCard: FC<TProps> = ({ data, thread = THREAD.JOB }) => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper>
      <Br top={8} />
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
