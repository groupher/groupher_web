import { FC } from 'react'
import { observer } from 'mobx-react'
import useAccount from '@/hooks/useAccount'

import { ReadedLabel } from './styles'
import type { TProps } from '.'

const ReadLabel: FC<TProps> = ({ article, top, left }) => {
  const accountInfo = useAccount()

  if (!accountInfo.isLogin) return null

  const { markViewed } = accountInfo.customization
  const { viewerHasViewed } = article

  if (markViewed && viewerHasViewed) {
    return <ReadedLabel top={top} left={left} />
  }

  return null
}

export default observer(ReadLabel)
