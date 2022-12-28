import type { TSnakeUpperCase } from '@/spec'

import type { TImagePos, TSettingLevel, TLinearBorderPos } from './spec'

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

export const LINEAR_BORDER = {
  TOP_LEFT: 'top_left',
  TOP: 'top',
  TOP_RIGHT: 'top_right',

  BOTTOM_LEFT: 'bottom_left',
  BOTTOM: 'bottom',
  BOTTOM_RIGHT: 'bottom_right',

  TOP_ALL: 'top_all',
  BOTTOM_ALL: 'bottom_all',
  LEFT_ALL: 'left_all',
  RIGHT_ALL: 'right_all',
  ALL: 'all',
  NONE: 'none',
} as Record<TSnakeUpperCase<TLinearBorderPos>, TLinearBorderPos>

export const SETTING_LEVEL = {
  L1: 'L1',
  L2: 'L2',
  L3: 'L3',
  L4: 'L4',
  L5: 'L5',
} as Record<TSettingLevel, TSettingLevel>

export const IMAGE_SHADOW = {
  L1: 'none',
  L2: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;', // @9
  L3: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;',
  L4: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;',
  L5: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;',
} as Record<TSettingLevel, string>

export const IMAGE_BORDER_RADIUS = {
  L1: '0px',
  L2: '10px',
  L3: '18px',
  L4: '25px',
  L5: '50px',
} as Record<TSettingLevel, string>
