import useTwBelt from '~/hooks/useTwBelt'

import useMainSalon from '../..'

export default () => {
  const { cn, avatar } = useTwBelt()
  const main = useMainSalon()

  return {
    wrapper: cn(main.hoverable, 'py-2.5 group/post'),
    main: 'column grow',
    avatarWrapper: 'column-center justify-between pt-2.5 pb-0.5 mr-2',
    avatar: cn('size-6', avatar()),
    upvoteWrapper: 'absolute top-3.5 right-0',
  }
}
