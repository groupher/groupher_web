import { useState, useMemo, useCallback } from 'react'

import { toPagiGraphQLInput } from '~/lib/pagination/params'
import type { TPagiRequest } from '~/spec'

/** Owns a collection's position; changing its scope discards the previous continuation. */
export default function usePagiPosition(scope: string, size = 20) {
  const initial = useMemo<TPagiRequest>(() => ({ api: 'offset', page: 1, size }), [size])
  const [state, setState] = useState<{ scope: string; request: TPagiRequest }>({
    scope,
    request: initial,
  })
  const request = state.scope === scope ? state.request : initial
  const setRequest = useCallback(
    (next: TPagiRequest) => setState({ scope, request: next }),
    [scope],
  )
  return {
    request,
    input: useMemo(() => toPagiGraphQLInput(request), [request]),
    setRequest,
    setPage: (page: number) => setRequest({ api: 'offset', page, size }),
    continueAfter: (after: string) => setRequest({ api: 'cursor', first: size, after }),
    reset: () => setRequest(initial),
  }
}
