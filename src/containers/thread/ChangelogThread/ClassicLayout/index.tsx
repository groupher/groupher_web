/* *
 * ChangelogThread
 *
 */

import type { FC } from 'react'

import usePagedChangelogs from '~/hooks/usePagedChangelogs'
import ChangelogItem from '~/widgets/ChangelogItem'

// import type { TTagsMode } from '../spec'
import Sidebar from './Sidebar'

import { Wrapper, MainWrapper } from '../styles/classic_layout'

const ClassicLayout: FC = () => {
  const { pagedChangelogs } = usePagedChangelogs()

  return (
    <Wrapper>
      <MainWrapper>
        {pagedChangelogs.entries.map((item) => (
          <ChangelogItem key={item.innerId} article={item} />
        ))}
      </MainWrapper>
      <Sidebar tagsMode="all" />
    </Wrapper>
  )
}

export default ClassicLayout
