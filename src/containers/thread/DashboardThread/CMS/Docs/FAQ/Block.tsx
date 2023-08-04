import { FC } from 'react'

import Markdown from 'markdown-to-jsx'
import type { TFAQSection } from '@/spec'

import Editor from './Editor'

import {
  Wrapper,
  Actions,
  Hint,
  DeleteHint,
  EditIcon,
  DeleteIcon,
  Title,
  Body,
  ArrowUpIcon,
  ArrowDownIcon,
} from '../../../styles/cms/docs/faq/block'
import { deleteFAQSection } from '../../../logic'
import { triggerEditFAQ, moveUpFAQ, moveDownFAQ } from '../../../logic/faq'

type TProps = {
  section: TFAQSection
  editingFAQIndex: number | null
  editingFAQ: TFAQSection
  isFirst: boolean
  isLast: boolean
  sortOnly: boolean
}

const Block: FC<TProps> = ({ section, editingFAQIndex, editingFAQ, isFirst, isLast, sortOnly }) => {
  if (editingFAQIndex === section.index) {
    return <Editor editingFAQ={editingFAQ} />
  }

  return (
    <Wrapper>
      <Title>{section.title}</Title>
      <Body>
        <Markdown>{section.body}</Markdown>
      </Body>

      <Actions rightOffset={!isFirst && !isLast}>
        {!sortOnly && !editingFAQ && (
          <>
            <EditIcon />
            <Hint onClick={() => triggerEditFAQ(section.index)}>编辑</Hint>
            <DeleteIcon />
            <DeleteHint onClick={() => deleteFAQSection(section.index)}>删除</DeleteHint>
          </>
        )}

        {!isFirst && <ArrowUpIcon onClick={() => moveUpFAQ(section)} />}
        {!isLast && <ArrowDownIcon onClick={() => moveDownFAQ(section)} />}
      </Actions>
    </Wrapper>
  )
}

export default Block
