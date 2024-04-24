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
import { MENU } from './constant'
import { Wrapper, ButtonBar, ICON, IconBox, PeopleBox, TopBox } from './styles'

const _log = buildLog('c:AccountBar:index')

const AccountBar: FC = () => {
  const ref = useRef(null)
  const { inView: badgeInView } = useCommunityDigestViewport()
  const [expand, setExpand] = useState(false)
  const [menu, setMenu] = useState(MENU.DEFAULT)

  useOutsideClick(ref, () => {
    setExpand(false)
    setMenu(MENU.DEFAULT)
  })

  return (
    <Wrapper ref={ref} $expand={expand} $withTop={!badgeInView}>
      {menu === MENU.MORE && <MorePanel />}

      <ButtonBar>
        <TopBox $show={!badgeInView} onClick={() => scrollToHeader()}>
          <ICON.ArrowTop />
        </TopBox>

        <IconBox>
          <ICON.Notify />
        </IconBox>

        <PeopleBox
          $active={menu === MENU.PEOPLE}
          onClick={() => {
            setMenu(MENU.PEOPLE)
            setExpand(true)
          }}
        >
          <ICON.People $active={menu === MENU.PEOPLE} />
        </PeopleBox>
        <IconBox>
          <ICON.Share />
        </IconBox>
        <IconBox>
          <ThemeSwitch />
        </IconBox>
        <IconBox
          $active={menu === MENU.MORE}
          onClick={() => {
            setMenu(MENU.MORE)
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
