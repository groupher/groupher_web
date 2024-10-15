import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn } = useTwBelt()

  return {
    wrapper: cn('mt-16'),
    title: 'text-sm text-text-digest-dark bold-sm mb-4 -ml-0.5',
  }
}
