import type { TTooltipPlacement } from '@/spec'

export const MENU = {
  DEFAULT: {
    key: 'DEFAULT',
    height: '40px',
  },
  PEOPLE: {
    key: 'PEOPLE',
    height: '240px',
  },
  NOTIFY: {
    key: 'NOTIFY',
    height: '120px',
  },
  SHARE: {
    key: 'SHARE',
    height: '240px',
  },
  MORE: {
    key: 'MORE',
    height: '220px',
  },
}

export const TIP_OPTIONS = {
  placement: 'top' as TTooltipPlacement,
  delay: 500,
  offset: [1, 8] as [number, number],
}
