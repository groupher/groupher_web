import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, sexyHBorder, primary } = useTwBelt()

  return {
    topWrapper: cn('row justify-between mb-5'),
    divider: cn('mb-10', sexyHBorder(35)),
    groupInputer: 'w-60',
    leftPart: 'column w-64 gap-y-6',
    rightPart: 'w-56 mr-4',
    noteTitle: cn('text-xs mb-2.5 bold-sm', fg('text.digest')),
    noteP: cn('text-xs mb-3 opacity-80', fg('text.digest')),
    adder: 'row-center w-44 -ml-1 scale-95',
    slash: cn('text-xs ml-3 mr-3', fg('text.hint')),
    plusIcon: cn('size-3 mr-1.5', primary('fill')),
    //
    linkGroup: 'row wrap justify-items-start mt-7 w-full gap-7',
    columnWrapper: 'w-[30%] h-full',
    itemsWrapper: 'column gap-y-5 mb-8',
  }
}
