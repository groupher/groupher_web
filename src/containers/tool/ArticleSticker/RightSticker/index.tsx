import { FC, memo } from 'react'
import type { TThread } from '@/spec'

import Toc from './Toc'

type TProps = {
  thread: TThread
  show?: boolean
}

const RightSticker: FC<TProps> = ({ thread, show }) => {
  switch (thread) {
    default: {
      return <Toc show={show} />
    }
  }
}

export default memo(RightSticker)
