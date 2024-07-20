import useTwBelt from '~/hooks/useTwBelt'

import useMainSalon from '..'

export default () => {
  const { cn, fg } = useTwBelt()
  const main = useMainSalon()

  return {
    wrapper: cn(main.hoverable, 'row relative mb-2 p-y-2.5'),
    main: 'column grow',
    avatarWrapper: 'column-center justify-between pt-2.5 pb-0.5 mr-2',
    digest: cn('text-sm mt-1.5 mb-3 max-w-96 line-clamp-1', fg('text.digest')),
    upvoteWrapper: 'w-10 mr-5 mt-1.5',
  }
}
