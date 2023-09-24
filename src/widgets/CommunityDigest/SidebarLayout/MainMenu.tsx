import { FC } from 'react'
import { observer } from 'mobx-react'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePublicThreads from '@/hooks/usePublicThreads'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import useViewingThread from '@/hooks/useViewingThread'
import useHeaderLinks from '@/hooks/useHeaderLinks'

import ExtraLinks from '@/widgets/ExtraLinks'

import ThreadIcon from './ThreadIcon'

import { Wrapper, MenuItem, MenuTitle } from '../styles/sidebar_layout/main_menu'

const MainMenu: FC = () => {
  const community = useViewingCommunity()
  const primaryColor = usePrimaryColor()
  const communityPath = community?.slug

  const publicThreads = usePublicThreads()
  const activeThread = useViewingThread()

  const { extraLinks } = useHeaderLinks()

  return (
    <Wrapper>
      {publicThreads.map((thread) => {
        const active = activeThread === thread.slug

        return (
          <MenuItem key={thread.slug} href={`/${communityPath}/${thread.slug}`} $active={active}>
            <ThreadIcon thread={thread.slug} $active={active} />
            <MenuTitle $active={active} primaryColor={primaryColor}>
              {thread.title}
            </MenuTitle>
          </MenuItem>
        )
      })}

      <ExtraLinks links={extraLinks} activePath={activeThread} />
    </Wrapper>
  )
}

export default observer(MainMenu)
