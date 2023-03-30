import { FC, memo } from 'react'

import type { TPost } from '@/spec'
import useViewing from '@/hooks/useViewing'

import { Wrapper, ViewIcon } from './styles/viewing_sign'

type TProps = {
  article: TPost
  top?: number
}

const ViewingSign: FC<TProps> = ({ article, top = 30 }) => {
  const viewingArticle = useViewing()

  // !viewingArticle means drawer closed
  if (!viewingArticle) return null

  const { id, community } = viewingArticle

  if (!(article.innerId === id && community === article.originalCommunityRaw)) return null

  return (
    <Wrapper top={top}>
      <ViewIcon />
    </Wrapper>
  )
}

export default memo(ViewingSign)
