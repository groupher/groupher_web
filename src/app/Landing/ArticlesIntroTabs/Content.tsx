import { FC, memo } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'
import useMetric from '@/hooks/useMetric'

import DiscussTab from './DiscussTab'
import ChangelogTab from './ChangelogTab'
import KanbanTab from './KanbanTab'
import HelpTab from './HelpTab'

import { Wrapper, InnerWrapper } from '../styles/articles_intro_tabs/content'

type TProps = {
  tab: TThread
}

/** NOTE: do not use switch case here, otherwise the page will blink when switch between, image will re-request */
const Content: FC<TProps> = ({ tab }) => {
  const metric = useMetric()

  return (
    <Wrapper metric={metric}>
      <InnerWrapper tab={tab} metric={metric}>
        <DiscussTab $active={tab === THREAD.POST} />
        <KanbanTab $active={tab === THREAD.KANBAN} />
        <ChangelogTab $active={tab === THREAD.CHANGELOG} />
        <HelpTab $active={tab === THREAD.DOC} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(Content)
