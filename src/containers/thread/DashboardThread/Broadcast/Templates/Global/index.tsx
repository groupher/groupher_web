import { useState } from 'react'

import { BROADCAST_LAYOUT } from '@/const/layout'

import Center from './Center'
import Default from './Default'

import useBroadcast from '../../../logic/useBroadcast'
import {
  Wrapper,
  ArrowIcon,
  ToggleButton,
  ToggleText,
} from '../../../styles/broadcast/templates/global'

export default () => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const { broadcastLayout } = useBroadcast()

  return (
    <Wrapper>
      {showAll ? (
        <>
          <Center onSelect={() => setShowAll(false)} />
          <Default onSelect={() => setShowAll(false)} />
        </>
      ) : (
        <>
          {broadcastLayout === BROADCAST_LAYOUT.CENTER && <Center />}
          {broadcastLayout === BROADCAST_LAYOUT.DEFAULT && <Default />}
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
