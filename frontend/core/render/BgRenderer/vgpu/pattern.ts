const getTextureUsage = (): number => {
  if (typeof GPUTextureUsage !== 'undefined') {
    return (
      GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
    )
  }

  return 0x04 | 0x02 | 0x10
}

export type TPatternTexture = {
  height: number
  texture: GPUTexture
  width: number
}

const parsePixels = (value: string | undefined): number | null => {
  if (!value || value === 'auto') return null

  const match = /^([0-9]+(?:\.[0-9]+)?)px$/.exec(value)
  return match ? Number(match[1]) : null
}

/** Resolves CSS mask sizing into pixel repeat counts for the top-origin vgpu UV space. */
export const getPatternRepeat = (
  canvasSize: readonly [number, number],
  patternSize: string,
  imageSize: readonly [number, number],
): readonly [number, number] => {
  const [canvasWidth, canvasHeight] = canvasSize
  const [imageWidth, imageHeight] = imageSize
  const [widthToken, heightToken] = patternSize.trim().split(/\s+/)
  const parsedWidth = parsePixels(widthToken)
  const parsedHeight = parsePixels(heightToken)
  const width =
    parsedWidth ?? (parsedHeight ? (parsedHeight * imageWidth) / imageHeight : imageWidth)
  const height = parsedHeight ?? (width * imageHeight) / imageWidth

  return [canvasWidth / Math.max(width, 1), canvasHeight / Math.max(height, 1)]
}

/** Creates a persistent fallback texture used while an image asset is loading. */
export const createPatternFallbackTexture = (
  device: GPUDevice,
  label = 'wallpaper-vgpu-pattern-fallback',
): TPatternTexture => {
  const texture = device.createTexture({
    size: [1, 1],
    format: 'rgba8unorm',
    usage: getTextureUsage(),
    label,
  })
  device.queue.writeTexture(
    { texture },
    new Uint8Array([255, 255, 255, 255]),
    { bytesPerRow: 4 },
    { width: 1, height: 1 },
  )

  return { height: 1, texture, width: 1 }
}

/** Loads and uploads one same-origin wallpaper pattern bitmap to the current WebGPU device. */
export const loadPatternTexture = async (
  device: GPUDevice,
  imageUrl: string,
): Promise<TPatternTexture> => {
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`BG_VGPU_PATTERN_LOAD_FAILED: ${imageUrl} returned ${response.status}`)
  }

  const bitmap = await createImageBitmap(await response.blob())
  const { width, height } = bitmap
  try {
    const texture = device.createTexture({
      size: [width, height],
      format: 'rgba8unorm',
      usage: getTextureUsage(),
      label: 'wallpaper-vgpu-pattern',
    })
    device.queue.copyExternalImageToTexture({ source: bitmap }, { texture }, { width, height })

    return { height, texture, width }
  } finally {
    bitmap.close()
  }
}
