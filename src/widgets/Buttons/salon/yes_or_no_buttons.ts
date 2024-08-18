import useTwBelt from '~/hooks/useTwBelt'

type TProps = { align: 'center' | 'right' }

export default ({ align }: TProps) => {
  const { cn, fg } = useTwBelt()

  return {
    wrapper: cn('row-center w-auto', align ? 'justify-center' : 'justify-end'),
    cancelBtn: cn('text-xs mt-px opacity-80 smoky-90', fg('text.digest')),
  }
}
