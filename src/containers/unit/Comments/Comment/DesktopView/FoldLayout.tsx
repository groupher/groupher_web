import type { FC } from 'react'
import TimeAgo from 'timeago-react'

import type { TComment } from '~/spec'
import useLayout from '~/hooks/useLayout'
import { ICON } from '~/config'

import ImgFallback from '~/widgets/ImgFallback'

import IllegalBar from './IllegalBar'

import {
  Wrapper,
  CurveLine,
  Avatar,
  CommentBody,
  RepliesHint,
  SolutionIcon,
  CreateDate,
  ExpandIcon,
} from '../../styles/comment/desktop_view/fold_layout'
import { expandComment } from '../../logic'

type TProps = {
  data: TComment
  isReply?: boolean
}

const FoldLayout: FC<TProps> = ({ data, isReply = false }) => {
  const { avatarLayout } = useLayout()

  const isSolution = false //
  const { meta } = data
  const { isLegal, illegalReason, illegalWords } = meta

  return (
    <Wrapper onClick={() => expandComment(data.id)}>
      {isReply && <CurveLine />}
      <ExpandIcon />
      <Avatar
        src={data.author.avatar}
        $avatarLayout={avatarLayout}
        fallback={<ImgFallback user={data.author} size={16} />}
      />
      {isLegal ? (
        <CommentBody
          dangerouslySetInnerHTML={{
            __html: data.bodyHtml,
          }}
        />
      ) : (
        <IllegalBar illegalReason={illegalReason} illegalWords={illegalWords} isFold />
      )}

      {data.repliesCount > 0 && <RepliesHint>[ {data.repliesCount} 条回复 ]</RepliesHint>}

      {isSolution && (
        <SolutionIcon
          isAuthorUpvoted={data.meta.isArticleAuthorUpvoted}
          src={`${ICON}/shape/solution-check.svg`}
        />
      )}
      <CreateDate>
        <TimeAgo datetime={data.insertedAt} locale="zh_CN" />
      </CreateDate>
    </Wrapper>
  )
}

export default FoldLayout
