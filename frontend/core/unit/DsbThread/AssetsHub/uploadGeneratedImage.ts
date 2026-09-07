import { ASSETS_HUB_ENDPOINT } from '~/config'

import { extractErrorMessage, putFileWithProgress } from './helper'
import type { TFinalizeResult, THubUploadResult } from './spec'

export type TGeneratedImageUploadIntent = {
  assetPublicRef: string
  capability: string
  uploadRef: string
}

export type TGeneratedImageUploadOptions = {
  capability: string
  file: Blob
  uploadRef: string
}

/** Uploads one already-exported Wallpaper variant through the Batch-bound capability. */
export const uploadGeneratedImage = async ({
  capability,
  file,
  uploadRef,
}: TGeneratedImageUploadOptions): Promise<void> => {
  const presignResponse = await fetch(`${ASSETS_HUB_ENDPOINT}/uploads`, {
    body: JSON.stringify({ capability }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  })
  const presignPayload = (await presignResponse.json().catch(() => null)) as THubUploadResult | null
  if (!presignResponse.ok || !presignPayload?.result?.upload) {
    throw new Error(
      `GENERATED_IMAGE_PRESIGN_FAILED: ${extractErrorMessage(presignPayload ?? presignResponse.status)}`,
    )
  }

  const uploadFile = new File([file], `${uploadRef}.webp`, { type: 'image/webp' })
  await putFileWithProgress({
    file: uploadFile,
    headers: presignPayload.result.upload.headers,
    method: presignPayload.result.upload.method,
    onProgress: () => undefined,
    url: presignPayload.result.upload.url,
  })

  const finalizeResponse = await fetch(`${ASSETS_HUB_ENDPOINT}/uploads/${uploadRef}/finalize`, {
    body: JSON.stringify({ capability }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  })
  const finalizePayload = (await finalizeResponse
    .json()
    .catch(() => null)) as TFinalizeResult | null
  if (!finalizeResponse.ok || !finalizePayload?.result) {
    throw new Error(
      `GENERATED_IMAGE_FINALIZE_FAILED: ${extractErrorMessage(finalizePayload ?? finalizeResponse.status)}`,
    )
  }
}
