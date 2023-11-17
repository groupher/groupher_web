/*
 *
 * MailBox
 *
 */

import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'
import Tooltip from '@/widgets/Tooltip'

import MailsPanel from './MailsPanel'

import { useStore } from './store'
import { Wrapper, NotifyDot, HeaderMailIcon } from './styles'
import { useInit, visibleOnChange } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:MailBox')

const MailBox = () => {
  const store = useStore()
  useInit(store)

  const { activeRaw, mailStatusData, pagedMentionsData } = store

  return (
    <Tooltip
      content={
        <MailsPanel
          activeRaw={activeRaw}
          mailStatus={mailStatusData}
          pagedMentions={pagedMentionsData}
        />
      }
      hideOnClick={false}
      placement="bottom-start"
      trigger="click"
      onShow={visibleOnChange}
    >
      <Wrapper $testid="account-mailbox">
        <NotifyDot active={mailStatusData.hasMail} />
        <HeaderMailIcon />
      </Wrapper>
    </Tooltip>
  )
}

export default observer(MailBox)
