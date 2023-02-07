import { FC } from 'react'

import {
  Wrapper,
  UpvotesWrapper,
  RightPart,
  Bar,
  Footer,
  UpvoteIcon,
  Count,
} from '../../../styles/feature_wall/discuss_feat/discuss_demo/post_item'

type TProps = {
  opacity?: number
  count?: number
  width?: number
}

const PostItem: FC<TProps> = ({ opacity = 1, count = 9, width = 80 }) => {
  return (
    <Wrapper opacity={opacity}>
      <UpvotesWrapper>
        <UpvoteIcon />
        <Count>{count}</Count>
      </UpvotesWrapper>

      <RightPart>
        <Bar top={5} height={6} width={width} bottom={1} />
        <Bar top={5} height={3} width={width + 20} bottom={10} opacity={0.4} />

        <Footer>
          <Bar height={3} width={16} top={3} opacity={0.4} />
        </Footer>
      </RightPart>
    </Wrapper>
  )
}

export default PostItem
