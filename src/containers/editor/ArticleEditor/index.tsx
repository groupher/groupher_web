/*
 * ArticleEditor
 */

import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import type { TMetric } from '@/spec'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import type { TStore } from './store'

const RealArticleEditor = dynamic(() => import('./RealArticleEditor'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export type TProps = {
  testid?: string
  articleEditor?: TStore
  metric?: TMetric
}

const ArticleEditor: FC<TProps> = (props) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [])

  return <>{load && <RealArticleEditor {...props} />}</>
}

export default ArticleEditor
