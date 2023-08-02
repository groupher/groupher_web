import { FC } from 'react'

import type { TFAQSection } from '@/spec'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import Editor from './Editor'
import Adder from './Adder'
import Block from './Block'

import { Wrapper, InnerWrapper, ItemsWrapper } from '../../../styles/cms/docs/faq'

type TProps = {
  sections: TFAQSection[]
  editingFAQIndex: number | null
  editingFAQ: TFAQSection
}

const FAQ: FC<TProps> = ({ sections, editingFAQIndex, editingFAQ }) => {
  const showAdder = editingFAQIndex === sections.length
  const [animateRef] = useAutoAnimate()

  return (
    <Wrapper>
      <InnerWrapper>
        <ItemsWrapper ref={animateRef}>
          {sections.map((section, index) => (
            <Block
              key={section.index}
              section={section}
              editingFAQIndex={editingFAQIndex}
              editingFAQ={editingFAQ}
              isFirst={index === 0}
              isLast={index === sections.length - 1}
            />
          ))}
        </ItemsWrapper>

        {showAdder && <Editor editingFAQ={editingFAQ} />}
        {!showAdder && <Adder />}
      </InnerWrapper>
    </Wrapper>
  )
}

export default FAQ
