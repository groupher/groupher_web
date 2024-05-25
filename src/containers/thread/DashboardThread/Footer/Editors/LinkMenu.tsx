import { FC } from 'react'

import { buildLog } from '@/logger'

import MenuItem from '@/widgets/MenuItem'
import MENU from '@/const/menu'

import { Wrapper } from '../../styles/footer/editors/link_menu'

const log = buildLog('C:Dashboard:LinkEditor')

type TProps = {
  isFirst?: boolean
  isLast?: boolean

  move2Top?: () => void
  move2Bottom?: () => void
  onDelete?: () => void
}

const LinkMenu: FC<TProps> = ({
  isFirst = false,
  isLast = false,
  move2Top = log,
  move2Bottom = log,
  onDelete = log,
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

      <MenuItem icon={MENU.DELETE} title="删除" onClick={() => onDelete()} />
    </Wrapper>
  )
}

export default LinkMenu
