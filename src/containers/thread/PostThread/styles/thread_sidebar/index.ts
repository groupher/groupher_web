import { AVATAR_LAYOUT } from '~/const/layout'

import useTwBelt from '~/hooks/useTwBelt'
import useLayout from '~/hooks/useLayout'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'

export default () => {
  const { cn, fg, fill } = useTwBelt()

  const { inView: badgeInView } = useCommunityDigestViewport()
  const { avatarLayout } = useLayout()

  return {
    wrapper: 'min-w-52 max-w-52 mt-3.5',
    showBox: cn('transition-opacity ', {
      'opacity-100 duration-300 ease-in': badgeInView,
      'opacity-0 duration-100 ease-out': !badgeInView,
    }),
    title: `row-align-center text-sm font-semibold mb-2.5 ${fg('article.digest')}`,
    communityNote: `text-sm mb-2.5 line-clamp-2 leading-normal ${fg('article.digest')}`,
    homeLinks: 'row-align-center text-sm truncate max-w-52 font-medium mb-5',
    linkIcon: `size-5 -ml-1 mr-1 ${fill('article.digest')}`,
    joiners: 'row mb-6',
    tagsBar: cn('mt-6 max-w-48', badgeInView ? 'h-[56vh]' : 'h-[76vh]'),
    publish: cn('w-full', badgeInView ? 'block' : 'hidden'),
    joinAvatar: cn(
      'size-6 mr-2',
      avatarLayout === AVATAR_LAYOUT.SQUARE ? 'rounded-md' : 'rounded-full',
    ),
    moreNum: `text-base ml-1 opacity-80 ${fg('article.digest')} hover:opacity-100 hover:${fg(
      'article.title',
    )} hover:cursor-pointer`,
  }
}
