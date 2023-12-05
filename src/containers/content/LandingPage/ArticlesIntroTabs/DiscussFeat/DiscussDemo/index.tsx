import { FC } from 'react'

import { mockUsers } from '@/mock'
import { ARTICLE_CAT } from '@/constant/gtd'
import { COLOR_NAME } from '@/constant/colors'

import { SpaceGrow } from '@/widgets/Common'
import ArticleCatState from '@/widgets/ArticleCatState'
import TagNode from '@/widgets/TagNode'

import PostItem from './PostItem'
import CommentItem from './CommentItem'

import {
  Wrapper,
  Title,
  ListsWrapper,
  DetailWrapper,
  Status,
  UpvoteWrapper,
  UpvoteIcon,
  CommentIcon,
  UpvoteCount,
  Tag,
  Header,
  Count,
  Bar,
  CommentsHeader,
} from '../../../styles/articles_intro_tabs/discuss_feat/discuss_demo'

const DiscussDemo: FC = () => {
  const users = mockUsers(5)

  return (
    <Wrapper>
      <ListsWrapper>
        <PostItem
          count={101}
          opacity={0.85}
          width={80}
          title="蹲一个暗黑模式"
          cat={ARTICLE_CAT.FEATURE}
        />
        <PostItem
          opacity={0.75}
          count={65}
          width={90}
          title="手机上点击标题没反应"
          cat={ARTICLE_CAT.BUG}
        />
        <PostItem opacity={0.65} count={44} width={60} title="希望更新日志支持视频内容" />
        <PostItem
          opacity={0.5}
          count={86}
          width={110}
          title="管理员可以删除评论吗"
          cat={ARTICLE_CAT.QUESTION}
        />
        <PostItem
          opacity={0.38}
          count={74}
          width={70}
          title="是否支持私有部署"
          cat={ARTICLE_CAT.QUESTION}
        />
        <PostItem
          opacity={0.25}
          count={13}
          width={88}
          title="安卓版本在哪里下载"
          cat={ARTICLE_CAT.QUESTION}
        />
      </ListsWrapper>

      <DetailWrapper>
        <Header>
          <ArticleCatState cat={ARTICLE_CAT.FEATURE} right={10} top={-1} left={-1} />
          <TagNode
            color={COLOR_NAME.PURPLE}
            hashSize={11}
            hashRight={3}
            hashTop={-1}
            opacity={0.7}
            boldHash
          />
          <Tag>UI / UX</Tag>
        </Header>
        <Title>蹲一个暗黑模式</Title>
        <Status>
          <UpvoteWrapper>
            <UpvoteIcon />
            <UpvoteCount>101</UpvoteCount>
          </UpvoteWrapper>

          <SpaceGrow />
          <CommentIcon />
          <Count>18</Count>
        </Status>
        <Bar top={5} height={6} width={238} bottom={12} opacity={0.2} />
        <Bar top={5} height={6} width={160} bottom={26} opacity={0.2} />
        <Bar top={5} height={6} width={180} bottom={12} opacity={0.2} />
        <Bar top={5} height={6} width={80} bottom={12} opacity={0.2} />

        <CommentsHeader>
          评论 <Count>18</Count>
          <SpaceGrow />
          <Bar top={5} height={3} width={26} opacity={0.2} right={-3} />
        </CommentsHeader>
        <CommentItem index={0} user={users[0]} nickname="托雷斯" opacity={0.9} />
        <CommentItem index={1} user={users[1]} nickname="伊涅斯塔" opacity={0.68} />
        <CommentItem index={2} user={users[2]} nickname="张志磊" opacity={0.42} />
        <CommentItem index={3} user={users[4]} nickname="丁主任" opacity={0.25} />
      </DetailWrapper>
    </Wrapper>
  )
}

export default DiscussDemo
