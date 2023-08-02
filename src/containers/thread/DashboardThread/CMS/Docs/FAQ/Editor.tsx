import { FC } from 'react'

import type { TFAQSection } from '@/spec'

import SavingBar from '../../../SavingBar'

import { Wrapper, TitleInput, BodyInput } from '../../../styles/cms/docs/faq/editor'
import { triggerEditFAQ, updateEditingFAQ, addFAQSectionConfirm } from '../../../logic/faq'

type TProps = {
  editingFAQ: TFAQSection
}

const Editor: FC<TProps> = ({ editingFAQ }) => {
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
        onCancel={() => triggerEditFAQ(null)}
        onConfirm={() => addFAQSectionConfirm()}
        bottom={30}
        isTouched
      />
    </Wrapper>
  )
}

export default Editor
