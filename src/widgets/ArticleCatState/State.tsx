import { FC } from 'react'
import { observer } from 'mobx-react'

import { ARTICLE_STATE } from '@/constant/gtd'
import { COLOR_NAME } from '@/constant/colors'
import useKanbanBgColors from '@/hooks/useKanbanBgColors'
import useNameAlias from '@/hooks/useNameAlias'

import { Trans } from '@/i18n'
import { aliasGTDDoneState } from '@/fmt'

import type { TProps as TArticleStateBadgeProps } from '.'

import { Wrapper, WipIcon, Text, TODOIcon, DoneIcon, RejectIcon } from './styles/state'

type TProps = Pick<TArticleStateBadgeProps, 'cat' | 'state' | 'smaller'>

const State: FC<TProps> = ({ cat, state, smaller }) => {
  const [todoColor, wipColor, doneColor] = useKanbanBgColors()

  const kanbanAlias = useNameAlias('kanban')

  switch (state) {
    case ARTICLE_STATE.DONE: {
      return (
        <Wrapper $smaller={smaller} color={doneColor}>
          <DoneIcon
            $smaller={smaller}
            color={doneColor === COLOR_NAME.BLACK ? COLOR_NAME.GREEN : doneColor}
          />
          {!smaller && <Text>{Trans(aliasGTDDoneState(cat, state))}</Text>}
        </Wrapper>
      )
    }

    case ARTICLE_STATE.WIP: {
      return (
        <Wrapper $smaller={smaller} color={wipColor}>
          <WipIcon $smaller={smaller} color={wipColor} />
          {!smaller && <Text>{kanbanAlias[ARTICLE_STATE.WIP.toLowerCase()].name}</Text>}
        </Wrapper>
      )
    }

    case ARTICLE_STATE.TODO: {
      return (
        <Wrapper $smaller={smaller} color={todoColor}>
          <TODOIcon $smaller={smaller} color={todoColor} />
          {!smaller && <Text>{kanbanAlias[ARTICLE_STATE.TODO.toLowerCase()].name}</Text>}
        </Wrapper>
      )
    }

    case ARTICLE_STATE.REJECT_STALE:
    case ARTICLE_STATE.REJECT_NO_PLAN:
    case ARTICLE_STATE.REJECT_DUP: {
      return <RejectIcon $smaller={smaller} />
    }

    default: {
      return null
    }
  }
}

export default observer(State)
