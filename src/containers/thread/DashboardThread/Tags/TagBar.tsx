import { FC, memo } from 'react'

import type { TTag } from '@/spec'
import { COLORS } from '@/constant/colors'

import { SpaceGrow } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'
import TagAction from './TagAction'

import {
  Wrapper,
  Dot,
  DotSelector,
  Title,
  CatNote,
  InputWrapper,
  Inputer,
} from '../styles/tags/tag_bar'
import { editTag } from '../logic/tags'

export type TProps = {
  tag: TTag
  activeTagGroup: null | string
  editingTag: TTag
  settingTag: TTag
  isFirst: boolean
  isLast: boolean
  total: number
}

const TagBar: FC<TProps> = ({
  tag,
  activeTagGroup,
  editingTag,
  settingTag,
  isFirst,
  isLast,
  total,
}) => {
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
          <TagAction
            tag={tag}
            activeTagGroup={activeTagGroup}
            editingTag={editingTag}
            isFirst={isFirst}
            isLast={isLast}
            total={total}
          />
        )}
      </SavingBar>
    </Wrapper>
  )
}

export default memo(TagBar)
