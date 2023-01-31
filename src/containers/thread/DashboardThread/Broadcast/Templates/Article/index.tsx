import { FC, useState } from 'react'

import { BROADCAST_ARTICLE_LAYOUT } from '@/constant/layout'

import type { TBroadcastSettings } from '../../../spec'

import Simple from './Simple'
import Default from './Default'

import {
  Wrapper,
  ArrowIcon,
  ToggleButton,
  ToggleText,
} from '../../../styles/broadcast/templates/article'

type TProps = {
  settings: TBroadcastSettings
}

const Templates: FC<TProps> = ({ settings }) => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const { broadcastArticleLayout } = settings

  return (
    <Wrapper>
      {showAll ? (
        <>
          <Default settings={settings} onSelect={() => setShowAll(false)} />
          <Simple settings={settings} onSelect={() => setShowAll(false)} />
        </>
      ) : (
        <>
          {broadcastArticleLayout === BROADCAST_ARTICLE_LAYOUT.DEFAULT && (
            <Default settings={settings} />
          )}
          {broadcastArticleLayout === BROADCAST_ARTICLE_LAYOUT.SIMPLE && (
            <Simple settings={settings} />
          )}
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

export default Templates
