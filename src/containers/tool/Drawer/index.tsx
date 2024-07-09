/*
 * Preview
 */

import { useEffect } from 'react'

import useShortcut from '~/hooks/useShortcut'

import Viewer from './Viewer'
import Content from './Content'

import useLogic from './useLogic'

const Drwawer = () => {
  const {
    initPubSub,
    visible,
    type,
    options,
    headerText,
    canBeClose,
    showHeaderText,
    disableContentDrag,
    closeDrawer,
  } = useLogic()

  useEffect(() => {
    initPubSub()
  }, [])

  // const store = useStore()
  // const metric = useMetric()

  // const { width: windowWidth } = useWindowResize()

  // useInit(store, windowWidth, metric)
  useShortcut('Escape', closeDrawer)

  return (
    <Viewer
      headerText={headerText}
      options={options}
      visible={visible}
      type={type}
      canBeClose={canBeClose}
      showHeaderText={showHeaderText}
      disableContentDrag={disableContentDrag}
    >
      <Content type={type} visible={visible} options={options} />
    </Viewer>
  )
}

export default Drwawer
