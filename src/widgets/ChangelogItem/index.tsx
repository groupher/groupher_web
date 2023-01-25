import { FC, memo, Fragment } from 'react'

import type { TAvatarLayout, TChangelogLayout } from '@/spec'

import PreviewLayout from './PreviewtLayout'
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
      <PreviewLayout avatarLayout={avatarLayout} showFullArticle />
      {/* {layout === CHANGELOG_LAYOUT.PREVIEW ? (
        <PreviewLayout />
      ) : (
        <OutlineLayout />
      )} */}
    </Fragment>
  )
}

export default memo(ChangelogItem)
