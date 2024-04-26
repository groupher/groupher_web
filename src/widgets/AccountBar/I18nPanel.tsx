import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'

import { SpaceGrow } from '@/widgets/Common'
import { Wrapper, MenuBar, ICON } from './styles/i18n_panel'

const I18nPanel: FC = () => {
  const { inView: badgeInView } = useCommunityDigestViewport()

  return (
    <Wrapper>
      <MenuBar $withTop={!badgeInView}>
        <ICON.Guard />
        English
      </MenuBar>

      <MenuBar $withTop={!badgeInView} $active>
        <ICON.Panda />
        简体中文
        <SpaceGrow />
        <ICON.Check />
      </MenuBar>

      <MenuBar $withTop={!badgeInView}>
        <ICON.Hua />
        繁体中文
      </MenuBar>

      <MenuBar $withTop={!badgeInView}>
        <ICON.Taowa />
        Русский
      </MenuBar>

      <MenuBar $withTop={!badgeInView}>
        <ICON.Spain />
        Español
      </MenuBar>
    </Wrapper>
  )
}

export default observer(I18nPanel)
