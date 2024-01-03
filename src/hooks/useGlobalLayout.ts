import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TGlobalLayout, TColorName } from '@/spec'

const useGlobalLayout = (): TGlobalLayout => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const init = store.dashboardThread

  return {
    primaryColor: init.primaryColor,
    brand: init.brandLayout,
    tag: init.tagLayout,
    avatar: init.avatarLayout,
    post: init.postLayout,
    kanban: init.kanbanCardLayout,
    kanbanBgColors: init.kanbanBgColors as TColorName[],
    doc: init.docLayout,
    docFaq: init.docFaqLayout,
    header: init.headerLayout,
    footer: init.footerLayout,
    changelog: init.changelogLayout,
    banner: init.bannerLayout,
    topbar: init.topbarLayout,
    topbarBg: init.topbarBg,

    broadcast: init.broadcastLayout,
    broadcastBg: init.broadcastBg,
    broadcastEnable: init.broadcastEnable,

    broadcastArticle: init.broadcastArticleLayout,
    broadcastArticleBg: init.broadcastArticleBg,
    broadcastArticleEnable: init.broadcastArticleEnable,

    enable: init.enable,
  }
}

export default useGlobalLayout
