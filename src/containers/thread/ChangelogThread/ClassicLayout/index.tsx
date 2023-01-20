/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'

import type { TGlobalLayout } from '@/spec'
import ChangelogItem from '@/widgets/ChangelogItem'

import type { TTagsMode } from '../spec'
import Sidebar from './Sidebar'

import { Wrapper, MainWrapper } from '../styles/classic_layout'

// const log = buildLog('C:ChangelogThread')

type TProps = {
  globalLayout: TGlobalLayout
  tagsMode: TTagsMode
}

const ClassicLayout: FC<TProps> = ({ globalLayout, tagsMode }) => {
  return (
    <Wrapper>
      <MainWrapper>
        <ChangelogItem layout={globalLayout.changelog} showFullArticle />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
      </MainWrapper>
      <Sidebar tagsMode={tagsMode} />
    </Wrapper>
  )
}

export default ClassicLayout
