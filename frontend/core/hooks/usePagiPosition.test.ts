import { act, renderHook } from '@testing-library/react'

import usePagiPosition from './usePagiPosition'

it('resets a continuation synchronously when the resource or filters change', () => {
  const { result, rerender } = renderHook(({ scope }) => usePagiPosition(scope, 10), {
    initialProps: { scope: 'xx:asset-a' },
  })
  act(() => result.current.continueAfter('signed'))
  expect(result.current.input).toEqual({ cursor: { first: 10, after: 'signed' } })
  rerender({ scope: 'xx:asset-b' })
  expect(result.current.input).toEqual({ offset: { page: 1, size: 10 } })
  act(() => result.current.setPage(3))
  expect(result.current.input).toEqual({ offset: { page: 3, size: 10 } })
})
