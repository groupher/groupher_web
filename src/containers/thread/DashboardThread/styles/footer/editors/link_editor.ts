import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, fg, fill, rainbow, sexyHBorder } = useTwBelt()

  return {
    wrapper: 'w-full group',
    readonly: 'column gap-x-2.5',
    divider: cn(sexyHBorder(35), 'mb-4'),
    readonlyEditing: 'pt-0',
    readonlyHead: 'row-center',
    actions: 'row-center mr-3 gap-x-1 group-smoky-0',
    //
    label: cn('row-center text-sm', fg('text.title')),
    editTitle: cn('row-center text-xs mb-2 ml-px', fg('text.title')),
    //
    editItem: 'row-center w-full mb-3',
    input: 'w-full h-7',
    editWrapper: cn('column mt-1'),
    footer: 'w-full align-both',
    notifyLabel: cn(
      'text-xs border rounded-md px-1 py-px bold-sm ml-1.5 scale-75',
      rainbow('RED', 'fg'),
      rainbow('RED', 'borderSoft'),
      rainbow('RED', 'bgSoft'),
    ),
    icon: cn('size-3.5 pointer smoky-90', fill('text.digest')),
  }
}
