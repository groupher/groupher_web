import type { TTab } from './spec'

export const TAB = {
  BUILDIN: 'buildin',
  UPLOAD: 'upload',
} as Record<Uppercase<TTab>, TTab>

export const TAB_OPTIONS = [
  {
    title: '内置壁纸',
    slug: TAB.BUILDIN,
  },
  {
    title: '上传壁纸',
    slug: TAB.UPLOAD,
  },
]
