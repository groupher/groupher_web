import { FC, useState } from 'react'

import { BROADCAST_LAYOUT } from '@/constant/layout'

import type { TBroadcastSettings } from '../../../spec'

import Center from './Center'
import Default from './Default'

import {
  Wrapper,
  ArrowIcon,
  ToggleButton,
  ToggleText,
} from '../../../styles/broadcast/templates/global'

type TProps = {
  settings: TBroadcastSettings
}

const Templates: FC<TProps> = ({ settings }) => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const { broadcastLayout } = settings

  return (
    <Wrapper>
      {showAll ? (
        <>
          <Center settings={settings} onSelect={() => setShowAll(false)} />
          <Default settings={settings} onSelect={() => setShowAll(false)} />
        </>
      ) : (
        <>
          {broadcastLayout === BROADCAST_LAYOUT.CENTER && <Center settings={settings} />}
          {broadcastLayout === BROADCAST_LAYOUT.DEFAULT && <Default settings={settings} />}
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
