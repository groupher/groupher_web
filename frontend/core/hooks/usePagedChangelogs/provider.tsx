import type { PropsWithChildren } from 'react'

import { toEffectivePagiConfig } from '~/lib/pagination/params'
import useDsbConfig from '~/stores/dsbConfig/hooks'

import CursorPagedChangelogsProvider from './cursor'
import OffsetPagedChangelogsProvider from './offset'

/** Selects one pagination surface before its child registers any query hooks. */
export default function PagedChangelogsProvider({ children }: PropsWithChildren) {
  const dashboard = useDsbConfig()
  const config = toEffectivePagiConfig(dashboard.pagination, 'changelogs')

  if (config.api === 'cursor') {
    return <CursorPagedChangelogsProvider config={config}>{children}</CursorPagedChangelogsProvider>
  }

  return <OffsetPagedChangelogsProvider config={config}>{children}</OffsetPagedChangelogsProvider>
}
