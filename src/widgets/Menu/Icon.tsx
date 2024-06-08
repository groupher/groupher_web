import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TActive, TColorName, TMenu } from '@/spec'
import { COLOR_NAME } from '@/const/colors'
import MENU from '@/const/menu'
import useKanbanBgColors from '@/hooks/useKanbanBgColors'

import { Wrapper, ICONS } from './styles/icon'

type TProps = {
  type: TMenu
} & TActive

const getIconColor = (type: TMenu, gtdColors: TColorName[]): TColorName => {
  const [todoColor, wipColor, doneColor] = gtdColors

  if (type === MENU.CLOSE) return COLOR_NAME.RED

  switch (type) {
    case MENU.TODO: {
      return todoColor
    }
    case MENU.WIP: {
      return wipColor
    }
    case MENU.DONE: {
      return doneColor
    }
    default: {
      return COLOR_NAME.BLACK
    }
  }
}

const Icon: FC<TProps> = ({ type, $active }) => {
  const IconComp = ICONS[type] || ICONS.OTHER
  const kanbanColors = useKanbanBgColors()
  const iconColor = getIconColor(type, kanbanColors)

  return (
    <Wrapper $active={$active} $noSaturate={type === MENU.FEATURE || type === MENU.BUG}>
      {/* @ts-ignore */}
      <IconComp $color={iconColor} $active={$active} />
    </Wrapper>
  )
}

export default observer(Icon)
