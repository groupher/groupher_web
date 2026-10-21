type TPaginationEvent = {
  surface: 'posts' | 'changelogs'
  event: 'duplicate_entries' | 'ssr_failure' | 'bootstrap_recovery'
  count?: number
  attempt?: number
}

/** Emits bounded pagination diagnostics; never includes cursors, paths, or filter values. */
export const recordPaginationEvent = (detail: TPaginationEvent): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('groupher:pagi', { detail }))
  } else {
    console.warn('[pagi]', detail)
  }
}
