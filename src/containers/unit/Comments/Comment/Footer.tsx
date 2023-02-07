import { FC, memo } from 'react'

import useAccount from '@/hooks/useAccount'

import type { TComment } from '@/spec'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import { authWarn } from '@/utils/signal'

import DotDivider from '@/widgets/DotDivider'
import { Space, SpaceGrow } from '@/widgets/Common'
import EmotionSelector from '@/widgets/EmotionSelector'
import Upvote from '@/widgets/Upvote'

import Actions from './Actions'

import type { TAPIMode } from '../spec'
import { API_MODE } from '../constant'
import { Wrapper } from '../styles/comment/footer'
import { handleUpvote, handleEmotion } from '../logic'

type TProps = {
  data: TComment
  apiMode: TAPIMode
}

const Footer: FC<TProps> = ({ data, apiMode }) => {
  const accountInfo = useAccount()
  // const { isLegal } = data.meta
  const { meta, upvotesCount, viewerHasUpvoted } = data
  const { isArticleAuthorUpvoted, isLegal, illegalReason, illegalWords } = meta

  return (
    <Wrapper>
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
      {apiMode === API_MODE.ARTICLE && isLegal && <DotDivider radius={3} space={10} />}
      {apiMode === API_MODE.ARTICLE && <Actions data={data} />}
      <SpaceGrow />
    </Wrapper>
  )
}

export default memo(Footer)
