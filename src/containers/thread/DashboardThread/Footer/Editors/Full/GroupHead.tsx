import { FC, memo } from 'react'

import Tooltip from '@/widgets/Tooltip'

import GroupMenu from '../GroupMenu'

import { Wrapper, Title, SettingIcon } from '../../../styles/footer/editors/full/group_head'

type TProps = {
  title: string
  moveRight: () => void
  moveLeft: () => void
  moveEdgeLeft: () => void
  moveEdgeRight: () => void

  isEdgeLeft: boolean
  isEdgeRight: boolean
}

const GroupHead: FC<TProps> = ({
  title,
  moveLeft,
  moveRight,
  moveEdgeLeft,
  moveEdgeRight,
  isEdgeLeft,
  isEdgeRight,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Tooltip
        content={
          <GroupMenu
            moveLeft={moveLeft}
            moveRight={moveRight}
            moveEdgeLeft={moveEdgeLeft}
            moveEdgeRight={moveEdgeRight}
            isEdgeLeft={isEdgeLeft}
            isEdgeRight={isEdgeRight}
          />
        }
        placement="bottom-end"
        trigger="mouseenter focus"
        offset={[4, 0]}
        hideOnClick
        noPadding
        delay={300}
      >
        <SettingIcon />
      </Tooltip>
    </Wrapper>
  )
}

export default memo(GroupHead)
