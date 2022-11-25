import dynamic from 'next/dynamic'

export const CommunityJoinBadge = dynamic(
  () => import('@/containers/tool/CommunityJoinBadge'),
  {
    ssr: false,
  },
)

export const holder = 1
