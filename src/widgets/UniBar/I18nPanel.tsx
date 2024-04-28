import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useLoadI18n from '@/hooks/useLoadI18n'
import useTrans from '@/hooks/useTrans'

import { SpaceGrow } from '@/widgets/Common'

import { Wrapper, MenuBar, Icon } from './styles/i18n_panel'

const I18nPanel: FC = () => {
  const { inView: badgeInView } = useCommunityDigestViewport()

  const { loadLocale } = useLoadI18n()
  const { t } = useTrans()

  return (
    <Wrapper>
      <h2>{t('post')}</h2>

      <MenuBar $withTop={!badgeInView} onClick={() => loadLocale('en')}>
        <Icon.Guard />
        English
      </MenuBar>

      <MenuBar $withTop={!badgeInView} $active onClick={() => loadLocale('zh')}>
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
