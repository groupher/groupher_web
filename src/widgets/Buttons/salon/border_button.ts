import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, global, shadow, fill } = useTwBelt()

  return {
    wrapper: cn('relative group'),
    button: cn(shadow('xl')),
    background: cn('relative align-center p-1 rounded-xl overflow-hidden'),
    realBg: cn(
      'absolute -top-12 -left-2 size-40 circle',
      'animate-spin animate-infinite animate-duration-[30000ms]',
      global('gradient-purple'),
    ),

    arrow: cn(
      'absolute right-3 top-3 size-4 rotate-180 opacity-65 hidden group-hover:block trans-all-100',
      'z-20',
      fill('button.fg'),
    ),
  }
}
