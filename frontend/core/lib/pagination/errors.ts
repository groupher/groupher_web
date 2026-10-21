/** Normalizes query failures without exposing transport-specific error shapes to Core consumers. */
export const normalizePaginationError = (error: unknown): Error | null => {
  if (error == null) return null
  if (error instanceof Error) return error
  return new Error('Pagination request failed')
}
