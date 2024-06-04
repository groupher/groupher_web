import { type FC, memo } from 'react'
import { startsWith } from 'ramda'
import { observer } from 'mobx-react-lite'

import { ONE_LINK_GROUP, MORE_GROUP } from '@/const/dashboard'

import Tooltip from '@/widgets/Tooltip'
import { SpaceGrow } from '@/widgets/Common'

import GroupMenu from './GroupMenu'
import GroupInputer from './GroupInputer'

import useHeader from '../../logic/useHeader'
import {
  Wrapper,
  Title,
  ArrowIcon,
  HintTitle,
  EditIcon,
  SettingIcon,
} from '../../styles/header/editors/group_head'

type TGroupTitle = {
  title: string
}

const GroupTitle: FC<TGroupTitle> = ({ title }) => {
  if (startsWith(ONE_LINK_GROUP, title)) {
    return <HintTitle>单链接</HintTitle>
  }

  if (title === MORE_GROUP) {
    return (
      <Title>
        更多 <ArrowIcon />
      </Title>
    )
  }

  return (
    <Title>
      {title} <ArrowIcon />
    </Title>
  )
}

type TProps = {
  title: string
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
  curGroupIndex,
  moveLeft,
  moveRight,
  moveEdgeLeft,
  moveEdgeRight,
  onDelete,
  isEdgeLeft,
  isEdgeRight,
}) => {
  const {
    editingGroup,
    editingGroupIndex,
    triggerGroupUpdate,
    cancelGroupChange,
    updateEditingGroup,
    confirmGroupUpdate,
  } = useHeader()

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
      <GroupTitle title={title} />

      <SpaceGrow />

      {!(startsWith(ONE_LINK_GROUP, title) || title === MORE_GROUP) && (
        <EditIcon onClick={() => triggerGroupUpdate(title, curGroupIndex)} />
      )}

      {title !== MORE_GROUP && (
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
      )}
    </Wrapper>
  )
}

export default observer(GroupHead)
