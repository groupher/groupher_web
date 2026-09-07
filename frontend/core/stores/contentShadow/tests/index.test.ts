import createStore from '..'
import { hasContentShadowPatch } from '../helper'

describe('content shadow store', () => {
  it('keeps the Dashboard draft separate from its confirmed baseline', () => {
    const store = createStore(false)

    store.commit(true)

    expect(store.enabled).toBe(true)
    expect(hasContentShadowPatch(store)).toBe(true)

    store.acceptSubmitted(true)

    expect(hasContentShadowPatch(store)).toBe(false)
  })

  it('refreshes the confirmed baseline without overwriting a newer local draft', () => {
    const store = createStore(false)

    store.commit(true)
    store.reconcileConfirmed(false)

    expect(store.enabled).toBe(true)
    expect(store.original).toBe(false)
    expect(hasContentShadowPatch(store)).toBe(true)
  })
})
