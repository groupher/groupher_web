import type { FC } from 'react'

import useAccount from '~/hooks/useAccount'

import type { TComment } from '~/spec'
import { UPVOTE_LAYOUT } from '~/const/layout'

import { authWarn } from '~/signal'

import DotDivider from '~/widgets/DotDivider'
import { DesktopOnly, Space, SpaceGrow } from '~/widgets/Common'
import EmotionSelector from '~/widgets/EmotionSelector'
import Upvote from '~/widgets/Upvote'

import Actions from './Actions'

import type { TAPIMode } from '../spec'
import { API_MODE } from '../constant'
import {
  Wrapper,
  MainWrapper,
  AnwserWrapper,
  CheckSVGIcon,
  AuthorUpvoteWrapper,
  UpvotedIcon,
  ExtraWrapper,
} from '../styles/comment/footer'
import { handleUpvote, handleEmotion } from '../logic'

type TProps = {
  data: TComment
  apiMode: TAPIMode
}

const Footer: FC<TProps> = ({ data, apiMode }) => {
  const accountInfo = useAccount()
  // const { isLegal } = data.meta
  const { meta, upvotesCount, viewerHasUpvoted } = data
  const { isArticleAuthorUpvoted, isLegal } = meta

  const isSolution = false
  const noExtraInfo = !isSolution && !isArticleAuthorUpvoted

  return (
    <Wrapper>
      {!noExtraInfo && (
        <ExtraWrapper>
          {isSolution && (
            <AnwserWrapper>
              <CheckSVGIcon />
              解决方案
            </AnwserWrapper>
          )}

          {isArticleAuthorUpvoted && (
            <AuthorUpvoteWrapper>
              <UpvotedIcon />
              作者点了赞
            </AuthorUpvoteWrapper>
          )}
          <SpaceGrow />
        </ExtraWrapper>
      )}

      <MainWrapper>
        <Upvote
          left={5}
          top={-1}
          type={UPVOTE_LAYOUT.COMMENT}
          count={upvotesCount}
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={(did) => handleUpvote(data, did)}
        />

        <Space right={10} />

        <EmotionSelector
          isLegal={isLegal}
          emotions={data.emotions}
          onAction={(name, hasEmotioned) => {
            if (!accountInfo) return authWarn()
            handleEmotion(data, name, hasEmotioned)
          }}
        />
        <DesktopOnly width="auto">
          {apiMode === API_MODE.ARTICLE && isLegal && <DotDivider radius={3} space={10} />}
        </DesktopOnly>
        {apiMode === API_MODE.ARTICLE && <Actions data={data} />}

        <SpaceGrow />
      </MainWrapper>
    </Wrapper>
  )
}

export default Footer
