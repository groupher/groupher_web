import type { TTagsMode } from './spec'

export const TAGS_MODE = {
  DEFAULT: 'default' as TTagsMode,
  CREATED_TIME: 'created_time' as TTagsMode,
  VERSION: 'version' as TTagsMode,
}

export const TABS_MODE_OPTIONS = [
  {
    title: '标签',
    raw: TAGS_MODE.DEFAULT,
  },
  {
    title: '时间',
    raw: TAGS_MODE.CREATED_TIME,
  },
  {
    title: '版本',
    raw: TAGS_MODE.VERSION,
  },
]
