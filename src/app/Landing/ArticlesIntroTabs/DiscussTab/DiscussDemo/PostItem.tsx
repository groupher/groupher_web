import { FC } from 'react'

import ArticleCatState from '@/widgets/ArticleCatState'

import type { TArticleCat } from '@/spec'

import {
  Wrapper,
  UpvotesWrapper,
  RightPart,
  Title,
  Footer,
  UpvoteIcon,
  Count,
} from '../../../styles/articles_intro_tabs/discuss_tab/discuss_demo/post_item'

type TProps = {
  title?: string
  opacity?: number
  count?: number
  width?: number
  cat?: TArticleCat
}

const PostItem: FC<TProps> = ({
  title = '',
  cat = 'FEATURE',
  opacity = 1,
  count = 9,
  width = 80,
}) => {
  return (
    <Wrapper opacity={opacity}>
      <UpvotesWrapper>
        <UpvoteIcon />
        <Count>{count}</Count>
      </UpvotesWrapper>

      <RightPart>
        <Title>{title}</Title>
        <Footer>
          <ArticleCatState cat={cat} noBorder />
        </Footer>
      </RightPart>
    </Wrapper>
  )
}

export default PostItem
