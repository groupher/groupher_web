import useTwBelt from '~/hooks/useTwBelt'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'

export default () => {
  const { cn, fg } = useTwBelt()
  const { inView: badgeInView } = useCommunityDigestViewport()

  return {
    wrapper: cn('row-center ml-1 overflow-hidden trans-all-200', !badgeInView || 'max-h-0'),
    brief: 'mb-2.5 ml-3',
    logo: 'size-8 -mt-1.5',
    title: cn('text-sm bold-sm', fg('text.title')),
    row: 'row-center mt-1',
    label: cn('text-sm opacity-80', fg('text.digest')),
    count: cn('text-sm bold ml-1.5', fg('text.digest')),
  }
}
