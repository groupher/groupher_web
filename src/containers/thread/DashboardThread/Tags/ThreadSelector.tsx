import { FC, memo, useState } from 'react'

import Button from '@/widgets/Buttons/Button'

import { THREAD } from '@/constant/thread'

import { Wrapper, Hint, CatsWrapper } from '../styles/tags/thread_selector'

const ThreadSelector: FC = () => {
  const [thread, setThread] = useState(THREAD.POST)

  return (
    <Wrapper>
      <Hint>社区板块:</Hint>
      <CatsWrapper>
        <Button
          ghost={thread !== THREAD.POST}
          size="small"
          noBorder={thread !== THREAD.POST}
          onClick={() => setThread(THREAD.POST)}
          space={10}
        >
          讨论区
        </Button>

        <Button
          ghost={thread !== THREAD.KANBAN}
          size="small"
          noBorder={thread !== THREAD.KANBAN}
          onClick={() => setThread(THREAD.KANBAN)}
          space={10}
        >
          看板墙
        </Button>

        <Button
          ghost={thread !== THREAD.CHANGELOG}
          size="small"
          noBorder={thread !== THREAD.CHANGELOG}
          onClick={() => setThread(THREAD.CHANGELOG)}
          space={10}
        >
          更新日志
        </Button>
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(ThreadSelector)
