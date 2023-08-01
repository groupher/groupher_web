import { FC } from 'react'

import Markdown from 'markdown-to-jsx'
import type { TFAQSection } from '@/spec'

import Editor from './Editor'

import {
  Wrapper,
  Actions,
  Hint,
  EditIcon,
  DeleteIcon,
  Title,
  Body,
} from '../../../styles/cms/docs/faq/block'
import { triggerEditFAQ, deleteFAQSection } from '../../../logic'

const markdown = `
  this is a paragraph 

  - this is a list
  - this is a list 2
  - this is a list 3


  \`\`\`js
  var some = code();
  \`\`\`
`

type TProps = {
  section: TFAQSection
  editingFAQIndex: number | null
  editingFAQ: TFAQSection
}

const Block: FC<TProps> = ({ section, editingFAQIndex, editingFAQ }) => {
  if (editingFAQIndex === section.index) {
    return <Editor editingFAQ={editingFAQ} />
  }

  return (
    <Wrapper>
      <Actions>
        <EditIcon />
        <Hint onClick={() => triggerEditFAQ(section.index)}>编辑</Hint>
        <DeleteIcon />
        <Hint onClick={() => deleteFAQSection(section.index)}>删除</Hint>
      </Actions>
      <Title>{section.title}</Title>
      <Body>
        <Markdown>{markdown}</Markdown>
      </Body>
    </Wrapper>
  )
}

export default Block
