import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'

import { SpaceGrow } from '@/widgets/Common'
import { Wrapper, MenuBar, Icon } from './styles/i18n_panel'

const I18nPanel: FC = () => {
  const { inView: badgeInView } = useCommunityDigestViewport()

  return (
    <Wrapper>
      <MenuBar $withTop={!badgeInView}>
        <Icon.Guard />
        English
      </MenuBar>

      <MenuBar $withTop={!badgeInView} $active>
        <Icon.Panda />
        简体中文
        <SpaceGrow />
        <Icon.Check />
      </MenuBar>

      <MenuBar $withTop={!badgeInView}>
        <Icon.Hua />
        繁体中文
      </MenuBar>

      <MenuBar $withTop={!badgeInView}>
        <Icon.Russia />
        Русский
      </MenuBar>

      <MenuBar $withTop={!badgeInView}>
        <Icon.Spain />
        Español
      </MenuBar>
    </Wrapper>
  )
}

export default observer(I18nPanel)
