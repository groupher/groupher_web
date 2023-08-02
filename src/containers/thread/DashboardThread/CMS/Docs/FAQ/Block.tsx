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
  ArrowUpIcon,
  ArrowDownIcon,
} from '../../../styles/cms/docs/faq/block'
import { triggerEditFAQ, deleteFAQSection, moveUpFAQ, moveDownFAQ } from '../../../logic/faq'

type TProps = {
  section: TFAQSection
  editingFAQIndex: number | null
  editingFAQ: TFAQSection
  isFirst: boolean
  isLast: boolean
}

const Block: FC<TProps> = ({ section, editingFAQIndex, editingFAQ, isFirst, isLast }) => {
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
        {!isFirst && <ArrowUpIcon onClick={() => moveUpFAQ(section)} />}
        {!isLast && <ArrowDownIcon onClick={() => moveDownFAQ(section)} />}
      </Actions>
      <Title>{section.title}</Title>
      <Body>
        <Markdown>{section.body}</Markdown>
      </Body>
    </Wrapper>
  )
}

export default Block
