import { FC, Suspense } from 'react'

import TYPE from '@/constant/type'
// import ModeLineMenu from '@/containers/unit/ModeLineMenu'

import ArticleViewer from '@/containers/viewer/ArticleViewer'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import TagSettingEditor from '@/containers/editor/TagSettingEditor'
import PassportEditor from '@/containers/editor/PassportEditor'
import ArticleEditor from '@/containers/editor/ArticleEditor'
import WallpaperEditor from '@/containers/editor/WallpaperEditor'
import AccountEditor from '@/containers/editor/AccountEditor'
import MailsViewer from '@/containers/viewer/MailsViewer'

import UserList from '@/widgets/UserList'
import SearchPanel from '@/widgets/SearchPanel'

type TProps = {
  type: string
}

const Content: FC<TProps> = ({ type }) => {
  if (!type) return <LavaLampLoading />

  const { DRAWER } = TYPE

  switch (type) {
    case DRAWER.SEARCH_PANEL:
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <SearchPanel />
        </Suspense>
      )

    case DRAWER.ACCOUNT_EDIT:
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <AccountEditor />
        </Suspense>
      )

    case DRAWER.PASSPORT_EDITOR:
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <PassportEditor />
        </Suspense>
      )
    case DRAWER.G_EDITOR:
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <ArticleEditor />
        </Suspense>
      )

    case DRAWER.MAILS_VIEW:
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <MailsViewer />
        </Suspense>
      )

    case DRAWER.CUSTOM_BG_EDITOR:
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <WallpaperEditor />
        </Suspense>
      )

    case DRAWER.MODELINE_MENU:
      return null
    // @ts-ignore
    // return <ModeLineMenu type={extraInfo.mmType} />

    case DRAWER.LIST_USERS: {
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <UserList />
          <UserList />
        </Suspense>
      )
    }

    case DRAWER.CREATE_TAG: {
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <TagSettingEditor mode="create" />
        </Suspense>
      )
    }

    case DRAWER.EDIT_TAG: {
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <TagSettingEditor />
        </Suspense>
      )
    }

    default: {
      return (
        <Suspense fallback={<LavaLampLoading />}>
          <ArticleViewer />
        </Suspense>
      )
    }
  }
}

export default Content
