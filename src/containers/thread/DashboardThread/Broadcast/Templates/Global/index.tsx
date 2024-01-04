import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { BROADCAST_LAYOUT } from '@/constant/layout'

import Center from './Center'
import Default from './Default'

import useBroadcastInfo from '../../../hooks/useBroadcastInfo'
import {
  Wrapper,
  ArrowIcon,
  ToggleButton,
  ToggleText,
} from '../../../styles/broadcast/templates/global'

const Templates: FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const { broadcastLayout } = useBroadcastInfo()

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

export default observer(Templates)
