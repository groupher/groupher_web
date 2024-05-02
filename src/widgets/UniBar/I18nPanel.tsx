import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useChangeI18n from '@/hooks/useChangeI18n'

import { LOCALE } from '@/constant/i18n'
import { SpaceGrow } from '@/widgets/Common'

import { Wrapper, MenuBar, Icon } from './styles/i18n_panel'

const I18nPanel: FC = () => {
  const { inView: badgeInView } = useCommunityDigestViewport()
  const { locale, changeLocale } = useChangeI18n()

  return (
    <Wrapper>
      <MenuBar
        $withTop={!badgeInView}
        $active={locale === LOCALE.EN}
        onClick={() => changeLocale(LOCALE.EN)}
      >
        <Icon.Guard />
        English
        <SpaceGrow />
        {LOCALE.EN === locale && <Icon.Check />}
      </MenuBar>

      <MenuBar
        $withTop={!badgeInView}
        $active={locale === LOCALE.ZH}
        onClick={() => changeLocale(LOCALE.ZH)}
      >
        <Icon.Panda />
        简体中文
        <SpaceGrow />
        {LOCALE.ZH === locale && <Icon.Check />}
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
