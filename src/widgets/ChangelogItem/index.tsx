import { FC, memo, Fragment } from 'react'

import type { TAvatarLayout, TChangelogLayout, TChangelog } from '@/spec'
import { CHANGELOG_LAYOUT } from '@/constant/layout'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

// import OutlineLayout from './OutlineLayout'

type TProps = {
  layout: TChangelogLayout
  avatarLayout: TAvatarLayout
  article: TChangelog
}

const ChangelogItem: FC<TProps> = ({ layout, avatarLayout, article }) => {
  return (
    <Fragment>
      {layout === CHANGELOG_LAYOUT.CLASSIC && (
        <ClassicLayout avatarLayout={avatarLayout} article={article} />
      )}
      {layout === CHANGELOG_LAYOUT.SIMPLE && (
        <SimpleLayout avatarLayout={avatarLayout} article={article} />
      )}
    </Fragment>
  )
}

export default memo(ChangelogItem)
