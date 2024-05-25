import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TActive, TThread } from '@/spec'
import { THREAD } from '@/const/thread'

import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Wrapper, Icon } from '../styles/sidebar_layout/thread_icon'

type TProps = {
  thread: TThread
} & TActive

const ThreadIcon: FC<TProps> = ({ thread, $active }) => {
  const primaryColor = usePrimaryColor()

  switch (thread) {
    case THREAD.POST: {
      return (
        <Wrapper>
          <Icon.Discuss $active={$active} $color={primaryColor} />
        </Wrapper>
      )
    }
    case THREAD.CHANGELOG: {
      return (
        <Wrapper>
          <Icon.Tada $active={$active} $color={primaryColor} />
        </Wrapper>
      )
    }
    case THREAD.KANBAN: {
      return (
        <Wrapper>
          <Icon.Kanban $active={$active} $color={primaryColor} />
        </Wrapper>
      )
    }
    case THREAD.DOC: {
      return (
        <Wrapper>
          <Icon.Guide $active={$active} $color={primaryColor} />
        </Wrapper>
      )
    }

    case THREAD.ABOUT: {
      return (
        <Wrapper>
          <Icon.Info $active={$active} $color={primaryColor} />
        </Wrapper>
      )
    }

    default: {
      return (
        <Wrapper>
          <Icon.Info $active={$active} $color={primaryColor} />
        </Wrapper>
      )
    }
  }
}

export default observer(ThreadIcon)
