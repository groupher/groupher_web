import { FC, memo, Fragment } from 'react'

import type { TSizeSM, TSpace } from '@/spec'
import SIZE from '@/const/size'

import { Space } from '@/widgets/Common'

import { Wrapper, Count, CommentsIcon, HighlightWrapper } from './styles'

type TProps = {
  count: number
  size?: TSizeSM
} & TSpace

const CommentsCount: FC<TProps> = ({ count, size = SIZE.SMALL, ...restProps }) => {
  return (
    <Fragment>
      {count >= 100 ? (
        <HighlightWrapper size={size} {...restProps}>
          <CommentsIcon size={size} $highlight />
          {size === SIZE.MEDIUM && <Space right={2} />}
          <Count>{count}</Count>
        </HighlightWrapper>
      ) : (
        <Wrapper size={size} {...restProps}>
          <CommentsIcon size={size} />
          {size === SIZE.MEDIUM && <Space right={2} />}
          <Count>{count}</Count>
        </Wrapper>
      )}
    </Fragment>
  )
}

export default memo(CommentsCount)
