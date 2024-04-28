/*
 * ArticleReadLabel
 */

import { FC, lazy, Suspense } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'

const ReadedLabel = lazy(() => import('./RealLabel'))

const _log = buildLog('w:ArticleReadLabel:index')

export type TProps = {
  viewed?: boolean
  size?: number
} & TSpace

const ArticleReadLabel: FC<TProps> = (props) => {
  const { isLogin } = useAccount()

  return (
    <Suspense fallback={null}>
      <ReadedLabel isLogin={isLogin} {...props} />
    </Suspense>
  )
}

export default observer(ArticleReadLabel)
