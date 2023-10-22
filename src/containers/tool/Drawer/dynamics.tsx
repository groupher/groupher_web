/* eslint-disable react/display-name */
import dynamic from 'next/dynamic'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
// import EditorLoading from '@/widgets/Loading/EditorLoading'

import { LavaLoadingWrapper } from './styles'

const CommonLoading = () => {
  return (
    <LavaLoadingWrapper>
      <LavaLampLoading />
    </LavaLoadingWrapper>
  )
}

// editor style loading config
// const editorConfig = {
//   // @ts-ignore
//   loading: () => <EditorLoading />,
//   ssr: false,
// }

// viewers
export const ArticleViewer = dynamic(() => import('@/containers/viewer/ArticleViewer'), {
  loading: () => <CommonLoading />,
})

export const MailsViewer = dynamic(() => import('@/containers/viewer/MailsViewer'), {
  loading: () => <CommonLoading />,
})

// editors
export const AccountEditor = dynamic(() => import('@/containers/editor/AccountEditor'), {
  loading: () => <CommonLoading />,
})

// user lister
export const UserLister = dynamic(() => import('@/containers/user/UserLister'), {
  loading: () => <CommonLoading />,
})

// utils
export const C11NSettingPanel = dynamic(() => import('@/containers/tool/C11NSettingPanel'), {
  loading: () => <CommonLoading />,
})

export const WallpaperEditor = dynamic(() => import('@/containers/editor/WallpaperEditor'), {
  loading: () => <CommonLoading />,
})

export const DashboardDesc = dynamic(() => import('@/widgets/DashboardDesc'), {
  loading: () => <CommonLoading />,
})

export const ArticleEditor = dynamic(() => import('@/containers/editor/ArticleEditor'), {
  loading: () => <CommonLoading />,
})

export const PassportEditor = dynamic(() => import('@/containers/editor/PassportEditor'), {
  loading: () => <CommonLoading />,
})

export const TagSettingEditor = dynamic(() => import('@/containers/editor/TagSettingEditor'), {
  loading: () => <CommonLoading />,
})

export const SearchPanel = dynamic(() => import('@/widgets/SearchPanel'), {
  loading: () => <CommonLoading />,
})
