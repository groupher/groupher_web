const REVALIDATION_TIMEOUT_MS = 5_000
const REVALIDATION_MAX_ATTEMPTS = 2
const REVALIDATION_RETRY_DELAY_MS = 100

const configuredRevalidation = (): { endpoint: string; secret: string } | null => {
  const endpoint = process.env.COMMUNITY_REVALIDATION_URL?.trim()
  const secret = process.env.COMMUNITY_REVALIDATE_SECRET?.trim()
  return endpoint && secret ? { endpoint, secret } : null
}

const waitForRetry = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, REVALIDATION_RETRY_DELAY_MS))

/** Reports whether Dash can call the authenticated Community purge endpoint. */
export const hasConfiguredCommunityRevalidation = (): boolean => Boolean(configuredRevalidation())

/** Calls the Community-owned purge endpoint; callers decide whether failure blocks their response. */
export const revalidateCommunityTags = async (
  tags: readonly string[],
  reason: string,
): Promise<void> => {
  const config = configuredRevalidation()
  if (!config) throw new Error('Community cache revalidation is not configured.')

  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.secret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tags, reason }),
    signal: AbortSignal.timeout(REVALIDATION_TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`Community cache revalidation failed with ${response.status}.`)
}

/** Runs Dash-to-Community invalidation as a non-blocking Worker waitUntil task. */
export const observeCommunityRevalidation = async (
  tags: readonly string[],
  reason: string,
): Promise<void> => {
  const startedAt = Date.now()
  let attempt = 0
  try {
    while (attempt < REVALIDATION_MAX_ATTEMPTS) {
      attempt += 1
      try {
        await revalidateCommunityTags(tags, reason)
        break
      } catch (error) {
        if (attempt >= REVALIDATION_MAX_ATTEMPTS) throw error
        console.warn(
          JSON.stringify({
            event: 'dash_community_revalidation_retry',
            tags,
            reason,
            attempt,
            error: error instanceof Error ? error.message : String(error),
          }),
        )
        await waitForRetry()
      }
    }
    console.info(
      JSON.stringify({
        event: 'dash_community_revalidation',
        status: 'ok',
        tags,
        reason,
        attempts: attempt,
        durationMs: Date.now() - startedAt,
      }),
    )
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'dash_community_revalidation',
        status: 'error',
        tags,
        reason,
        attempts: attempt,
        durationMs: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
      }),
    )
  }
}
