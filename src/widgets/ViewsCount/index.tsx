import { FC, memo } from 'react'

import { Wrapper, ViewsIcon, HighlightWrapper } from './styles'

type TProps = {
  count: number
}

const ViewsCount: FC<TProps> = ({ count }) => {
  return (
    <div>
      {count >= 400 ? (
        <HighlightWrapper>
          <ViewsIcon highlight />
          <div>{count}</div>
        </HighlightWrapper>
      ) : (
        <Wrapper>
          <ViewsIcon />
          <div>{count}</div>
        </Wrapper>
      )}
    </div>
  )
}

export default memo(ViewsCount)
