import { FC, Fragment, memo } from 'react'
import { includes } from 'ramda'

import type { TComment, TID, TAvatarLayout } from '@/spec'

import type { TMode, TRepliesState, TAPIMode } from '../spec'

import Comment from '../Comment'
import RepliesList from './RepliesList'
import DateDivider from './DateDivider'

import { MODE } from '../constant'
import { passedDate } from '../helper'
import { Wrapper, IndentLine } from '../styles/list/list'
import { foldComment } from '../logic'

type TProps = {
  mode: TMode
  repliesState: TRepliesState
  apiMode: TAPIMode
  entries: TComment[]
  foldedIds: TID[]
  avatarLayout: TAvatarLayout
}

const List: FC<TProps> = ({ mode, repliesState, apiMode, entries, foldedIds, avatarLayout }) => {
  return (
    <Fragment>
      {entries.map((comment, index) => (
        <Wrapper key={comment.id}>
          <Comment
            data={comment}
            apiMode={apiMode}
            hasReplies={comment.repliesCount > 0}
            foldedIds={foldedIds}
            avatarLayout={avatarLayout}
          />
          {mode === MODE.TIMELINE && (
            <DateDivider text={passedDate(entries[index], entries[index + 1])} />
          )}
          {mode === MODE.REPLIES &&
            comment.replies?.length > 0 &&
            !includes(comment.id, foldedIds) && (
              <RepliesList
                parentId={comment.id}
                apiMode={apiMode}
                entries={comment.replies}
                repliesCount={comment.repliesCount}
                repliesState={repliesState}
                foldedIds={foldedIds}
                avatarLayout={avatarLayout}
              />
            )}
          <IndentLine
            hasReplies={comment.repliesCount > 0}
            onClick={() => foldComment(comment.id)}
            isFold={includes(comment.id, foldedIds)}
          />
        </Wrapper>
      ))}
    </Fragment>
  )
}

export default memo(List)
