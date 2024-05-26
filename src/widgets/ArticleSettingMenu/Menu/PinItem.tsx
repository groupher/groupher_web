import { type FC, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useMutation } from 'urql'

import { toast, updateViewingArticle } from '@/signal'
import { SpaceGrow } from '@/widgets/Common'
import useViewingArticle from '@/hooks/useViewingArticle'

import S from '../schema'
import { Icon } from '../styles/icon'
import { MenuItem } from '../styles/menu'

const PinItem: FC = () => {
  const { article } = useViewingArticle()
  const [result, pinPost] = useMutation(S.pinPost)
  const [_result2, undoPinPost] = useMutation(S.undoPinPost)

  const [pin, setPin] = useState(article.isPinned)

  useEffect(() => {
    setPin(article.isPinned)
  }, [])

  const handlePin = useCallback(() => {
    const action = !pin
      ? pinPost({ id: article.id, communityId: article.originalCommunity.id })
      : undoPinPost({ id: article.id, communityId: article.originalCommunity.id })

    action.then((result) => {
      if (result.error) {
        toast('设置失败', 'error')
      } else {
        toast('设置完成')
        setPin(!pin)
        updateViewingArticle({ id: article.id, isPinned: !pin })
      }
    })
  }, [pin, article, pinPost, undoPinPost])

  return (
    <MenuItem onClick={handlePin}>
      {pin ? <Icon.UnPin /> : <Icon.Pin />}
      {pin ? '取消置顶' : '置顶'}
      <SpaceGrow />
      {result.fetching && <Icon.Spin />}
    </MenuItem>
  )
}

export default observer(PinItem)
