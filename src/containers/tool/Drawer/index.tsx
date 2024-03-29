/*
 *
 * Preview
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import useWindowResize from '@/hooks/useWindowResize'
import useShortcut from '@/hooks/useShortcut'
import useMetric from '@/hooks/useMetric'

import { useStore } from './store'

import Viewer from './Viewer'
import Content from './Content'

import { useInit, closeDrawer } from './logic'

const _log = buildLog('C:Preview')

const Drawer: FC = () => {
  const store = useStore()
  const metric = useMetric()

  const { width: windowWidth } = useWindowResize()

  useInit(store, windowWidth, metric)
  useShortcut('Escape', closeDrawer)

  const {
    slideVisible,
    visible,
    type,
    mmType,
    extraInfo,
    optionsData,
    canBeClose,
    headerText,
    showHeaderText,
    disableContentDrag,
  } = store

  return (
    <Viewer
      headerText={headerText}
      options={optionsData}
      visible={slideVisible}
      type={type}
      canBeClose={canBeClose}
      showHeaderText={showHeaderText}
      disableContentDrag={disableContentDrag}
    >
      <Content
        type={type}
        visible={slideVisible}
        options={optionsData}
        mmType={mmType}
        extraInfo={extraInfo}
      />
    </Viewer>
  )
}

export default observer(Drawer)
