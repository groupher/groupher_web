import type { TSnakeUpperCase } from '@/spec'
import type { TImagePos } from './spec'

export const IMAGE_POS = {
  TOP_LEFT: 'top_left',
  TOP_CENTER: 'top_center',
  TOP_RIGHT: 'top_right',
  CENTER_LEFT: 'center_left',
  CENTER: 'center',
  CENTER_RIGHT: 'center_right',
  BOTTOM_LEFT: 'bottom_left',
  BOTTOM_CENTER: 'bottom_center',
  BOTTOM_RIGHT: 'bottom_right',
} as Record<TSnakeUpperCase<TImagePos>, TImagePos>

export const holder = {}
