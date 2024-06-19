/*
 * ArticleReadLabel
 */

import type { FC } from 'react'
import dynamic from 'next/dynamic'

import type { TSpace } from '@/spec'
import useAccount from '@/hooks/useAccount'

export const RealLabel = dynamic(() => import('./RealLabel'), {
  ssr: false,
})

// const ReadedLabel = lazy(() => import('./RealLabel'))

export type TProps = {
  viewed?: boolean
  size?: number
} & TSpace

const ArticleReadLabel: FC<TProps> = (props) => {
  const { isLogin } = useAccount()

  return <RealLabel isLogin={isLogin} {...props} />
}

export default ArticleReadLabel
