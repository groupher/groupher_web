import { FC, memo } from 'react'

import type { TTag } from '@/spec'
import { COLORS } from '@/constant/colors'

import { callTagEditEditor } from '@/utils/signal'
import { Space, SpaceGrow } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'
import Tooltip from '@/widgets/Tooltip'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'
import ActionMenu from './ActionMenu'

import {
  Wrapper,
  Dot,
  DotSelector,
  Title,
  CatNote,
  InputWrapper,
  Inputer,
  Actions,
  EditIcon,
  MoreIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '../styles/tags/tag_bar'
import { editTag, moveTagUp, moveTagDown, moveTag2Top, moveTag2Bottom } from '../logic/tags'

type TProps = {
  tag: TTag
  activeTagGroup: null | string
  editingTag: TTag
  settingTag: TTag
  isFirst: boolean
  isLast: boolean
}

const TagBar: FC<TProps> = ({ tag, activeTagGroup, editingTag, settingTag, isFirst, isLast }) => {
  const isEditMode = editingTag?.id === tag.id

  return (
    <Wrapper
      key={tag.id}
      isEditMode={isEditMode}
      isSetting={settingTag?.id === tag.id}
      hasSettingTag={settingTag !== null}
    >
      <SavingBar isTouched={isEditMode} field={SETTING_FIELD.TAG}>
        {isEditMode ? (
          <ColorSelector
            activeColor={editingTag.color}
            onChange={(color) => editTag('editingTag', { ...editingTag, color })}
            placement="bottom-start"
            offset={[-8, 0]}
          >
            <DotSelector>
              <Dot color={COLORS[editingTag.color]} isEditMode={isEditMode} />
            </DotSelector>
          </ColorSelector>
        ) : (
          <Dot color={COLORS[tag.color]} />
        )}
        {isEditMode ? (
          <InputWrapper>
            <Inputer
              value={editingTag.title}
              onChange={(e) => editTag('editingTag', { ...editingTag, title: e.target.value })}
              autoFocus
            />
          </InputWrapper>
        ) : (
          <Title>
            {tag.title}
            {!activeTagGroup && <CatNote>{tag.group}</CatNote>}
          </Title>
        )}
        <SpaceGrow />
        {!isEditMode && (
          <Actions>
            {activeTagGroup && !isFirst && <ArrowUpIcon onClick={() => moveTagUp(tag)} />}
            {activeTagGroup && !isLast && <ArrowDownIcon onClick={() => moveTagDown(tag)} />}
            <EditIcon onClick={() => editTag('editingTag', tag)} />
            <Space right={8} />
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
          </Actions>
        )}
      </SavingBar>
    </Wrapper>
  )
}

export default memo(TagBar)
