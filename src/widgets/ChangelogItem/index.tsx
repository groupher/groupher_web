import { FC, memo, Fragment } from 'react'

import type { TAvatarLayout, TChangelogLayout } from '@/spec'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

// import OutlineLayout from './OutlineLayout'

type TProps = {
  layout: TChangelogLayout
  showFullArticle?: boolean
  avatarLayout: TAvatarLayout
}

const ChangelogItem: FC<TProps> = ({ layout, showFullArticle = false, avatarLayout }) => {
  // if (showFullArticle && layout === CHANGELOG_LAYOUT.OUTLINE) {
  //   return <PreviewLayout showFullArticle />
  // }

  return (
    <Fragment>
      {/* <ClassicLayout avatarLayout={avatarLayout} /> */}
      <SimpleLayout avatarLayout={avatarLayout} />

      {/* {layout === CHANGELOG_LAYOUT.PREVIEW ? (
        <PreviewLayout />
      ) : (
        <OutlineLayout />
      )} */}
    </Fragment>
  )
}

export default memo(ChangelogItem)
