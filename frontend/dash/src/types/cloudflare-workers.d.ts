declare module 'cloudflare:workers' {
  /** Extends the current Worker request lifetime without delaying the response. */
  export function waitUntil(promise: Promise<unknown>): void
}
