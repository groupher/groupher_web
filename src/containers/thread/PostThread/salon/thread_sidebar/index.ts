import useTwBelt from '~/hooks/useTwBelt'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'

export default () => {
  const { cn, fg, fill, avatar } = useTwBelt()

  const { inView: badgeInView } = useCommunityDigestViewport()

  return {
    wrapper: 'min-w-52 max-w-52 mt-3.5',
    showArea: cn('transition-opacity ', {
      'opacity-100 duration-300 ease-in': badgeInView,
      'opacity-0 duration-100 ease-out': !badgeInView,
    }),
    title: cn('row-center font-sm bold mb-2.5', fg('article.digest')),
    desc: cn('font-sm mb-2.5 line-clamp-2 leading-normal', fg('article.digest')),
    homeLinks: 'row-center font-sm bold-sm truncate max-w-52 mb-5',
    linkIcon: cn('size-5 -ml-1 mr-1', fill('article.digest')),
    joiners: 'row mb-6',
    tagsBar: cn('mt-6 max-w-48', badgeInView ? 'h-[56vh]' : 'h-[76vh]'),
    publish: cn('w-full', badgeInView ? 'show' : 'hide'),
    joinAvatar: cn('size-6 mr-2', avatar()),
    moreNum: cn('font ml-1 pointer', fg('article.digest'), `hover:${fg('article.title')}`),
  }
}
