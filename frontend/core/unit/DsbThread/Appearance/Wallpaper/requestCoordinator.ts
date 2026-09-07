export type TPendingWallpaperSave = {
  fingerprint: string
  idempotencyKey: string
}

type TResolveWallpaperIdempotencyKeyInput = {
  fingerprint: string
  pending: TPendingWallpaperSave | null
  createKey?: () => string
}

const createIdempotencyKey = (): string =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

/** Reuses a key only when the pending request represents the same fingerprint. */
export const resolveWallpaperIdempotencyKey = ({
  fingerprint,
  pending,
  createKey = createIdempotencyKey,
}: TResolveWallpaperIdempotencyKeyInput): TPendingWallpaperSave => ({
  fingerprint,
  idempotencyKey: pending?.fingerprint === fingerprint ? pending.idempotencyKey : createKey(),
})
