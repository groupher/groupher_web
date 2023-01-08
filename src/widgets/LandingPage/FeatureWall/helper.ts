import type { TScrollDirection } from '@/spec'

/**
 * check feat block is in view
 */
export const checkBlockInView = (
  headInView: boolean,
  footInView: boolean,
  scrollDir: TScrollDirection,
): boolean => {
  return (
    (headInView && footInView) ||
    (headInView && scrollDir === 'up') ||
    (footInView && scrollDir === 'up') ||
    (headInView && scrollDir === 'down') ||
    (footInView && !headInView && scrollDir === 'down')
  )
}

export const holder = 1
