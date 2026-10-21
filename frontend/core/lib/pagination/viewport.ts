/** Uses the shared xl breakpoint: compact layouts include phones and tablets. */
export const PAGI_DESKTOP_MIN_WIDTH = 1280
export const isPagiMobileWidth = (width: number) => width < PAGI_DESKTOP_MIN_WIDTH

/** Server requests without viewport hints leave default lists to the browser. */
export const readPagiMobileLayout = (): boolean | null =>
  typeof window === 'undefined' ? null : isPagiMobileWidth(window.innerWidth)

export const hasExplicitPagiPosition = (
  search: Pick<URLSearchParams, 'get'>,
  keys = { api: 'pagiApi', page: 'page', after: 'after' },
) =>
  search.get(keys.api) === 'offset' ||
  search.get(keys.api) === 'cursor' ||
  search.get(keys.page) !== null ||
  search.get(keys.after) !== null
