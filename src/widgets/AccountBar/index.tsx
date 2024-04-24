/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-no-comment-textnodes */
/*
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'

import { scrollToHeader } from '@/dom'
import ThemeSwitch from '@/widgets/ThemeSwitch'

import { Wrapper, ICON, IconBox, PeopleBox, TopBox } from './styles'

const _log = buildLog('c:AccountBar:index')

type TProps = {
  testid?: string
}

const AccountBar: FC<TProps> = ({ testid = 'account-bar' }) => {
  const { inView: badgeInView } = useCommunityDigestViewport()

  console.log('## badgeInView: ', badgeInView)

  return (
    <Wrapper>
      <TopBox $show={!badgeInView} onClick={() => scrollToHeader()}>
        <ICON.ArrowTop />
      </TopBox>

      <IconBox>
        <ICON.Notify />
      </IconBox>
      <PeopleBox>
        <ICON.People />
      </PeopleBox>
      <IconBox>
        <ICON.Share />
      </IconBox>
      <IconBox>
        <ThemeSwitch />
      </IconBox>
      <IconBox>
        <ICON.More />
      </IconBox>
    </Wrapper>
  )
}

export default observer(AccountBar)
