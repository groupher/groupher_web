import type { FC } from 'react'

import type { TFAQSection } from '~/spec'

import { SETTING_FIELD } from '../../../constant'
import SavingBar from '../../../SavingBar'

import { Wrapper, TitleInput, BodyInput } from '../../../styles/cms/docs/faq/editor'
import { triggerEditFAQ, updateEditingFAQ } from '../../../logic/faq'

type TProps = {
  editingFAQ: TFAQSection
  addNew?: boolean
}

const Editor: FC<TProps> = ({ editingFAQ, addNew = false }) => {
  return (
    <Wrapper>
      <TitleInput
        placeholder="标题"
        value={editingFAQ?.title}
        onChange={(e) => updateEditingFAQ({ ...editingFAQ, title: e.target.value })}
      />
      <BodyInput
        placeholder="内容 (支持 Markdown 语法)"
        behavior="textarea"
        value={editingFAQ?.body}
        onChange={(e) => updateEditingFAQ({ ...editingFAQ, body: e.target.value })}
      />
      <SavingBar
        field={!addNew ? SETTING_FIELD.FAQ_SECTION_ITEM : SETTING_FIELD.FAQ_SECTION_ADD}
        onCancel={() => triggerEditFAQ(null)}
        bottom={30}
        isTouched
      />
    </Wrapper>
  )
}

export default Editor
