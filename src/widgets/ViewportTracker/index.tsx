// avold SSR to save first load build size
import { FC } from 'react'

import { Waypoint } from 'react-waypoint'

type TProps = {
  /**
   * Function called when waypoint enters viewport
   */
  onEnter: () => void
  /**
   * Function called when waypoint leaves viewport
   */
  onLeave?: () => void
  /**
   * Whether to activate on horizontal scrolling instead of vertical
   */
  horizontal?: boolean
  topOffset?: string | number
  bottomOffset?: string | number
}

const ViewportTracker: FC<TProps> = (props) => {
  return <Waypoint {...props} />
}

export default ViewportTracker
