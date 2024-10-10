import useBase from '..'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, global } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn(base.baseCard, global('gradient-blue')),
    footer: 'column w-full p-4 pt-0',
    title: cn('text-base mb-1', fg('text.title')),
    desc: cn('text-sm', fg('text.digest')),
  }
}
