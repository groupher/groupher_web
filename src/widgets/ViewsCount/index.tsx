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
          {count}
        </HighlightWrapper>
      ) : (
        <Wrapper>
          <ViewsIcon />
          {count}
        </Wrapper>
      )}
    </div>
  )
}

export default memo(ViewsCount)
