import { lazy, Suspense, useMemo } from 'react'

import useArticle from '~/stores/article/hooks'

import { parseDocValue } from './helper'
import useSalon from './salon/body'

const RichEditorStatic = lazy(() => import('~/unit/RichEditor/Static'))

export default function Body() {
  const { doc } = useArticle()
  const s = useSalon()

  const value = useMemo(() => {
    const fallback = doc?.document?.markdown || doc?.body || doc?.digest || ''
    return parseDocValue(doc?.document?.json, fallback)
  }, [doc])

  if (!doc) return null

  return (
    <div className={s.wrapper}>
      <Suspense fallback={null}>
        <RichEditorStatic value={value} />
      </Suspense>
    </div>
  )
}
