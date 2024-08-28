import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, bg, br } = useTwBelt()

  return {
    wrapper: 'relative mb-3',
    main: 'relative px-2',
    logoBox: cn('size-24 align-both -mt-20 ml-1.5 rounded-lg border', bg('htmlBg'), br('divider')),
    logo: cn('size-20'),
    communityInfo: cn('mt-4'),
    title: cn('text-xl ml-2 bold-sm', fg('text.title')),
    cover: 'w-full h-52 object-cover rounded !-z-10',
    coverHolder: cn('w-full h-52', bg('hoverBg')),
    accountWrapper: 'absolute h-7 top-4 right-0 z-10',
  }
}
