import { FC } from 'react'

import { buildLog } from '@/utils/logger'

import MenuItem from '@/widgets/MenuItem'
import MENU from '@/constant/menu'

import { Wrapper } from '../styles/tags/action_menu'

const log = buildLog('C:Dashboard:LinkEditor')

type TProps = {
  isFirst?: boolean
  isLast?: boolean
  activeTagGroup: null | string

  move2Top?: () => void
  move2Bottom?: () => void
  onSetting?: () => void
}

const LinkMenu: FC<TProps> = ({
  isFirst = false,
  isLast = false,
  activeTagGroup,
  move2Top = log,
  move2Bottom = log,
  onSetting = log,
}) => {
  return (
    <Wrapper>
      {activeTagGroup && !isFirst && (
        <MenuItem icon={MENU.ARROW_TO_TOP} title="移至最前" onClick={() => move2Top()} />
      )}

      {activeTagGroup && !isLast && (
        <MenuItem icon={MENU.ARROW_TO_BOTTOM} title="移至最后" onClick={() => move2Bottom()} />
      )}

      <MenuItem icon={MENU.SETTING} title="高级设置" onClick={() => onSetting()} />
    </Wrapper>
  )
}

export default LinkMenu
