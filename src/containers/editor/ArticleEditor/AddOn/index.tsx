import { FC, memo } from 'react'

import type { TArticleThread } from '@/spec'

import type { TEditData } from '../spec'

import PostAddOn from './PostAddOn'

type TProps = {
  thread: TArticleThread
  editData: TEditData
}

const Addon: FC<TProps> = ({ thread, editData }) => {
  return <PostAddOn editData={editData} />
}

export default memo(Addon)
