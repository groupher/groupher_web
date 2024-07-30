import useTwBelt from '~/hooks/useTwBelt'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'

export default () => {
  const { cn, fg, fill, avatar } = useTwBelt()

  const { inView: badgeInView } = useCommunityDigestViewport()

  return {
    wrapper: 'min-w-52 max-w-52 mt-3.5',
    stickyWrapper: 'relative min-h-screen',
    showArea: cn('transition-opacity ', {
      'opacity-100 duration-300 ease-in': badgeInView,
      'opacity-0 duration-100 ease-out': !badgeInView,
    }),
    title: cn('row-center text-sm bold mb-2.5', fg('text.digest')),
    desc: cn('text-sm mb-2.5 line-clamp-2 leading-normal', fg('text.digest')),
    homeLinks: 'row-center text-sm bold-sm trucate max-w-52 mb-5',
    linkIcon: cn('size-5 -ml-1 mr-1', fill('text.digest')),
    joiners: 'row mb-6',
    publish: cn('w-full', badgeInView ? 'block' : 'hidden'),
    moreNum: cn('font ml-1 pointer', fg('text.digest'), `hover:${fg('article.title')}`),
    joinAvatar: cn('size-6 mr-2', avatar()),
    tagsBar: cn('mt-6 max-w-48'),
    unibarWrapper: cn('absolute bottom-0.5', badgeInView ? 'mb-32' : 'mb-10'),
  }
}
