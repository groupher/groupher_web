import { type FC, Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import type { TChangelog } from '@/spec'
import { CHANGELOG_LAYOUT } from '@/const/layout'
import useLayout from '@/hooks/useLayout'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'
// import OutlineLayout from './OutlineLayout'

type TProps = {
  article: TChangelog
}

const ChangelogItem: FC<TProps> = ({ article }) => {
  const { changelogLayout } = useLayout()

  return (
    <Fragment>
      {/* <OutlineLayout article={article} /> */}
      {changelogLayout === CHANGELOG_LAYOUT.CLASSIC && <ClassicLayout article={article} />}
      {changelogLayout === CHANGELOG_LAYOUT.SIMPLE && <SimpleLayout article={article} />}
    </Fragment>
  )
}

export default observer(ChangelogItem)
