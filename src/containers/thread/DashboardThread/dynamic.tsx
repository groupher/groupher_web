import dynamic from 'next/dynamic'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

const Loading = () => <LavaLampLoading top={20} left={50} />

export const Overview = dynamic(() => import('./Overview'), {
  loading: () => <Loading />,
})

// basic
export const BasicInfo = dynamic(() => import('./BasicInfo'), {
  loading: () => <Loading />,
})

export const SEO = dynamic(() => import('./SEO'), {
  loading: () => <Loading />,
})

export const Layout = dynamic(() => import('./Layout'), {
  loading: () => <Loading />,
})

export const Alias = dynamic(() => import('./Alias'), {
  loading: () => <Loading />,
})

export const Admin = dynamic(() => import('./Admin'), {
  loading: () => <Loading />,
})

export const Threads = dynamic(() => import('./Threads'), {
  loading: () => <Loading />,
})

export const Tags = dynamic(() => import('./Tags'), {
  loading: () => <Loading />,
})

export const RSS = dynamic(() => import('./RSS'), {
  loading: () => <Loading />,
})

export const Broadcast = dynamic(() => import('./Broadcast'), {
  loading: () => <Loading />,
})

// integrates
export const Domain = dynamic(() => import('./Domain'), {
  loading: () => <Loading />,
})

export const ThirdPart = dynamic(() => import('./ThirdPart'), {
  loading: () => <Loading />,
})

export const Widgets = dynamic(() => import('./Widgets'), {
  loading: () => <Loading />,
})

export const Doc = dynamic(() => import('./Doc'), {
  loading: () => <Loading />,
})

export const Header = dynamic(() => import('./Header'), {
  loading: () => <Loading />,
})

export const Footer = dynamic(() => import('./Footer'), {
  loading: () => <Loading />,
})
