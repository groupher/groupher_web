import type { TChangeMode } from '@/spec'

export const CHANGE_MODE = {
  CREATE: 'create',
  UPDATE: 'update',
} as Record<Uppercase<TChangeMode>, TChangeMode>

export const holder = 1
