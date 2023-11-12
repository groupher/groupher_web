import { FC, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import type { TPost } from '@/spec'
import { ARTICLE_THREAD } from '@/constant/thread'

import { Wrapper, Title } from '../../styles/cover_layout/mobile_view/body'

type TProps = {
  article: TPost
}

const Body: FC<TProps> = ({ article }) => {
  const router = useRouter()

  const gotoArticle = useCallback(() => {
    router.push(`/${ARTICLE_THREAD.POST}/${article.id}`)
  }, [router, article.id])

  return (
    <Wrapper>
      <Title onClick={gotoArticle}>{article.title}</Title>
    </Wrapper>
  )
}

export default memo(Body)
