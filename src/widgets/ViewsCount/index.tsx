import { type FC, memo } from 'react'

import { Wrapper, ViewsIcon, Count, HighlightWrapper } from './styles'

type TProps = {
  count: number
}

const ViewsCount: FC<TProps> = ({ count }) => {
  return (
    <div>
      {count >= 400 ? (
        <HighlightWrapper>
          <ViewsIcon $highlight />
          <Count>{count}</Count>
        </HighlightWrapper>
      ) : (
        <Wrapper>
          <ViewsIcon />
          <Count>{count}</Count>
        </Wrapper>
      )}
    </div>
  )
}

export default memo(ViewsCount)
