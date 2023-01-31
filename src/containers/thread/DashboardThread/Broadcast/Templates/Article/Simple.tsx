import { FC } from 'react'

import { BROADCAST_ARTICLE_LAYOUT } from '@/constant/layout'
import ArticleBroadcast from '@/widgets/ArticleBroadcast'

import type { TBroadcastSettings } from '../../../spec'

import { Wrapper, Shrink } from '../../../styles/broadcast/templates/article/default'
import { edit } from '../../../logic'

type TProps = {
  settings: TBroadcastSettings
  onSelect?: () => void | null
}

const Center: FC<TProps> = ({ settings, onSelect = null }) => {
  const { broadcastArticleLayout, broadcastArticleBg } = settings
  const $active = broadcastArticleLayout === BROADCAST_ARTICLE_LAYOUT.SIMPLE

  return (
    <Wrapper
      $active={$active}
      onClick={() => {
        edit(BROADCAST_ARTICLE_LAYOUT.SIMPLE, 'broadcastArticleLayout')
        onSelect?.()
      }}
    >
      <Shrink>
        <ArticleBroadcast color={broadcastArticleBg} simple />
      </Shrink>
    </Wrapper>
  )
}

export default Center
