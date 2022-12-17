import { FC } from 'react'

import { TYPE } from '@/constant'
// import ModeLineMenu from '@/containers/unit/ModeLineMenu'
import type { TUser } from '@/spec'

import type { TExtraInfo } from '../spec'
// import PlaceHolder from './PlaceHolder'

import {
  ArticleViewer,
  MailsViewer,
  // editors
  AccountEditor,
  WallpaperEditor,
  // utils
  C11NSettingPanel,
  // userlister
  UserLister,
  DashboardDesc,
  ArticleEditor,
  TagSettingEditor,
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
    case DRAWER.ACCOUNT_EDIT:
      // @ts-ignore
      return <AccountEditor />

    case DRAWER.G_EDITOR:
      return <ArticleEditor />

    case DRAWER.MAILS_VIEW:
      // @ts-ignore
      return <MailsViewer />

    case DRAWER.C11N_SETTINGS:
      // @ts-ignore
      return <C11NSettingPanel />

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

    case DRAWER.USER_LISTER: {
      // @ts-ignore
      return <UserLister type={extraInfo.userListerType} />
    }

    case DRAWER.TAG_SETTING: {
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
