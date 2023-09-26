import { FC } from 'react'
import { observer } from 'mobx-react'

import { ARTICLE_STATE } from '@/constant/gtd'
import { COLOR_NAME } from '@/constant/colors'
import useKanbanBgColors from '@/hooks/useKanbanBgColors'

import type { TProps as TArticleStateBadgeProps } from '.'

import { Wrapper, WipIcon, TODOIcon, DoneIcon, ResolveIcon, RejectIcon } from './styles/state'

type TProps = Pick<TArticleStateBadgeProps, 'state' | 'smaller'>

const State: FC<TProps> = ({ state, smaller }) => {
  const [todoColor, wipColor, doneColor] = useKanbanBgColors()

  switch (state) {
    case ARTICLE_STATE.DONE: {
      return (
        <Wrapper smaller={smaller} color={doneColor}>
          <DoneIcon
            smaller={smaller}
            color={doneColor === COLOR_NAME.BLACK ? COLOR_NAME.GREEN : doneColor}
          />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.WIP: {
      return (
        <Wrapper smaller={smaller} color={wipColor}>
          <WipIcon smaller={smaller} color={wipColor} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.TODO: {
      return (
        <Wrapper smaller={smaller} color={todoColor}>
          <TODOIcon smaller={smaller} color={todoColor} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.RESOLVED: {
      return (
        <Wrapper smaller={smaller} color={COLOR_NAME.GREEN}>
          <ResolveIcon
            smaller={smaller}
            color={doneColor === COLOR_NAME.BLACK ? COLOR_NAME.GREEN : doneColor}
          />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.REJECT_STALE:
    case ARTICLE_STATE.REJECT_NO_PLAN:
    case ARTICLE_STATE.REJECT_NO_FIX:
    case ARTICLE_STATE.REJECT_DUP: {
      return <RejectIcon smaller={smaller} />
    }

    default: {
      return null
    }
  }
}

export default observer(State)
