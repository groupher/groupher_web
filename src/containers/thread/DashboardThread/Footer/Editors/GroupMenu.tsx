import { FC } from 'react'

import { buildLog } from '@/utils/logger'

import MenuItem from '@/widgets/MenuItem'
import MENU from '@/constant/menu'

import { Wrapper } from '../../styles/footer/editors/link_menu'

const log = buildLog('C:Dashboard:LinkEditor')

type TProps = {
  moveLeft?: () => void
  moveRight?: () => void

  moveEdgeLeft?: () => void
  moveEdgeRight?: () => void

  isEdgeLeft: boolean
  isEdgeRight: boolean
}

const GroupMenu: FC<TProps> = ({
  moveLeft = log,
  moveRight = log,
  moveEdgeLeft = log,
  moveEdgeRight = log,

  isEdgeLeft,
  isEdgeRight,
}) => {
  return (
    <Wrapper>
      <MenuItem icon={MENU.ARROW_LEFT} title="左移" onClick={() => moveLeft()} />
      <MenuItem icon={MENU.ARROW_RIGHT} title="右移" onClick={() => moveRight()} />
      {!isEdgeLeft && (
        <MenuItem icon={MENU.ARROW_TO_LEFT} title="移至最前" onClick={() => moveEdgeLeft()} />
      )}
      {!isEdgeRight && (
        <MenuItem icon={MENU.ARROW_TO_RIGHT} title="移至最后" onClick={() => moveEdgeRight()} />
      )}
    </Wrapper>
  )
}

export default GroupMenu
