import { type FC, memo, lazy, Suspense } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import IconButton from '../IconButton'
import { Wrapper } from '../styles/copy_button'

const AnimatedCopyButton = lazy(() => import('./Animate'))

type TProps = {
  value: string
}

const CopyButton: FC<TProps> = ({ value }) => {
  return (
    <Wrapper>
      <CopyToClipboard text={value}>
        <Suspense fallback={<IconButton path="article/clipboard.svg" right={5} />}>
          {/*  @ts-ignore */}
          <AnimatedCopyButton />
        </Suspense>
      </CopyToClipboard>
    </Wrapper>
  )
}

export default memo(CopyButton)
