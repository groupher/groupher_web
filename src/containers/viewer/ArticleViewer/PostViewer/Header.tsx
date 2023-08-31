import { FC, memo, Fragment } from 'react'
import TimeAgo from 'timeago-react'

import type { TPost } from '@/spec'

import DotDivider from '@/widgets/DotDivider'
import ArticleCatState from '@/widgets/ArticleCatState'

import {
  Wrapper,
  AuthorWrapper,
  // Avatar,
  AuthorName,
  PublishWrapper,
  PubDate,
  EditedHint,
} from '../styles/post_viewer/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { author, meta, insertedAt, cat, state } = article

  return (
    <Wrapper>
      <ArticleCatState cat={cat} state={state} smaller={false} />

      <DotDivider space={10} />

      <AuthorWrapper>
        <AuthorName>{author.nickname}</AuthorName>
      </AuthorWrapper>
      <DotDivider space={10} />
      <PublishWrapper>
        <PubDate>
          <TimeAgo datetime={insertedAt} locale="zh_CN" />
        </PubDate>
        {meta.isEdited && (
          <Fragment>
            <DotDivider space={8} />
            <EditedHint>修改过</EditedHint>
          </Fragment>
        )}
      </PublishWrapper>
    </Wrapper>
  )
}

export default memo(Header)
