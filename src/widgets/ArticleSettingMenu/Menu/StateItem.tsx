import type { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import useViewingArticle from '@/hooks/useViewingArticle'
import useKanbanBgColors from '@/hooks/useKanbanBgColors'
import useNameAlias from '@/hooks/useNameAlias'
import { Trans } from '@/i18n'
import { ARTICLE_STATE } from '@/const/gtd'
import { aliasGTDDoneState } from '@/fmt'

import { Icon } from '../styles/icon'
import { MenuItem } from '../styles/menu'
import { getGTDColor } from '../helper'

type TProps = {
  onClick: () => void
}

const StateItem: FC<TProps> = ({ onClick }) => {
  const { article } = useViewingArticle()
  const bgColors = useKanbanBgColors()
  const kanbanAlias = useNameAlias('kanban')

  if (article.state) {
    const TheIcon = Icon[article.state] || Icon[ARTICLE_STATE.REJECT]
    const $color = getGTDColor(article.state, bgColors)

    return (
      <MenuItem onClick={onClick}>
        {/* @ts-ignore */}
        <TheIcon $active $color={$color} />
        {article.state === ARTICLE_STATE.DONE ? (
          <>{Trans(aliasGTDDoneState(article.cat, article.state))}</>
        ) : (
          <>
            {kanbanAlias[ARTICLE_STATE[article.state].toLowerCase()]?.name || Trans(article.state)}
          </>
        )}
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>
    )
  }

  return (
    <MenuItem onClick={onClick}>
      <Icon.State />
      状态
      <SpaceGrow />
      <Icon.Arrow />
    </MenuItem>
  )
}

export default StateItem
