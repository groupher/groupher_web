import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fill } = useTwBelt()

  return {
    wrapper: 'w-full',
    inputWrapper: 'relative',
    deleteIcon: cn(
      'pointer absolute top-1.5 -right-2.5',
      'size-6 trans-all-200',
      `hover:${fill('rainbow.red')}`,
      fill('text.digest'),
    ),
  }
}
