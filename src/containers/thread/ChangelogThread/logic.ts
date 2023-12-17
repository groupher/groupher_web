import { buildLog } from '@/logger'

import type { TTagsMode } from './spec'

const _log = buildLog('L:ChangelogThread')

export const tagsModeChange = (tagsMode: TTagsMode): void => {
  // store.mark({ tagsMode })
}

export const holder = 1
