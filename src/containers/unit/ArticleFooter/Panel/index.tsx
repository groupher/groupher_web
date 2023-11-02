/*
 *
 * AuthorInfo
 *
 */

import { FC, memo, useState } from 'react'

import type { TAccount, TArticle } from '@/spec'
import { buildLog } from '@/logger'

import Tabs from '@/widgets/Switcher/Tabs'

import Activities from './Activities'
import Members from './Members'

import { TAB_ITEMS, TAB_ACTIVITIES, TAB_MEMBERS } from '../constant'
import { Wrapper, TabsWrapper, ContentWrapper } from '../styles/panel'

// import { onFollow, undoFollow } from '../logic'

/* eslint-disable-next-line */
const log = buildLog('w:AuthorInfo:index')

type TProps = {
  testid?: string
  author: TAccount
  article: TArticle
}

const Panel: FC<TProps> = ({ testid = 'author-info', author, article }) => {
  const [tab, setTab] = useState(TAB_ACTIVITIES)

  return (
    <Wrapper testid={testid}>
      <TabsWrapper>
        <Tabs
          items={TAB_ITEMS}
          size="small"
          activeKey={tab}
          bottomSpace={5}
          onChange={(tab) => setTab(tab)}
        />
      </TabsWrapper>
      <ContentWrapper>
        {tab === TAB_ACTIVITIES && <Activities />}
        {tab === TAB_MEMBERS && <Members article={article} />}
      </ContentWrapper>
    </Wrapper>
  )
}

export default memo(Panel)
