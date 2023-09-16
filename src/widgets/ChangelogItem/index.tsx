import { FC, memo, Fragment } from 'react'

import type { TChangelogLayout, TChangelog } from '@/spec'
import { CHANGELOG_LAYOUT } from '@/constant/layout'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

// import OutlineLayout from './OutlineLayout'

type TProps = {
  layout: TChangelogLayout
  article: TChangelog
}

const ChangelogItem: FC<TProps> = ({ layout, article }) => {
  return (
    <Fragment>
      {layout === CHANGELOG_LAYOUT.CLASSIC && <ClassicLayout article={article} />}
      {layout === CHANGELOG_LAYOUT.SIMPLE && <SimpleLayout article={article} />}
    </Fragment>
  )
}

export default memo(ChangelogItem)
