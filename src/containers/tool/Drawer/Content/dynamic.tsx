import dynamic from 'next/dynamic'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

// import ArticleViewer from '@/containers/viewer/ArticleViewer'

export const ArticleEditor = dynamic(() => import('@/containers/editor/ArticleEditor'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const WallpaperEditor = dynamic(() => import('@/containers/editor/WallpaperEditor'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const AccountEditor = dynamic(() => import('@/containers/editor/AccountEditor'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const UserList = dynamic(() => import('@/widgets/UserList'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const SearchPanel = dynamic(() => import('@/widgets/SearchPanel'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const ArticleViewer = dynamic(() => import('@/containers/viewer/ArticleViewer'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const TagSettingEditor = dynamic(() => import('@/containers/editor/TagSettingEditor'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})

export const PassportEditor = dynamic(() => import('@/containers/editor/PassportEditor'), {
  loading: () => <LavaLampLoading />,
  ssr: false,
})
