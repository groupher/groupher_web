import Button from '~/widgets/Buttons/Button'

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
            size="small"
            noBorder={thread.slug !== active}
            onClick={() => {
              changeThread(thread.slug)
            }}
            space={10}
            ghost
          >
            {thread.title}
          </Button>
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}
