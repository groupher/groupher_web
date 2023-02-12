/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'

import type { TGlobalLayout, TAvatarLayout } from '@/spec'
import ChangelogItem from '@/widgets/ChangelogItem'

import type { TTagsMode } from '../spec'
import Sidebar from './Sidebar'

import { Wrapper, MainWrapper } from '../styles/classic_layout'

// const log = buildLog('C:ChangelogThread')

type TProps = {
  globalLayout: TGlobalLayout
  tagsMode: TTagsMode
  avatarLayout: TAvatarLayout
}

const ClassicLayout: FC<TProps> = ({ globalLayout, tagsMode, avatarLayout }) => {
  return (
    <Wrapper>
      <MainWrapper>
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
        <ChangelogItem layout={globalLayout.changelog} avatarLayout={avatarLayout} />
      </MainWrapper>
      <Sidebar tagsMode={tagsMode} />
    </Wrapper>
  )
}

export default ClassicLayout
