/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-no-comment-textnodes */
/*
 */

import { FC, useState, useRef, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import useOutsideClick from '@/hooks/useOutsideClick'
import useTrans from '@/hooks/useTrans'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'

import { scrollToHeader } from '@/dom'

import ThemeSwitch from '@/widgets/ThemeSwitch'
import Tooltip from '@/widgets/Tooltip'

import I18nPanel from './I18nPanel'
import MorePanel from './MorePanel'
import NotifyPanel from './NotifyPanel'

import { MENU, TIP_OPTIONS } from './constant'
import { Wrapper, ButtonBar, Icon, IconBox, TipText, PeopleBox, TopBox } from './styles'

const _log = buildLog('c:AccountBar:index')

const AccountBar: FC = () => {
  const ref = useRef(null)
  const { inView: badgeInView } = useCommunityDigestViewport()
  const { t } = useTrans()

  const [expand, setExpand] = useState(false)
  const [menu, setMenu] = useState(MENU.DEFAULT.key)
  /**
   * this forceHidden is for avoid tooltip been cut from the Wrapper settings
   * also make sure the pop animateion as not shadows from the bottom
   */
  const [forceHidden, setForceHidden] = useState(false)

  useOutsideClick(ref, () => {
    setExpand(false)
    setMenu(MENU.DEFAULT.key)
  })

  const handleOpenMenu = useCallback((menuKey: string) => {
    setForceHidden(true)
    setMenu(menuKey)

    setTimeout(() => setExpand(true))
    setTimeout(() => setForceHidden(false), 180)
  }, [])

  return (
    <Wrapper
      ref={ref}
      $expand={expand}
      $withTop={!badgeInView}
      $menuHeight={MENU[menu].height}
      $forceHidden={forceHidden}
    >
      {menu === MENU.I18N.key && <I18nPanel />}
      {menu === MENU.MORE.key && <MorePanel />}
      {menu === MENU.NOTIFY.key && <NotifyPanel />}

      <ButtonBar>
        <Tooltip content={<TipText>{t('to.top')}</TipText>} {...TIP_OPTIONS}>
          <TopBox $show={!badgeInView} onClick={() => scrollToHeader()}>
            <Icon.ArrowTop />
          </TopBox>
        </Tooltip>

        <Tooltip content={<TipText>{t('mention.msg')}</TipText>} {...TIP_OPTIONS}>
          <IconBox
            $active={menu === MENU.NOTIFY.key}
            onClick={() => {
              setMenu(MENU.NOTIFY.key)
              setExpand(true)
            }}
          >
            <Icon.Notify />
          </IconBox>
        </Tooltip>

        <Tooltip content={<TipText>{t('active.users')}</TipText>} {...TIP_OPTIONS}>
          <PeopleBox
            $active={menu === MENU.PEOPLE.key}
            onClick={() => handleOpenMenu(MENU.PEOPLE.key)}
          >
            <Icon.People $active={menu === MENU.PEOPLE.key} />
          </PeopleBox>
        </Tooltip>
        <Tooltip content={<TipText>{t('locale')}</TipText>} {...TIP_OPTIONS}>
          <IconBox onClick={() => handleOpenMenu(MENU.I18N.key)}>
            <Icon.I18n />
          </IconBox>
        </Tooltip>
        <Tooltip content={<TipText>{t('theme')}</TipText>} {...TIP_OPTIONS}>
          <IconBox>
            <ThemeSwitch />
          </IconBox>
        </Tooltip>
        <Tooltip content={<TipText>{t('more')}</TipText>} {...TIP_OPTIONS}>
          <IconBox $active={menu === MENU.MORE.key} onClick={() => handleOpenMenu(MENU.MORE.key)}>
            <Icon.More />
          </IconBox>
        </Tooltip>
      </ButtonBar>
    </Wrapper>
  )
}

export default observer(AccountBar)
