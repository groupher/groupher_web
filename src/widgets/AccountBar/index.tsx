/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-no-comment-textnodes */
/*
 */

import { FC, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import useOutsideClick from '@/hooks/useOutsideClick'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'

import { scrollToHeader } from '@/dom'
import ThemeSwitch from '@/widgets/ThemeSwitch'

import MorePanel from './MorePanel'
import NotifyPanel from './NotifyPanel'

import { MENU } from './constant'
import { Wrapper, ButtonBar, ICON, IconBox, PeopleBox, TopBox } from './styles'

const _log = buildLog('c:AccountBar:index')

const AccountBar: FC = () => {
  const ref = useRef(null)
  const { inView: badgeInView } = useCommunityDigestViewport()
  const [expand, setExpand] = useState(false)
  const [menu, setMenu] = useState(MENU.DEFAULT.key)

  useOutsideClick(ref, () => {
    setExpand(false)
    setMenu(MENU.DEFAULT.key)
  })

  return (
    <Wrapper ref={ref} $expand={expand} $withTop={!badgeInView} $menuHeight={MENU[menu].height}>
      {menu === MENU.MORE.key && <MorePanel />}
      {menu === MENU.NOTIFY.key && <NotifyPanel />}

      <ButtonBar>
        <TopBox $show={!badgeInView} onClick={() => scrollToHeader()}>
          <ICON.ArrowTop />
        </TopBox>

        <IconBox
          $active={menu === MENU.NOTIFY.key}
          onClick={() => {
            setMenu(MENU.NOTIFY.key)
            setExpand(true)
          }}
        >
          <ICON.Notify />
        </IconBox>

        <PeopleBox
          $active={menu === MENU.PEOPLE.key}
          onClick={() => {
            setMenu(MENU.PEOPLE.key)
            setExpand(true)
          }}
        >
          <ICON.People $active={menu === MENU.PEOPLE.key} />
        </PeopleBox>
        <IconBox>
          <ICON.Share />
        </IconBox>
        <IconBox>
          <ThemeSwitch />
        </IconBox>
        <IconBox
          $active={menu === MENU.MORE.key}
          onClick={() => {
            setMenu(MENU.MORE.key)
            setExpand(true)
          }}
        >
          <ICON.More />
        </IconBox>
      </ButtonBar>
    </Wrapper>
  )
}

export default observer(AccountBar)
