import type { TTagsMode } from './spec'

export const TAGS_MODE = {
  ALL: 'all' as TTagsMode,
  TAG: 'tag' as TTagsMode,
  TIME: 'time' as TTagsMode,
  VERSION: 'version' as TTagsMode,
}

export const TABS_MODE_OPTIONS = [
  {
    title: '全部',
    raw: TAGS_MODE.ALL,
  },
  {
    title: '标签',
    raw: TAGS_MODE.TAG,
  },
  {
    title: '时间',
    raw: TAGS_MODE.TIME,
  },
  {
    title: '版本',
    raw: TAGS_MODE.VERSION,
  },
]
