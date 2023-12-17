/*
 *
 * ArticleActionsPanel
 *
 */

import React from 'react'
import T from 'prop-types'
import { values } from 'ramda'

import { THREAD } from '@/constant/thread'
import { buildLog } from '@/logger'

import PinOption from './PinOption'
import RefineOption from './RefineOption'
import EditOption from './EditOption'
import DeleteOption from './DeleteOption'

import { Wrapper } from './styles'

const log = buildLog('w:ArticleActionsPanel:index')

const ArticleActionsPanel = ({
  data,
  communitySlug,
  thread,
  onUndoPin,
  onPin,
  onSetRefined,
  onUnsetRefined,
  onEdit,
  onDelete,
}) => {
  return (
    <Wrapper>
      <PinOption
        passport={`${communitySlug}->${thread}.pin`}
        data={data}
        thread={thread}
        onPin={onPin}
        onUndoPin={onUndoPin}
      />
      <RefineOption
        passport={`${communitySlug}->${thread}.refinedtag.set`}
        data={data}
        thread={thread}
        onSetRefined={onSetRefined}
        onUnsetRefined={onUnsetRefined}
      />

      <EditOption passport="owner" ownerId={data.author?.id} onEdit={onEdit} thread={thread} />

      <DeleteOption passport="owner" ownerId={data.author?.id} onDelete={onDelete} />
    </Wrapper>
  )
}

ArticleActionsPanel.propTypes = {
  data: T.shape({
    id: T.string,
    pin: T.bool,
    author: T.shape({
      id: T.string,
    }),
    tags: T.arrayOf(
      T.shape({
        id: T.string,
        title: T.string,
        color: T.string,
        slug: T.string,
      }),
    ),
  }).isRequired,
  communitySlug: T.string.isRequired,
  thread: T.oneOf(values(THREAD)),
  onDelete: T.func,
  onEdit: T.func,
  onPin: T.func,
  onUndoPin: T.func,
  onSetRefined: T.func,
  onUnsetRefined: T.func,
}

ArticleActionsPanel.defaultProps = {
  thread: THREAD.POST,
  onDelete: log,
  onEdit: log,
  onPin: log,
  onUndoPin: log,
  onSetRefined: log,
  onUnsetRefined: log,
}

export default React.memo(ArticleActionsPanel)
