import { FC } from 'react'

import { Space, SpaceGrow } from '@/widgets/Common'

import PostItem from './PostItem'
import CommentItem from './CommentItem'

import {
  Wrapper,
  ListsWrapper,
  DetailWrapper,
  Status,
  UpvoteWrapper,
  ViewIcon,
  UpvoteIcon,
  CommentIcon,
  Count,
  Bar,
  CommentsHeader,
} from '../../../styles/feature_wall/discuss_feat/discuss_demo'

const DiscussDemo: FC = () => {
  return (
    <Wrapper>
      <ListsWrapper>
        <PostItem count={101} opacity={0.8} width={80} />
        <PostItem opacity={0.7} count={86} width={110} />
        <PostItem opacity={0.6} count={74} width={70} />
        <PostItem opacity={0.5} count={65} width={90} />
        <PostItem opacity={0.4} count={44} width={60} />
        <PostItem opacity={0.25} count={13} width={88} />
      </ListsWrapper>
      <DetailWrapper>
        <Bar top={6} height={3} width={50} opacity={0.3} />
        <Bar top={8} height={12} width={140} bottom={1} opacity={0.7} />
        <Status>
          <UpvoteWrapper>
            <UpvoteIcon />
            赞同
            <Count>86</Count>
          </UpvoteWrapper>

          <SpaceGrow />
          <ViewIcon />
          <Count>120</Count>
          <Space right={8} />
          <CommentIcon />
          <Count>18</Count>
        </Status>
        <Bar top={5} height={6} width={238} bottom={12} opacity={0.3} />
        <Bar top={5} height={6} width={160} bottom={26} opacity={0.3} />
        <Bar top={5} height={6} width={180} bottom={12} opacity={0.3} />
        <Bar top={5} height={6} width={80} bottom={12} opacity={0.3} />

        <CommentsHeader>
          评论 <Count>18</Count>
          <SpaceGrow />
          <Bar top={5} height={3} width={26} opacity={0.2} right={-3} />
        </CommentsHeader>
        <CommentItem />
        <CommentItem index={1} />
        <CommentItem index={2} />
      </DetailWrapper>
    </Wrapper>
  )
}

export default DiscussDemo
