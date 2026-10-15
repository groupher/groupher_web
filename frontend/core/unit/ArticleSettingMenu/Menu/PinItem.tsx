import { useCallback, useEffect, useState } from 'react'

import useViewingArticle from '~/hooks/useViewingArticle'
import PinSVG from '~/icons/Pin'
import SpinSVG from '~/icons/Spin'
import UnPinSVG from '~/icons/UnPin'
import { updateViewingArticle } from '~/signal'
import { toast } from '~/ui/Toaster'

import S from '../schema'
import useSalon from './salon'

export default function PinItem() {
  const s = useSalon()

  const { article } = useViewingArticle()
  const [result, pinPost] = useArticleSettingMutation(S.pinPost)
  const [_result2, undoPinPost] = useArticleSettingMutation(S.undoPinPost)

  const [pin, setPin] = useState(article.isPinned)

  useEffect(() => {
    setPin(article.isPinned)
  }, [article.isPinned])

  const handlePin = useCallback(() => {
    if (!article.innerId || !article.community?.slug || !article.meta?.thread) {
      toast('文章路径不完整', 'error')
      return
    }

    const articlePath = {
      innerId: article.innerId,
      community: article.community.slug,
      thread: article.meta.thread,
    }

    const nextPin = !pin
    const action = nextPin
      ? pinPost({ article: articlePath })
      : undoPinPost({ article: articlePath })

    action.then((result) => {
      if (result.error) {
        toast('设置失败', 'error')
      } else {
        toast('设置完成')
        setPin(nextPin)
        if (article.id) updateViewingArticle({ id: article.id, isPinned: nextPin })
      }
    })
  }, [pin, article, pinPost, undoPinPost])

  return (
    <button type='button' className={s.menuItem} onClick={handlePin}>
      {pin ? <UnPinSVG className={s.icon} /> : <PinSVG className={s.icon} />}
      {pin ? '取消置顶' : '置顶'}
      <div className='grow' />
      {result.fetching && <SpinSVG className={s.icon} />}
    </button>
  )
}
import useArticleSettingMutation from '~/query/mutation/useArticleSettingMutation'
