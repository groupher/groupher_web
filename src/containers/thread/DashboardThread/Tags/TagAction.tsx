import type { FC } from 'react'

import { callTagEditEditor } from '@/signal'
import { Space } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'

import ActionMenu from './ActionMenu'

import useTags from '../logic/useTags'

import {
  Wrapper,
  EditIcon,
  MoreIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SettingIcon,
} from '../styles/tags/tag_action'
import type { TProps as TTagBarProps } from './TagBar'

type TProps = Omit<TTagBarProps, 'settingTag'>

const TagAction: FC<TProps> = ({ tag, isFirst, isLast, total }) => {
  const {
    editingTag,
    activeTagGroup,
    editTag,
    moveTagUp,
    moveTagDown,
    moveTag2Top,
    moveTag2Bottom,
  } = useTags()
  const isEditMode = editingTag?.id === tag.id

  if (isEditMode) return null

  return (
    <Wrapper>
      {activeTagGroup && !isFirst && <ArrowUpIcon onClick={() => moveTagUp(tag)} />}
      {activeTagGroup && !isLast && <ArrowDownIcon onClick={() => moveTagDown(tag)} />}
      <EditIcon onClick={() => editTag('editingTag', tag)} />
      <Space right={8} />
      {activeTagGroup === null || total <= 2 ? (
        <SettingIcon
          onClick={() => {
            editTag('settingTag', tag)
            callTagEditEditor()
          }}
        />
      ) : (
        <Tooltip
          content={
            <ActionMenu
              isFirst={isFirst}
              isLast={isLast}
              activeTagGroup={activeTagGroup}
              move2Top={() => moveTag2Top(tag)}
              move2Bottom={() => moveTag2Bottom(tag)}
              onSetting={() => {
                editTag('settingTag', tag)
                callTagEditEditor()
              }}
            />
          }
          placement="bottom-end"
          trigger="mouseenter focus"
          offset={[4, 0]}
          delay={300}
          hideOnClick
          noPadding
        >
          <MoreIcon />
        </Tooltip>
      )}
    </Wrapper>
  )
}

export default TagAction
