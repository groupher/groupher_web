import type { FC } from 'react'
import TimeAgo from 'timeago-react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TComment } from '~/spec'
import useLayout from '~/hooks/useLayout'

import ImgFallback from '~/widgets/ImgFallback'
import { Space } from '~/widgets/Common'
import DotDivider from '~/widgets/DotDivider'

import {
  Wrapper,
  CurveLine,
  FloorNum,
  CreateDate,
  Avatar,
  HeaderBaseInfo,
  BaseInfo,
  Nickname,
  UserBase,
  AuthorTag,
  RefToOther,
  RefLabel,
  RefUser,
  ShortIntro,
} from '../../styles/comment/header/article'

type TProps = {
  data: TComment
  showInnerRef: boolean
  isReply: boolean
}

const CommentHeader: FC<TProps> = ({ data, showInnerRef, isReply }) => {
  const { isMobile } = useMobileDetect()
  const { avatarLayout } = useLayout()

  const { author, meta } = data
  const avatarSize = author.bio ? 26 : 24

  return (
    <Wrapper>
      {isReply && <CurveLine />}
      <Avatar
        src={data.author.avatar}
        avatarSize={avatarSize}
        $avatarLayout={avatarLayout}
        fallback={<ImgFallback user={data.author} size={avatarSize} right={10} />}
      />
      <HeaderBaseInfo>
        <BaseInfo>
          <UserBase>
            <Nickname>{author.nickname}</Nickname>
            {data.isArticleAuthor && <AuthorTag>发帖</AuthorTag>}
            {showInnerRef && meta.isReplyToOthers && (
              <RefToOther>
                <RefLabel>回复</RefLabel>
                <RefUser>{data.replyTo?.author?.nickname}</RefUser>
              </RefToOther>
            )}
            <CreateDate>
              <DotDivider space={isMobile ? 4 : 8} />
              <TimeAgo datetime={data.insertedAt} locale="zh_CN" />
            </CreateDate>
          </UserBase>
          <FloorNum>
            #<Space right={2} />
            {data.floor}
          </FloorNum>
          <Space right={10} />
        </BaseInfo>

        {author.bio && <ShortIntro>{author.bio}</ShortIntro>}
      </HeaderBaseInfo>
    </Wrapper>
  )
}

export default CommentHeader
