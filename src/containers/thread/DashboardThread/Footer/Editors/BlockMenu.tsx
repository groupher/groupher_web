import { FC } from 'react'

import { buildLog } from '@/utils/logger'

import MenuItem from '@/widgets/MenuItem'
import MENU from '@/constant/menu'

import { Wrapper } from '../../styles/footer/editors/block_menu'

const log = buildLog('C:Dashboard:LinkEditor')

type TProps = {
  isFirst?: boolean
  isLast?: boolean

  move2Top?: () => void
  move2Bottom?: () => void
}

const BlockMenu: FC<TProps> = ({
  isFirst = false,
  isLast = false,
  move2Top = log,
  move2Bottom = log,
}) => {
  return (
    <Wrapper>
      {/* <MenuItem icon={MENU.ARROW_UP} title="上移" />
      <MenuItem icon={MENU.ARROW_DOWN} title="下移" /> */}

      {!isFirst && (
        <MenuItem icon={MENU.ARROW_TO_TOP} title="移至最前" onClick={() => move2Top()} />
      )}

      {!isLast && (
        <MenuItem icon={MENU.ARROW_TO_BOTTOM} title="移至最后" onClick={() => move2Bottom()} />
      )}
    </Wrapper>
  )
}

export default BlockMenu
