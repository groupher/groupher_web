import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BROADCAST_ARTICLE_LAYOUT } from '@/constant/layout'
import ArticleBroadcast from '@/widgets/ArticleBroadcast'

import useBroadcastInfo from '../../../hooks/useBroadcastInfo'
import { Wrapper, Shrink } from '../../../styles/broadcast/templates/article/default'
import { edit } from '../../../logic'

type TProps = {
  onSelect?: () => void
}

const Default: FC<TProps> = ({ onSelect = null }) => {
  const { broadcastArticleLayout, broadcastArticleBg } = useBroadcastInfo()
  const $active = broadcastArticleLayout === BROADCAST_ARTICLE_LAYOUT.DEFAULT

  return (
    <Wrapper
      $active={$active}
      onClick={() => {
        edit(BROADCAST_ARTICLE_LAYOUT.DEFAULT, 'broadcastArticleLayout')
        onSelect?.()
      }}
    >
      <Shrink>
        <ArticleBroadcast color={broadcastArticleBg} />
      </Shrink>
    </Wrapper>
  )
}

export default observer(Default)
