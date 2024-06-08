/*
 *
 * TagsBar
 *
 */

import type { FC } from 'react'

import VIEW from '@/const/view'

import DesktopView from './DesktopView/index'

export type TProps = {
  view?: string
  onSelect: () => void
}

const TagsBar: FC<TProps> = (props) => {
  const { view } = props

  switch (view) {
    case VIEW.MOBILE: {
      // TODO:
      return <DesktopView {...props} />
    }

    // case VIEW.COMMUNITY_CARD: {
    //   return <DesktopView {...props} />
    // }

    default: {
      return <DesktopView {...props} />
    }
  }
}

export default TagsBar
