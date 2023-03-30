import { FC, memo, Fragment } from 'react'
import TimeAgo from 'timeago-react'

import type { TPost } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
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
  const { author, meta, insertedAt } = article
  return (
    <Wrapper>
      {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} smaller={false} />}
      {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} smaller={false} />}
      {article.id === '227' && (
        <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" smaller={false} />
      )}
      {article.id === '228' && (
        <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" smaller={false} />
      )}
      {article.id === '226' && (
        <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVED" smaller={false} />
      )}
      {article.id === '225' && (
        <ArticleCatState
          cat={ARTICLE_CAT.FEATURE}
          state={ARTICLE_STATE.REJECT_DUP}
          smaller={false}
        />
      )}

      <DotDivider space={10} />

      <AuthorWrapper>
        {/* <Avatar src={author.avatar} /> */}
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
