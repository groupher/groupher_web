import { FC } from 'react'

import TYPE from '@/constant/type'
// import ModeLineMenu from '@/containers/unit/ModeLineMenu'
import type { TUser } from '@/spec'

import type { TExtraInfo } from '../spec'

import {
  ArticleViewer,
  MailsViewer,
  // editors
  AccountEditor,
  WallpaperEditor,
  // utils
  DashboardDesc,
  ArticleEditor,
  PassportEditor,
  TagSettingEditor,
  SearchPanel,
} from '../dynamics'

type TProps = {
  type: string
  attUser: TUser
  extraInfo: TExtraInfo
}

const Content: FC<TProps> = ({ type, attUser, extraInfo }) => {
  if (!type) return null

  const { DRAWER } = TYPE

  switch (type) {
    case DRAWER.SEARCH_PANEL:
      return <SearchPanel />

    case DRAWER.ACCOUNT_EDIT:
      // @ts-ignore
      return <AccountEditor />

    case DRAWER.PASSPORT_EDITOR:
      // @ts-ignore
      return <PassportEditor />
    case DRAWER.G_EDITOR:
      return <ArticleEditor />

    case DRAWER.MAILS_VIEW:
      // @ts-ignore
      return <MailsViewer />

    case DRAWER.DASHBOARD_DESC: {
      const { postLayout, dashboardDescLayout } = extraInfo

      const activeSettings = {
        postLayout,
      }
      // @ts-ignore
      return <DashboardDesc layout={dashboardDescLayout} activeSettings={activeSettings} />
    }

    case DRAWER.CUSTOM_BG_EDITOR:
      // @ts-ignore
      return <WallpaperEditor />

    case DRAWER.MODELINE_MENU:
      return null
    // @ts-ignore
    // return <ModeLineMenu type={extraInfo.mmType} />

    case DRAWER.LIST_USERS: {
      // @ts-ignore
      return <h2>UserLister</h2>
    }

    case DRAWER.CREATE_TAG: {
      // @ts-ignore
      return <TagSettingEditor mode="create" />
    }

    case DRAWER.EDIT_TAG: {
      // @ts-ignore
      return <TagSettingEditor />
    }

    default: {
      // @ts-ignore
      return <ArticleViewer />
    }
  }
}

export default Content
