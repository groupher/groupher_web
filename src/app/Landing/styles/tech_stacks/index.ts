import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, br, global } = useTwBelt()

  return {
    wrapper: cn('column-align-both w-full mt-32'),
    wall: 'align-both w-full mt-20 mb-12',
    inner: cn(
      'align-both justify-between relative w-[1024px] h-[340px] rounded-2xl border',
      br('divider'),
    ),
    innerBgWrapper: cn('absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl'),
    slogan: 'column-align-both',
    title: cn('text-3xl bold-sm opacity-70', fg('text.title'), global('text-shadow')),
    desc: cn('text-lg mt-3', fg('text.digest')),
    cadBg: cn('absolute left-0 top-0 w-8/12 h-full object-cover z-10 opacity-60'),
    cadBg2: cn('absolute right-0 top-0 w-4/12 h-full object-cover z-10 opacity-85'),
  }
}
