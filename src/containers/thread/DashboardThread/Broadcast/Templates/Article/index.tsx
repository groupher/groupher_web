import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { BROADCAST_ARTICLE_LAYOUT } from '@/constant/layout'

import Simple from './Simple'
import Default from './Default'

import useBroadcastInfo from '../../../hooks/useBroadcastInfo'
import {
  Wrapper,
  ArrowIcon,
  ToggleButton,
  ToggleText,
} from '../../../styles/broadcast/templates/article'

const Templates: FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const { broadcastArticleLayout } = useBroadcastInfo()

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

export default observer(Templates)
