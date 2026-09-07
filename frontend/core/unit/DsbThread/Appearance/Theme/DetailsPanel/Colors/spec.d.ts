import type { EXTRA_COLOR_DETAILS, MAIN_COLOR_DETAILS } from './constant'

export type TColorDetail = (typeof MAIN_COLOR_DETAILS | typeof EXTRA_COLOR_DETAILS)[number]
