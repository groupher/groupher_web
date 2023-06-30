/*
 *
 * MailsViewer
 *
 */

import React from 'react'

import { ICON_CMD } from '@/config'
import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import TabSelector from '@/widgets/TabSelector'
import MailLists from './MailLists'

import { useInit, selectChange } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:MailsViewer')

const mailTabs = [
  {
    title: '提及',
    slug: 'mentions',
    count: 0,
    icon: `${ICON_CMD}/mail_mention.svg`,
  },
  {
    title: '关注',
    slug: 'notifications',
    count: 0,
    icon: `${ICON_CMD}/mail_watching.svg`,
  },
  {
    title: '消息',
    slug: 'sys_notifications',
    count: 0,
    icon: `${ICON_CMD}/mail_notification.svg`,
  },
]

const MailsViewerContainer = ({ mailsViewer: store }) => {
  useInit(store)

  const { activeRaw, pagedMentionsData, readState } = store

  return (
    <div>
      <TabSelector source={mailTabs} activeRaw={activeRaw} onChange={selectChange} />

      <MailLists activeRaw={activeRaw} pagedMentions={pagedMentionsData} readState={readState} />
    </div>
  )
}

export default bond(MailsViewerContainer, 'mailsViewer')
