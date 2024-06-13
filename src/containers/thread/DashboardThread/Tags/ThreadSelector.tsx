import Button from '@/widgets/Buttons/Button'

import useTags from '../logic/useTags'
import { Wrapper, Hint, CatsWrapper } from '../styles/tags/thread_selector'

export default () => {
  const { activeTagThread, changeThread, getThreads } = useTags()
  const active = activeTagThread

  return (
    <Wrapper>
      <Hint>社区板块:</Hint>
      <CatsWrapper>
        {getThreads().map((thread) => (
          <Button
            key={thread.slug}
            ghost={thread.slug !== active}
            size="small"
            noBorder={thread.slug !== active}
            onClick={() => {
              changeThread(thread.slug)
              // reloadArticleTags()
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
