/**
 * Provides the pure state transition kernel for generated-image batch claims.
 *
 * Assets Hub adapter
 *   -> GeneratedImageBatchState
 *   -> manifest validation and claim result
 *   -> Durable Object persistence
 */
import { createHash } from 'node:crypto'

import type {
  TGeneratedImageBatchClaim,
  TGeneratedImageManifestEntry,
  TGeneratedImageUploadBatch,
  TGeneratedImageUploadBatchTarget,
} from '@groupher/contracts/wallpaper'
import { canonicalGeneratedImageManifestV1 } from '@groupher/contracts/wallpaper'

export type TGeneratedImageBatchClaimResult = {
  claim: TGeneratedImageBatchClaim
  manifest: TGeneratedImageManifestEntry[]
  manifestDigest: string
}

const reconciliationRetryMs = 5 * 60 * 1000
const reconciliationMaxRetryMs = 24 * 60 * 60 * 1000
const reconciliationBackoffAttempts = 6

/** Returns the bounded delay used while Phoenix publication status is unavailable. */
export const generatedBatchReconciliationBackoffMs = (attempts: number): number =>
  Math.min(
    reconciliationRetryMs *
      2 ** Math.min(Math.max(Math.trunc(attempts), 1) - 1, reconciliationBackoffAttempts),
    reconciliationMaxRetryMs,
  )

export type TGeneratedBatchCleanupDecision = 'delete' | 'retain' | 'retry'

/** Maps the final publication probe to a safe cleanup action. */
export const generatedBatchCleanupDecision = (
  published: boolean | null,
): TGeneratedBatchCleanupDecision => {
  if (published === true) return 'retain'
  if (published === false) return 'delete'
  return 'retry'
}

const digestManifest = (manifest: TGeneratedImageManifestEntry[]): string => {
  const canonical = canonicalGeneratedImageManifestV1(manifest)
  return `sha256:${createHash('sha256').update(canonical).digest('hex')}`
}

export const manifestDigest = digestManifest

const asManifestEntry = (
  target: TGeneratedImageUploadBatchTarget,
  entry: TGeneratedImageManifestEntry,
) => {
  if (
    entry.candidateOwnerRef !== target.candidateOwnerRef ||
    entry.variantKey !== target.variantKey ||
    entry.width !== target.width ||
    entry.height !== target.height ||
    entry.mimeType !== target.mimeType ||
    !entry.storageKey ||
    !entry.assetPublicRef ||
    !entry.checksum
  ) {
    throw new Error(`GENERATED_IMAGE_BATCH_MANIFEST_MISMATCH: ${target.variantKey}`)
  }
  return entry
}

/**
 * In-memory transition kernel for the persistent Assets Hub batch adapter.
 *
 * Methods are synchronous on purpose: an adapter must serialize each transition
 * under its database row lock and persist the resulting claim/manifest before
 * returning the same result to a retrying caller.
 */
export class GeneratedImageBatchState {
  private readonly entries = new Map<string, TGeneratedImageManifestEntry>()
  private claimState: TGeneratedImageBatchClaim | null

  constructor(
    readonly batch: TGeneratedImageUploadBatch,
    private readonly claimTtlMs: number,
  ) {
    this.claimState = batch.claim
    if (!Number.isInteger(claimTtlMs) || claimTtlMs <= 0) {
      throw new Error('GENERATED_IMAGE_BATCH_INVALID_CLAIM_TTL')
    }
  }

  registerAsset(entry: TGeneratedImageManifestEntry): void {
    this.assertOpen()
    const target = this.batch.expectedVariants.find((item) => item.variantKey === entry.variantKey)
    if (!target) throw new Error(`GENERATED_IMAGE_BATCH_UNEXPECTED_VARIANT: ${entry.variantKey}`)
    this.entries.set(entry.variantKey, asManifestEntry(target, entry))
  }

  claimForPublish(key: string, now = Date.now()): TGeneratedImageBatchClaimResult {
    if (!key.trim()) throw new Error('GENERATED_IMAGE_BATCH_CLAIM_KEY_REQUIRED')
    if (this.claimState) {
      if (this.claimState.type === 'publish' && this.claimState.key === key) {
        if (Date.parse(this.claimState.expiresAt) <= now) {
          throw new Error('GENERATED_IMAGE_BATCH_CLAIM_EXPIRED')
        }
        return this.claimResult(this.claimState)
      }
      throw new Error('GENERATED_IMAGE_BATCH_ALREADY_CLAIMED')
    }
    if (Date.parse(this.batch.expiresAt) <= now) {
      throw new Error('GENERATED_IMAGE_BATCH_EXPIRED')
    }
    if (this.entries.size !== this.batch.expectedVariants.length) {
      this.claimForDelete(`invalid-manifest:${key}`, now)
      throw new Error('GENERATED_IMAGE_BATCH_INCOMPLETE_MANIFEST')
    }

    const claim = this.createClaim('publish', key, now)
    this.claimState = claim
    return this.claimResult(claim)
  }

  claimForDelete(key: string, now = Date.now()): TGeneratedImageBatchClaimResult {
    if (!key.trim()) throw new Error('GENERATED_IMAGE_BATCH_CLAIM_KEY_REQUIRED')
    if (this.claimState) {
      if (this.claimState.type === 'delete' && this.claimState.key === key) {
        if (Date.parse(this.claimState.expiresAt) <= now) {
          throw new Error('GENERATED_IMAGE_BATCH_CLAIM_EXPIRED')
        }
        return this.claimResult(this.claimState)
      }
      throw new Error('GENERATED_IMAGE_BATCH_ALREADY_CLAIMED')
    }

    const claim = this.createClaim('delete', key, now)
    this.claimState = claim
    return this.claimResult(claim)
  }

  private assertOpen(): void {
    if (this.claimState) throw new Error('GENERATED_IMAGE_BATCH_MANIFEST_FROZEN')
  }

  private createClaim(
    type: 'publish' | 'delete',
    key: string,
    now: number,
  ): TGeneratedImageBatchClaim {
    const claimedAt = new Date(now).toISOString()
    return {
      claimedAt,
      expiresAt: new Date(now + this.claimTtlMs).toISOString(),
      key,
      type,
    }
  }

  private claimResult(claim: TGeneratedImageBatchClaim): TGeneratedImageBatchClaimResult {
    const manifest = this.batch.expectedVariants.flatMap((target) => {
      const entry = this.entries.get(target.variantKey)
      return entry ? [entry] : []
    })
    return { claim, manifest, manifestDigest: digestManifest(manifest) }
  }
}
