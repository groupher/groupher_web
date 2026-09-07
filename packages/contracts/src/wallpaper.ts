/** Neutral contracts shared by Wallpaper's browser exporter and Assets Hub. */

export type TWallpaperProfile = 'wide' | 'desktop' | 'tablet' | 'phone'
export type TWallpaperTheme = 'light' | 'dark'

export type TImageExportTarget = {
  key: string
  logicalWidth: number
  logicalHeight: number
  width: number
  height: number
  format: 'webp' | 'png' | 'jpeg'
  quality?: number
}

export type TExportedImageVariant = {
  targetKey: string
  width: number
  height: number
  mimeType: string
  blob: Blob
  checksum: string
}

export type TImageExportProgress = {
  targetKey: string
  stage: 'render' | 'encode' | 'validate' | 'checksum' | 'upload'
  status: 'pending' | 'running' | 'done' | 'failed'
}

export type TGeneratedImageUploadBatchTarget = {
  candidateOwnerRef: string
  variantKey: string
  width: number
  height: number
  mimeType: string
}

export type TGeneratedImageBatchClaim = {
  type: 'publish' | 'delete'
  key: string
  claimedAt: string
  expiresAt: string
}

export type TGeneratedImageManifestEntry = {
  assetPublicRef: string
  candidateOwnerRef: string
  storageKey: string
  variantKey: string
  width: number
  height: number
  mimeType: string
  checksum: string
}

/**
 * Produces the version-1 manifest bytes signed by Assets Hub and verified by Phoenix.
 * Keep the camelCase keys and ordering stable until all v1 claims have expired.
 */
export const canonicalGeneratedImageManifestV1 = (
  manifest: readonly TGeneratedImageManifestEntry[],
): string =>
  JSON.stringify(
    [...manifest]
      .sort((left, right) => left.variantKey.localeCompare(right.variantKey))
      .map((entry) => ({
        assetPublicRef: entry.assetPublicRef,
        candidateOwnerRef: entry.candidateOwnerRef,
        checksum: entry.checksum,
        height: entry.height,
        mimeType: entry.mimeType,
        storageKey: entry.storageKey,
        variantKey: entry.variantKey,
        width: entry.width,
      })),
  )

export type TGeneratedImagePublishCapability = {
  batchRef: string
  purpose: string
  claimKey: string
  requestDigest: string
  requestDigestVersion: number
  manifest: TGeneratedImageManifestEntry[]
  manifestDigest: string
  policyVersion: string
  signingKeyId: string
  expiresAt: string
}

export type TGeneratedImageUploadBatch = {
  publicRef: string
  purpose: string
  requestDigest: string
  requestDigestVersion: number
  expectedVariants: TGeneratedImageUploadBatchTarget[]
  expiresAt: string
  claim: TGeneratedImageBatchClaim | null
}
