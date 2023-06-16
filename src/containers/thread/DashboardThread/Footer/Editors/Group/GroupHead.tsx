import { FC, memo } from 'react'

import Tooltip from '@/widgets/Tooltip'
import { SpaceGrow } from '@/widgets/Common'

import GroupMenu from '../GroupMenu'
import GroupInputer from '../GroupInputer'

import {
  Wrapper,
  Title,
  EditIcon,
  SettingIcon,
} from '../../../styles/footer/editors/group/group_head'
import {
  triggerGroupUpdate,
  cancelGroupChange,
  updateEditingGroup,
  confirmGroupUpdate,
} from '../../../logic/links'

type TProps = {
  title: string
  editingGroup: string | null
  editingGroupIndex: number | null
  curGroupIndex: number
  isEdgeLeft: boolean
  isEdgeRight: boolean

  moveRight: () => void
  moveLeft: () => void
  moveEdgeLeft: () => void
  moveEdgeRight: () => void
  onDelete: () => void
}

const GroupHead: FC<TProps> = ({
  title,
  editingGroup,
  curGroupIndex,
  editingGroupIndex,
  moveLeft,
  moveRight,
  moveEdgeLeft,
  moveEdgeRight,
  onDelete,
  isEdgeLeft,
  isEdgeRight,
}) => {
  // null is void empty checked when input value is ""
  if (editingGroup !== null && editingGroupIndex === curGroupIndex) {
    return (
      <Wrapper>
        <GroupInputer
          value={editingGroup}
          onChange={updateEditingGroup}
          onConfirm={confirmGroupUpdate}
          onCancel={cancelGroupChange}
        />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <Title>{title}</Title>
      <SpaceGrow />
      <EditIcon onClick={() => triggerGroupUpdate(title, curGroupIndex)} />
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
