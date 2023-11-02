import dynamic from 'next/dynamic'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

export const Comments = dynamic(() => import('../unit/Comments'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading size="small" />,
  ssr: false,
})

export const Cashier = dynamic(() => import('../tool/Cashier'), {
  ssr: false,
})
