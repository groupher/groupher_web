import type { TLocale } from '~/spec'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'
import useChangeI18n from '~/hooks/useChangeI18n'

import { LANGS_OPTIONS } from '~/const/i18n'
import { SpaceGrow } from '~/widgets/Common'

import { Wrapper, MenuBar, LangIconBox, CheckIcon } from './styles/i18n_panel'

export default () => {
  const { inView: badgeInView } = useCommunityDigestViewport()
  const { locale, changeLocale } = useChangeI18n()

  return (
    <Wrapper>
      {LANGS_OPTIONS.map((LANG) => {
        const Icon = LANG.icon

        return (
          <MenuBar
            key={LANG.value}
            $withTop={!badgeInView}
            $active={locale === LANG.value}
            onClick={() => changeLocale(LANG.value as TLocale)}
          >
            <LangIconBox>
              {/* @ts-ignore */}
              <Icon />
            </LangIconBox>
            {LANG.label}
            <SpaceGrow />
            {LANG.value === locale && <CheckIcon />}
          </MenuBar>
        )
      })}
    </Wrapper>
  )
}
