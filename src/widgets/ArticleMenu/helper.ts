import type { TArticle } from '@/spec'
import EVENT from '@/const/event'

import { moveToCommunity, mirrorToCommunity, setTag } from '@/signal'

export const hendleMenu = (key: string, article: TArticle): void => {
  switch (key) {
    case EVENT.MOVE_TO_COMMUNITY: {
      moveToCommunity()
      return
    }
    case EVENT.MIRROR_TO_COMMUNITY: {
      mirrorToCommunity()
      return
    }
    case EVENT.SET_TAG: {
      setTag()
      return
    }
    case 'edit': {
      handleEdit(article)
      // eslint-disable-next-line no-useless-return
      return
    }
    default: {
      // eslint-disable-next-line no-useless-return
      return
    }
  }
}

export const holder = 1

const handleEdit = (article: TArticle): void => {
  // const thread = article.meta.thread.toLowerCase()

  // Router.push(`/update/${thread}/${article.id}`)
  console.log('## ## TODO: handleEdit')
}
