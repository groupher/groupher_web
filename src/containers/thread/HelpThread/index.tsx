/* *
 * HelpThread
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { HELP_LAYOUT } from '@/constant'
import { bond } from '@/utils/mobx'

import type { TStore } from './store'

import HelpCenterLayout from './HelpCenterLayout'
import FullLayout from './FullLayout'
import FaqLayout from './FaqLayout'
import ArticleLayout from './ArticleLayout'

import { Wrapper } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:HelpThread')

type TProps = {
  helpThread?: TStore
  testid?: string
  title?: string
  desc?: string
}

const HelpThreadContainer: FC<TProps> = ({
  helpThread: store,
  testid = 'help-thread',
  title = 'title',
  desc = 'desc',
}) => {
  useInit(store)
  const { mode } = store

  return (
    <Wrapper testid={testid}>
      {mode === HELP_LAYOUT.FULL && <FullLayout />}
      {mode === HELP_LAYOUT.FAQ && <FaqLayout />}
      {mode === HELP_LAYOUT.HELPCENTER && <HelpCenterLayout />}
      {mode === HELP_LAYOUT.ARTICLE && <ArticleLayout />}
    </Wrapper>
  )
}

export default bond(HelpThreadContainer, 'helpThread') as FC<TProps>
