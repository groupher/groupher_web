import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, bg, br } = useTwBelt()

  return {
    wrapper: 'relative mb-3',
    main: 'relative px-2',
    logoBox: cn('size-24 align-both -mt-14 z-20 rounded border', bg('htmlBg'), br('divider')),
    logo: cn('size-20'),
    communityInfo: cn('mt-4'),
    title: cn('text-xl bold-sm', fg('text.title')),
    digest: cn('mt-1 text-sm', fg('text.digest')),
    cover: 'w-full h-52 object-cover',
    coverHolder: cn('w-full h-52', bg('hoverBg')),
    accountWrapper: 'absolute h-7 top-4 right-0 z-10',
    socialWrapper: 'absolute right-1 bottom-16',
  }
}
