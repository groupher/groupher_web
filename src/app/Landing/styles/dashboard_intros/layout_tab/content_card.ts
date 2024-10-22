import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, bg, shadow } = useTwBelt()

  return {
    wrapper: cn(
      'column p-5 w-[420px] h-[450px] rounded-xl z-20',
      'absolute top-12 left-2.5',
      'animate-wiggle animate-infinite animate-duration-[15000ms]',
      fg('text.digest'),
      bg('htmlBg'),
      shadow('lg'),
    ),
  }
}
