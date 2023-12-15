import dynamic from 'next/dynamic'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

export const Comments = dynamic(() => import('../unit/Comments'), {
  loading: () => <LavaLampLoading size="small" />,
  ssr: false,
})

export const holder = 1
