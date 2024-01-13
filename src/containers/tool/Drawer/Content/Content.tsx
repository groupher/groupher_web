import { FC } from 'react'

import TYPE from '@/constant/type'
// import ModeLineMenu from '@/containers/unit/ModeLineMenu'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import {
  ArticleViewer,
  TagSettingEditor,
  PassportEditor,
  ArticleEditor,
  WallpaperEditor,
  AccountEditor,
  // MailsViewer,
} from './dynamic'

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
      return <SearchPanel />

    case DRAWER.ACCOUNT_EDIT:
      return <AccountEditor />

    case DRAWER.PASSPORT_EDITOR:
      return <PassportEditor />
    case DRAWER.G_EDITOR:
      return <ArticleEditor />

    // case DRAWER.MAILS_VIEW:
    //   return <MailsViewer />

    case DRAWER.CUSTOM_BG_EDITOR:
      return <WallpaperEditor />

    case DRAWER.MODELINE_MENU:
      return null
    // @ts-ignore
    // return <ModeLineMenu type={extraInfo.mmType} />

    case DRAWER.LIST_USERS: {
      return <UserList />
    }

    case DRAWER.CREATE_TAG: {
      return <TagSettingEditor mode="create" />
    }

    case DRAWER.EDIT_TAG: {
      return <TagSettingEditor />
    }

    default: {
      return <ArticleViewer />
    }
  }
}

export default Content
