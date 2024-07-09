import type { FC } from 'react'

import { BROADCAST_ARTICLE_LAYOUT } from '~/const/layout'
import ArticleBroadcast from '~/widgets/ArticleBroadcast'

import useBroadcast from '../../../logic/useBroadcast'
import { Wrapper, Shrink } from '../../../styles/broadcast/templates/article/default'

type TProps = {
  onSelect?: () => void
}

const Default: FC<TProps> = ({ onSelect = null }) => {
  const { broadcastArticleLayout, broadcastArticleBg, edit } = useBroadcast()
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

export default Default
