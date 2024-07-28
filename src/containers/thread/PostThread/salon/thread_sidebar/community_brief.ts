import useTwBelt from '~/hooks/useTwBelt'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'

export default () => {
  const { cn, fg } = useTwBelt()
  const { inView: badgeInView } = useCommunityDigestViewport()

  return {
    wrapper: cn('row-center ml-1 over-hide trans-all-200', !badgeInView || 'max-h-0'),
    brief: 'mb-2.5 ml-3',
    logo: 'size-8 -mt-1.5',
    title: cn('text-sm bold-sm', fg('article.title')),
    row: 'row-center mt-1',
    label: 'text-sm opacity-60',
    count: cn('text-sm bold ml-1.5', fg('text.digest')),
  }
}
