import { FC, memo } from 'react'

import type { TCommunityThread } from '@/spec'

import Button from '@/widgets/Buttons/Button'

import { Wrapper, Hint, CatsWrapper } from '../styles/tags/thread_selector'
import { edit, reloadArticleTags } from '../logic'

type TProps = {
  threads: TCommunityThread[]
  active: string
}

const ThreadSelector: FC<TProps> = ({ threads, active }) => {
  return (
    <Wrapper>
      <Hint>社区板块:</Hint>
      <CatsWrapper>
        {threads.map((thread) => (
          <Button
            key={thread.raw}
            ghost={thread.raw !== active}
            size="small"
            noBorder={thread.raw !== active}
            onClick={() => {
              edit(thread.raw, 'activeTagThread')
              reloadArticleTags()
            }}
            space={10}
          >
            {thread.title}
          </Button>
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(ThreadSelector)
