import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TColorName, TTag } from '@/spec'

import TagNode from '@/widgets/TagNode'
import { SpaceGrow } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'
import TagAction from './TagAction'

import useTagListInfo from '../hooks/useTagListInfo'
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
  isFirst: boolean
  isLast: boolean
  total: number
}

const TagBar: FC<TProps> = ({ tag, isFirst, isLast, total }) => {
  const { editingTag, settingTag, activeTagGroup } = useTagListInfo()

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
              <Dot color={editingTag.color as TColorName} isEditMode={isEditMode} />
            </DotSelector>
          </ColorSelector>
        ) : (
          <TagNode color={tag.color} hashSize={12} hashRight={0} boldHash dotTop={1} />
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
        {!isEditMode && <TagAction tag={tag} isFirst={isFirst} isLast={isLast} total={total} />}
      </SavingBar>
    </Wrapper>
  )
}

export default observer(TagBar)
