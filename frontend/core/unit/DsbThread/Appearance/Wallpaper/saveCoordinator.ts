export type TAppearanceSaveLanes = {
  contentShadow?: () => Promise<unknown>
  wallpaper?: () => Promise<unknown>
}

/**
 * Runs the independent Appearance Save lanes in the frozen order.
 *
 * Dashboard content shadow is deliberately attempted first so a rejected
 * ordinary Dashboard write does not start WebGPU export or Assets Hub work.
 * There is no cross-aggregate rollback; a rejected lane stops the sequence and
 * the caller keeps the successful lane's baseline while retaining the failed
 * draft.
 */
export const executeAppearanceSave = async ({
  contentShadow,
  wallpaper,
}: TAppearanceSaveLanes): Promise<void> => {
  if (contentShadow) await contentShadow()
  if (wallpaper) await wallpaper()
}
