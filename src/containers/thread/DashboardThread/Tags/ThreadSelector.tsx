import { FC, memo, useState } from 'react'

import { THREAD } from '@/constant/thread'

import { Wrapper, Hint, CatsWrapper, CatButton } from '../styles/tags/thread_selector'

const ThreadSelector: FC = () => {
  const [thread, setThread] = useState(THREAD.POST)

  return (
    <Wrapper>
      <Hint>社区板块:</Hint>
      <CatsWrapper>
        <CatButton
          ghost={thread !== THREAD.POST}
          size="small"
          noBorder={thread !== THREAD.POST}
          onClick={() => setThread(THREAD.POST)}
          space={12}
        >
          讨论区
        </CatButton>

        <CatButton
          ghost={thread !== THREAD.KANBAN}
          size="small"
          noBorder={thread !== THREAD.KANBAN}
          onClick={() => setThread(THREAD.KANBAN)}
          space={12}
        >
          看板墙
        </CatButton>

        <CatButton
          ghost={thread !== THREAD.CHANGELOG}
          size="small"
          noBorder={thread !== THREAD.CHANGELOG}
          onClick={() => setThread(THREAD.CHANGELOG)}
          space={12}
        >
          更新日志
        </CatButton>
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(ThreadSelector)
