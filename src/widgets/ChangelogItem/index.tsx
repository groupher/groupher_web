import { FC, Fragment } from 'react'
import { observer } from 'mobx-react'

import type { TChangelog } from '@/spec'
import { CHANGELOG_LAYOUT } from '@/constant/layout'
import useChangelogLayout from '@/hooks/useChangelogLayout'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

// import OutlineLayout from './OutlineLayout'

type TProps = {
  article: TChangelog
}

const ChangelogItem: FC<TProps> = ({ article }) => {
  const changelogLayout = useChangelogLayout()

  return (
    <Fragment>
      {changelogLayout === CHANGELOG_LAYOUT.CLASSIC && <ClassicLayout article={article} />}
      {changelogLayout === CHANGELOG_LAYOUT.SIMPLE && <SimpleLayout article={article} />}
    </Fragment>
  )
}

export default observer(ChangelogItem)
