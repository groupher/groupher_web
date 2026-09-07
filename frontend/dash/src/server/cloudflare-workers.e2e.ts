/** Runs Worker background work without a Cloudflare execution context in local E2E. */
export const waitUntil = (promise: Promise<unknown>): void => {
  void promise
}
