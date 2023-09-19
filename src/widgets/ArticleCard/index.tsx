import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TArticle } from '@/spec'
import { THREAD } from '@/constant/thread'
import SIZE from '@/constant/size'
import { cutRest } from '@/utils/fmt'
import { previewArticle } from '@/signal'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import DigestSentence from '@/widgets/DigestSentence'
import { Br, SpaceGrow, DesktopOnly, MobileOnly } from '@/widgets/Common'
import ArticleImgWindow from '@/widgets/ArticleImgWindow'

import Footer from './Footer'

import { Wrapper, Title, MobileDigest } from './styles'

export type TProps = {
  data: TArticle
}

const ArticleCard: FC<TProps> = ({ data }) => {
  const { slug } = useViewingCommunity()
  const { innerId, title, digest } = data

  return (
    <Wrapper onClick={() => previewArticle(data)}>
      <Br top={5} />
      <Title onClick={(e) => e.preventDefault()} href={`/${slug}/${THREAD.POST}/${innerId}`}>
        {title}
      </Title>

      <DesktopOnly>
        <DigestSentence
          top={5}
          bottom={16}
          size={SIZE.SMALL}
          onPreview={() => {
            //
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
