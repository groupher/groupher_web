import type { PropsWithChildren } from 'react'

import { toEffectivePagiConfig } from '~/lib/pagination/params'
import useDsbConfig from '~/stores/dsbConfig/hooks'

import CursorPagedPostsProvider from './cursor'
import OffsetPagedPostsProvider from './offset'

/** Selects one pagination surface before its child registers any query hooks. */
export default function PagedPostsProvider({ children }: PropsWithChildren) {
  const dashboard = useDsbConfig()
  const config = toEffectivePagiConfig(dashboard.pagination, 'posts')

  if (config.api === 'cursor') {
    return <CursorPagedPostsProvider config={config}>{children}</CursorPagedPostsProvider>
  }

  return <OffsetPagedPostsProvider config={config}>{children}</OffsetPagedPostsProvider>
}
