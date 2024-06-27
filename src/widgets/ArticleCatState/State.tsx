import type { FC } from 'react'

import type { TTooltipPlacement } from '~/spec'
import { ARTICLE_STATE } from '~/const/gtd'
import { COLOR_NAME } from '~/const/colors'
import useKanbanBgColors from '~/hooks/useKanbanBgColors'
import useNameAlias from '~/hooks/useNameAlias'

import Tooltip from '~/widgets/Tooltip'

import { Trans } from '~/i18n'
import { aliasGTDDoneState } from '~/fmt'

import type { TProps as TArticleStateBadgeProps } from '.'
import { Wrapper, TipNote, WipIcon, Text, TODOIcon, DoneIcon, RejectIcon } from './styles/state'

type TProps = Pick<TArticleStateBadgeProps, 'cat' | 'state' | 'smaller'>

const State: FC<TProps> = ({ cat, state, smaller }) => {
  const [todoColor, wipColor, doneColor] = useKanbanBgColors()

  const kanbanAlias = useNameAlias('kanban')

  const tipConfig = {
    placement: 'right' as TTooltipPlacement,
    offset: [0, 0] as [number, number],
    noPadding: true,
  }

  switch (state) {
    case ARTICLE_STATE.TODO: {
      if (smaller) {
        return (
          <Tooltip
            content={
              <TipNote>
                <Text>{kanbanAlias[ARTICLE_STATE.TODO.toLowerCase()].name}</Text>
              </TipNote>
            }
            {...tipConfig}
          >
            <Wrapper $smaller color={todoColor}>
              <TODOIcon $smaller color={todoColor} />
            </Wrapper>
          </Tooltip>
        )
      }

      return (
        <Wrapper color={todoColor}>
          <TODOIcon color={todoColor} />
          <Text>{kanbanAlias[ARTICLE_STATE.TODO.toLowerCase()].name}</Text>
        </Wrapper>
      )
    }

    case ARTICLE_STATE.WIP: {
      if (smaller) {
        return (
          <Tooltip
            content={
              <TipNote>
                <Text>{kanbanAlias[ARTICLE_STATE.WIP.toLowerCase()].name}</Text>
              </TipNote>
            }
            {...tipConfig}
          >
            <Wrapper $smaller color={wipColor}>
              <WipIcon $smaller color={wipColor} />
            </Wrapper>
          </Tooltip>
        )
      }

      return (
        <Wrapper color={wipColor}>
          <WipIcon color={wipColor} />

          <Text>{kanbanAlias[ARTICLE_STATE.WIP.toLowerCase()].name}</Text>
        </Wrapper>
      )
    }

    case ARTICLE_STATE.DONE: {
      if (smaller) {
        return (
          <Tooltip
            content={
              <TipNote>
                <Text>{Trans(aliasGTDDoneState(cat, state))}</Text>
              </TipNote>
            }
            {...tipConfig}
          >
            <Wrapper $smaller color={doneColor}>
              <DoneIcon $smaller color={doneColor} />
            </Wrapper>
          </Tooltip>
        )
      }

      return (
        <Wrapper color={doneColor}>
          <DoneIcon color={doneColor === COLOR_NAME.BLACK ? COLOR_NAME.GREEN : doneColor} />
          <Text>{Trans(aliasGTDDoneState(cat, state))}</Text>
        </Wrapper>
      )
    }

    case ARTICLE_STATE.REJECT:
    case ARTICLE_STATE.REJECT_STALE:
    case ARTICLE_STATE.REJECT_NO_PLAN:
    case ARTICLE_STATE.REJECT_REPRO:
    case ARTICLE_STATE.REJECT_DUP: {
      if (smaller) {
        return (
          <Tooltip
            content={
              <TipNote>
                <Text>{Trans(state)}</Text>
              </TipNote>
            }
            {...tipConfig}
          >
            <Wrapper $smaller color={COLOR_NAME.RED}>
              <RejectIcon $smaller color={COLOR_NAME.RED} />
            </Wrapper>
          </Tooltip>
        )
      }

      return (
        <Wrapper color={COLOR_NAME.RED}>
          <RejectIcon color={COLOR_NAME.RED} />
          <Text>{Trans(state)}</Text>
        </Wrapper>
      )
    }

    default: {
      return null
    }
  }
}

export default State
