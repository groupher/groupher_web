import { FC, memo } from 'react'

import Tooltip from '@/widgets/Tooltip'
import { SpaceGrow } from '@/widgets/Common'

import GroupMenu from '../GroupMenu'

import {
  Wrapper,
  Title,
  EditIcon,
  SettingIcon,
} from '../../../styles/footer/editors/full/group_head'

type TProps = {
  title: string
  moveRight: () => void
  moveLeft: () => void
  moveEdgeLeft: () => void
  moveEdgeRight: () => void
  onDelete: () => void

  isEdgeLeft: boolean
  isEdgeRight: boolean
}

const GroupHead: FC<TProps> = ({
  title,
  moveLeft,
  moveRight,
  moveEdgeLeft,
  moveEdgeRight,
  onDelete,
  isEdgeLeft,
  isEdgeRight,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <SpaceGrow />
      <EditIcon />
      <Tooltip
        content={
          <GroupMenu
            moveLeft={moveLeft}
            moveRight={moveRight}
            moveEdgeLeft={moveEdgeLeft}
            moveEdgeRight={moveEdgeRight}
            isEdgeLeft={isEdgeLeft}
            isEdgeRight={isEdgeRight}
            onDelete={onDelete}
          />
        }
        placement="bottom-end"
        trigger="click"
        offset={[4, 0]}
        hideOnClick
        noPadding
      >
        <SettingIcon />
      </Tooltip>
    </Wrapper>
  )
}

export default memo(GroupHead)
