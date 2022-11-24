import dynamic from 'next/dynamic'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

export const PublishButton = dynamic(
  () => import('@/widgets/Buttons/PublishButton'),
  {
    ssr: false,
  },
)

export const TagsBar = dynamic(() => import('@/containers/unit/TagsBar'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const CommunityJoinBadge = dynamic(
  () => import('@/containers/tool/CommunityJoinBadge'),
  {
    ssr: false,
  },
)
