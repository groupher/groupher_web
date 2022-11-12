import { FC, memo } from 'react'
import type { TArticle, TThread } from '@/spec'

import Toc from './Toc'

type TProps = {
  article: TArticle
  thread: TThread
  show?: boolean
}

const RightSticker: FC<TProps> = ({ article, thread, show }) => {
  switch (thread) {
    default: {
      return <Toc show={show} />
    }
  }
}

export default memo(RightSticker)
