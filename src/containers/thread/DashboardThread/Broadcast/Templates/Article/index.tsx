import { useState } from 'react'

import { BROADCAST_ARTICLE_LAYOUT } from '@/const/layout'

import Simple from './Simple'
import Default from './Default'

import useBroadcast from '../../../logic/useBroadcast'
import {
  Wrapper,
  ArrowIcon,
  ToggleButton,
  ToggleText,
} from '../../../styles/broadcast/templates/article'

export default () => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const { broadcastArticleLayout } = useBroadcast()

  return (
    <Wrapper>
      {showAll ? (
        <>
          <Default onSelect={() => setShowAll(false)} />
          <Simple onSelect={() => setShowAll(false)} />
        </>
      ) : (
        <>
          {broadcastArticleLayout === BROADCAST_ARTICLE_LAYOUT.DEFAULT && <Default />}
          {broadcastArticleLayout === BROADCAST_ARTICLE_LAYOUT.SIMPLE && <Simple />}
        </>
      )}
      <ToggleButton size="small" ghost noBorder onClick={() => setShowAll(!showAll)}>
        <ToggleText>
          {showAll ? '收起' : '更换模板'}
          {/* @ts-ignore */}
          <ArrowIcon rotate={showAll} />
        </ToggleText>
      </ToggleButton>
    </Wrapper>
  )
}
