'use client'

/* *
 * ChangelogThread
 *
 */

import PagedChangelogsProvider from '~/hooks/usePagedChangelogs/provider'

import ChangelogSurface from './Surface'

export default function ChangelogThread() {
  return (
    <PagedChangelogsProvider>
      <ChangelogSurface />
    </PagedChangelogsProvider>
  )
}
