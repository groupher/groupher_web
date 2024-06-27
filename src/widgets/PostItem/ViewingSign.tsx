import { type FC, memo } from 'react'

import type { TPost } from '~/spec'
import useIsArticleViewing from '~/hooks/useIsArticleViewing'

import { Wrapper, ViewIcon } from './styles/viewing_sign'

type TProps = {
  article: TPost
  top?: number
  left?: number
}

const ViewingSign: FC<TProps> = ({ article, top = 30, left = -30 }) => {
  const isViewing = useIsArticleViewing(article)

  if (!isViewing) return null

  return (
    <Wrapper top={top} left={left}>
      <ViewIcon />
    </Wrapper>
  )
}

export default memo(ViewingSign)
