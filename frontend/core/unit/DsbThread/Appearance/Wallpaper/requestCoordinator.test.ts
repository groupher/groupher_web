import { resolveWallpaperIdempotencyKey } from './requestCoordinator'

describe('resolveWallpaperIdempotencyKey', () => {
  it('reuses the pending key for the same fingerprint', () => {
    const pending = { fingerprint: 'same', idempotencyKey: 'old-key' }

    expect(
      resolveWallpaperIdempotencyKey({
        createKey: () => 'new-key',
        fingerprint: 'same',
        pending,
      }),
    ).toEqual(pending)
  })

  it('creates a new key when the fingerprint changes', () => {
    expect(
      resolveWallpaperIdempotencyKey({
        createKey: () => 'new-key',
        fingerprint: 'next',
        pending: { fingerprint: 'previous', idempotencyKey: 'old-key' },
      }),
    ).toEqual({ fingerprint: 'next', idempotencyKey: 'new-key' })
  })

  it('creates a key when no request is pending', () => {
    expect(
      resolveWallpaperIdempotencyKey({
        createKey: () => 'first-key',
        fingerprint: 'first',
        pending: null,
      }),
    ).toEqual({ fingerprint: 'first', idempotencyKey: 'first-key' })
  })
})
