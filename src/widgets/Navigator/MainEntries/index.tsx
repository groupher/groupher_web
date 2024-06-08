import { Fragment } from 'react'

import DesktopView from './DesktopView'

const MainEntries = (props) => {
  return (
    <Fragment>
      <DesktopView {...props} />
    </Fragment>
  )
}

export default MainEntries
