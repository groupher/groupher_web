import { FC } from 'react'
import { observer } from 'mobx-react'

import { SpaceGrow } from '@/widgets/Common'
import useViewingArticle from '@/hooks/useViewingArticle'
import useKanbanBgColors from '@/hooks/useKanbanBgColors'
import { Trans } from '@/i18n'
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

  if (article.state) {
    const TheIcon = Icon[article.state]
    const $color = getGTDColor(article.state, bgColors)

    return (
      <MenuItem onClick={onClick}>
        {/* @ts-ignore */}
        <TheIcon $active $color={$color} />
        {Trans(aliasGTDDoneState(article.cat, article.state))}
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

export default observer(StateItem)
