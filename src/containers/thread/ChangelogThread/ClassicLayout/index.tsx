/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'

import type { TGlobalLayout, TAvatarLayout, TPagedArticles } from '@/spec'
import ChangelogItem from '@/widgets/ChangelogItem'

import type { TTagsMode } from '../spec'
import Sidebar from './Sidebar'

import { Wrapper, MainWrapper } from '../styles/classic_layout'

// const log = buildLog('C:ChangelogThread')

type TProps = {
  globalLayout: TGlobalLayout
  tagsMode: TTagsMode
  avatarLayout: TAvatarLayout
  pagedChangelogs: TPagedArticles
}

const ClassicLayout: FC<TProps> = ({ globalLayout, tagsMode, avatarLayout, pagedChangelogs }) => {
  return (
    <Wrapper>
      <MainWrapper>
        {pagedChangelogs.entries.map((item) => (
          <ChangelogItem
            key={item.innerId}
            layout={globalLayout.changelog}
            avatarLayout={avatarLayout}
            article={item}
          />
        ))}
      </MainWrapper>
      <Sidebar tagsMode={tagsMode} />
    </Wrapper>
  )
}

export default ClassicLayout
