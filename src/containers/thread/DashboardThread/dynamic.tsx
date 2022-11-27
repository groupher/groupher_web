import dynamic from 'next/dynamic'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

// basic
export const BasicInfo = dynamic(() => import('./BasicInfo'), {
  loading: () => <LavaLampLoading />,
})

export const UI = dynamic(() => import('./UI'), {
  loading: () => <LavaLampLoading />,
})

export const Alias = dynamic(() => import('./Alias'), {
  loading: () => <LavaLampLoading />,
})

export const Admin = dynamic(() => import('./Admin'), {
  loading: () => <LavaLampLoading />,
})

export const Threads = dynamic(() => import('./Threads'), {
  loading: () => <LavaLampLoading />,
})

export const Tags = dynamic(() => import('./Tags'), {
  loading: () => <LavaLampLoading />,
})

// integrates
export const Domain = dynamic(() => import('./Domain'), {
  loading: () => <LavaLampLoading />,
})

export const ThirdPart = dynamic(() => import('./ThirdPart'), {
  loading: () => <LavaLampLoading />,
})

export const Widgets = dynamic(() => import('./Widgets'), {
  loading: () => <LavaLampLoading />,
})