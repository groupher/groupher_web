import { memo, useState } from 'react'

import useTrans from '~/hooks/useTrans'
import type { TComment, TID } from '~/spec'

import { useCommentFeed } from '../pagination/context'
import FeedProvider from '../pagination/FeedProvider'
import type { TAPIMode } from '../spec'
import ReplyEntries from './ReplyEntries'
import ReplyPage from './ReplyPage'
import useSalon from './salon/replies_list'
import TogglerButton from './TogglerButton'

type TProps = {
  parentId: TID
  apiMode: TAPIMode
  entries: readonly TComment[]
  repliesCount: number
  foldedIdSet: Set<TID>
}

/** Preview is replaced by page one on expansion; each root has its own query and controls. */
function RepliesList({ parentId, apiMode, entries, repliesCount, foldedIdSet }: TProps) {
  const s = useSalon()
  const { t } = useTrans()
  const parentFeed = useCommentFeed()
  const [expanded, setExpanded] = useState(false)
  const [page, setPage] = useState(1)
  return (
    <div className={s.wrapper}>
      <div className={s.countHint}>
        <div className={s.slashSign}>&#47;&#47;</div>
        <div className={s.countNum}>{repliesCount}</div> {t('comment.replies.count')}:
      </div>
      {expanded ? (
        <FeedProvider
          collection={{
            ...parentFeed.collection,
            rootInnerId: String(parentId),
            initialAfter: undefined,
          }}
          config={{ ...parentFeed.config, api: 'cursor', mode: 'load_more' }}
          page={page}
          setPage={setPage}
        >
          <ReplyPage apiMode={apiMode} foldedIdSet={foldedIdSet} />
        </FeedProvider>
      ) : (
        <ReplyEntries apiMode={apiMode} entries={entries} foldedIdSet={foldedIdSet} preview />
      )}
      <TogglerButton
        loading={false}
        text={expanded ? '收起回复' : `查看全部 ${repliesCount} 条回复`}
        onClick={() => {
          setPage(1)
          setExpanded(!expanded)
        }}
      />
    </div>
  )
}
export default memo(RepliesList)
