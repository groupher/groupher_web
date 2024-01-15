import { Fragment } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'

const MainEntries = (props) => {
  const { isMobile } = useMobileDetect()

  return (
    <Fragment>
      <DesktopView {...props} />
    </Fragment>
  )
}

export default MainEntries
