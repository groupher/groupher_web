import { FC, memo } from 'react'

import type { TTag } from '@/spec'
import { COLORS } from '@/constant/colors'

import { callTagSettingEditor } from '@/utils/signal'
import { Space, SpaceGrow } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'

import {
  Wrapper,
  Dot,
  DotSelector,
  Title,
  InputWrapper,
  Inputer,
  Actions,
  EditIcon,
  SettingIcon,
} from '../styles/tags/tag_bar'
import { editTag } from '../logic'

type TProps = {
  tag: TTag
  editingTag: TTag
  settingTag: TTag
}

const TagBar: FC<TProps> = ({ tag, editingTag, settingTag }) => {
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
          <Title>{tag.title}</Title>
        )}
        <SpaceGrow />
        {!isEditMode && (
          <Actions>
            <EditIcon onClick={() => editTag('editingTag', tag)} />
            <Space right={8} />
            <SettingIcon
              onClick={() => {
                editTag('settingTag', tag)
                callTagSettingEditor()
              }}
            />
          </Actions>
        )}
      </SavingBar>
    </Wrapper>
  )
}

export default memo(TagBar)
