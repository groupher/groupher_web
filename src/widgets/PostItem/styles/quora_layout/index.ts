import useMainSalon from '..'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg } = useTwBelt()
  const main = useMainSalon()

  return {
    wrapper: cn(main.hoverable, 'column grow'),
    digest: cn('text-sm mt-1.5 mb-3', fg('text.digest')),
  }
}
