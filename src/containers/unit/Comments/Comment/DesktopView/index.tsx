import { FC, memo, Fragment } from 'react'
import { includes } from 'ramda'

import type { TID, TAccount, TComment, TAvatarLayout } from '@/spec'
import type { TAPIMode } from '../../spec'

import DefaultLayout from './DefaultLayout'
import FoldLayout from './FoldLayout'

type TProps = {
  data: TComment
  accountInfo: TAccount
  apiMode: TAPIMode
  hasReplies?: boolean
  foldedIds: TID[]
  showInnerRef?: boolean
  avatarLayout: TAvatarLayout
}

const Comment: FC<TProps> = (props) => {
  const { foldedIds, data } = props
  const isFolded = includes(data.id, foldedIds)

  return <Fragment>{isFolded ? <FoldLayout {...props} /> : <DefaultLayout {...props} />}</Fragment>
}

export default memo(Comment)
