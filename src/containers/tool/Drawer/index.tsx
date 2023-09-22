/*
 *
 * Preview
 *
 */

import { FC } from 'react'

import type { TMetric } from '@/spec'
import { buildLog } from '@/logger'
import { bond } from '@/mobx'
import useWindowResize from '@/hooks/useWindowResize'
import useShortcut from '@/hooks/useShortcut'

import type { TStore } from './store'

import Viewer from './Viewer'
import Content from './Content'

import { useInit, closeDrawer } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:Preview')

type TProps = {
  drawer: TStore
  metric: TMetric
}

const DrawerContainer: FC<TProps> = ({ drawer: store, metric }) => {
  const { width: windowWidth } = useWindowResize()
  useInit(store, windowWidth, metric)
  useShortcut('Escape', closeDrawer)

  const {
    slideVisible,
    type,
    attUserData,
    userListerType,
    mmType,
    extraInfo,
    rightOffset,
    fromContentEdge,
    optionsData,
    canBeClose,
    headerText,
    showHeaderText,
    disableContentDrag,
    articleNavi,
  } = store

  return (
    <Viewer
      headerText={headerText}
      options={optionsData}
      visible={slideVisible}
      rightOffset={rightOffset}
      fromContentEdge={fromContentEdge}
      type={type}
      canBeClose={canBeClose}
      showHeaderText={showHeaderText}
      disableContentDrag={disableContentDrag}
      articleNavi={articleNavi}
    >
      <Content
        type={type}
        visible={slideVisible}
        options={optionsData}
        attUser={attUserData}
        userListerType={userListerType}
        mmType={mmType}
        extraInfo={extraInfo}
      />
    </Viewer>
  )
}

export default bond(DrawerContainer, 'drawer')
