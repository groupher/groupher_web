import { FC, memo, Fragment } from 'react'

import type { TSizeSM } from '@/spec'
import { SIZE } from '@/constant'

import { Space } from '@/widgets/Common'

import { Wrapper, Count, CommentsIcon, HighlightWrapper } from './styles'

type TProps = {
  count: number
  size?: TSizeSM
}

const CommentsCount: FC<TProps> = ({ count, size = SIZE.SMALL }) => {
  return (
    <Fragment>
      {count >= 100 ? (
        <HighlightWrapper size={size}>
          <CommentsIcon size={size} highlight />
          {size === SIZE.MEDIUM && <Space right={2} />}
          <Count>{count}</Count>
        </HighlightWrapper>
      ) : (
        <Wrapper size={size}>
          <CommentsIcon size={size} />
          {size === SIZE.MEDIUM && <Space right={2} />}
          <Count>{count}</Count>
        </Wrapper>
      )}
    </Fragment>
  )
}

export default memo(CommentsCount)
