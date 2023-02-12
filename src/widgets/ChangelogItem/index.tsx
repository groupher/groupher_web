import { FC, memo, Fragment } from 'react'

import type { TAvatarLayout, TChangelogLayout } from '@/spec'
import { CHANGELOG_LAYOUT } from '@/constant/layout'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

// import OutlineLayout from './OutlineLayout'

type TProps = {
  layout: TChangelogLayout
  avatarLayout: TAvatarLayout
}

const ChangelogItem: FC<TProps> = ({ layout, avatarLayout }) => {
  return (
    <Fragment>
      {layout === CHANGELOG_LAYOUT.SIMPLE && <SimpleLayout avatarLayout={avatarLayout} />}
      {layout === CHANGELOG_LAYOUT.CLASSIC && <ClassicLayout avatarLayout={avatarLayout} />}
    </Fragment>
  )
}

export default memo(ChangelogItem)
