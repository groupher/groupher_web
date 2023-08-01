import { FC } from 'react'

import type { TFAQSection } from '@/spec'

import Editor from './Editor'
import Adder from './Adder'
import Block from './Block'

import { Wrapper, InnerWrapper } from '../../../styles/cms/docs/faq'

type TProps = {
  sections: TFAQSection[]
  editingFAQIndex: number | null
  editingFAQ: TFAQSection
}

const FAQ: FC<TProps> = ({ sections, editingFAQIndex, editingFAQ }) => {
  const showAdder = editingFAQIndex === sections.length

  return (
    <Wrapper>
      <InnerWrapper>
        {sections.map((section) => (
          <Block
            key={section.index}
            section={section}
            editingFAQIndex={editingFAQIndex}
            editingFAQ={editingFAQ}
          />
        ))}
        {showAdder && <Editor editingFAQ={editingFAQ} />}
        {!showAdder && <Adder />}
      </InnerWrapper>
    </Wrapper>
  )
}

export default FAQ
