import dynamic from 'next/dynamic'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

export const Overview = dynamic(() => import('./Overview'), {
  loading: () => <LavaLampLoading />,
})

// basic
export const BasicInfo = dynamic(() => import('./BasicInfo'), {
  loading: () => <LavaLampLoading />,
})

export const SEO = dynamic(() => import('./SEO'), {
  loading: () => <LavaLampLoading />,
})

export const Layout = dynamic(() => import('./Layout'), {
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

export const BannerBroadcast = dynamic(() => import('./BannerBroadcast'), {
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

export const Help = dynamic(() => import('./Help'), {
  loading: () => <LavaLampLoading />,
})

export const Header = dynamic(() => import('./Header'), {
  loading: () => <LavaLampLoading />,
})

export const Footer = dynamic(() => import('./Footer'), {
  loading: () => <LavaLampLoading />,
})
