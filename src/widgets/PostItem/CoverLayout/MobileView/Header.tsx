import { type FC, memo } from 'react'
import TimeAgo from 'timeago-react'

import type { TPost } from '@/spec'

import TagsList from '@/widgets/TagsList'
import DotDivider from '@/widgets/DotDivider'

import {
  Wrapper,
  AuthorInfo,
  TimeStamp,
  TagListWrapper,
} from '../../styles/cover_layout/mobile_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <AuthorInfo>
        <div>{article?.author.nickname}</div>
        <DotDivider radius={2} space={8} />

        <TimeStamp>
          <TimeAgo datetime={article.insertedAt} locale="zh_CN" />
        </TimeStamp>
      </AuthorInfo>
      <TagListWrapper>
        <TagsList items={article.articleTags} />
      </TagListWrapper>
    </Wrapper>
  )
}

export default memo(Header)
