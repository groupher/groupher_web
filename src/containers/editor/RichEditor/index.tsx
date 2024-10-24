/*
 *
 * RichEditor
 *
 */

import dynamic from 'next/dynamic'
import LavaLampLoading from '~/widgets/Loading/LavaLampLoading'

export const RichEditor = dynamic(() => import('./RealEditor'), {
  loading: () => <LavaLampLoading top={20} bottom={100} left={20} />,
  ssr: false,
})

export default RichEditor
