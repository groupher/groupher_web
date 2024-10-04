import type { FC } from 'react'

import type { TFAQSection } from '~/spec'

import Markdown from '~/widgets/Markdown'
import Editor from './Editor'

import useFAQ from '../../../logic/useFAQ'
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
} from '../../../salon/cms/docs/faq/block'

import type { TProps as TIndex } from '.'

type TProps = {
  section: TFAQSection
  isFirst: boolean
  isLast: boolean
  sortOnly: boolean
} & Pick<TIndex, 'editingFAQIndex' | 'editingFAQ'>

const Block: FC<TProps> = ({ section, editingFAQIndex, editingFAQ, isFirst, isLast, sortOnly }) => {
  const { deleteFAQSection, triggerEditFAQ, moveUpFAQ, moveDownFAQ } = useFAQ()

  if (editingFAQIndex === section.index) {
    return <Editor editingFAQ={editingFAQ} />
  }

  return (
    <Wrapper>
      <Title>{section.title}</Title>
      <Body>
        <Markdown>{section.body}</Markdown>
      </Body>

      <Actions $rightOffset={!isFirst && !isLast}>
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
