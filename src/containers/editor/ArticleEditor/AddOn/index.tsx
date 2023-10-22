import { FC, memo } from 'react'

import type { TEditData } from '../spec'

import PostAddOn from './PostAddOn'

type TProps = {
  editData: TEditData
}

const Addon: FC<TProps> = ({ editData }) => {
  return <PostAddOn editData={editData} />
}

export default memo(Addon)
