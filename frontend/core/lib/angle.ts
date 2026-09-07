/**
 * Normalizes any angle into the -180..180 range.
 *
 * Controls such as AngleWheel need this signed range so dragging across 0/360
 * does not create a visible jump.
 */
export const normalizeSignedAngle = (angle: number): number => {
  const rounded = Math.round(angle)
  const normalized = ((rounded % 360) + 360) % 360

  if (normalized === 180 && rounded < 0) return -180
  return normalized > 180 ? normalized - 360 : normalized
}

/**
 * Normalizes an angle for persistence into the backend's 0..359 degree range.
 *
 * The editor intentionally keeps signed angles for a continuous wheel UI, but
 * persisted wallpaper recipes use an unsigned canonical representation.
 */
export const normalizePersistedAngle = (angle: number): number => {
  const rounded = Math.round(angle)
  return ((rounded % 360) + 360) % 360
}

/**
 * Returns the shortest distance between two circular angles.
 */
export const circularAngleDistance = (angle: number, target: number): number => {
  const diff = Math.abs(normalizeSignedAngle(angle) - normalizeSignedAngle(target))

  return Math.min(diff, 360 - diff)
}
