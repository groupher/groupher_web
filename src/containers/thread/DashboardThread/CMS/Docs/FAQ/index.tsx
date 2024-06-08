import type { FC } from 'react'

import type { TFAQSection } from '@/spec'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { SETTING_FIELD } from '../../../constant'

import SavingBar from '../../../SavingBar'
import Editor from './Editor'
import Adder from './Adder'
import Block from './Block'

import { Wrapper, InnerWrapper, ItemsWrapper } from '../../../styles/cms/docs/faq'

export type TProps = {
  sections: TFAQSection[]
  editingFAQIndex: number | null
  editingFAQ: TFAQSection
  isTouched: boolean
}

const FAQ: FC<TProps> = ({ sections, editingFAQIndex, editingFAQ, isTouched }) => {
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
              sortOnly={isTouched}
              isFirst={index === 0}
              isLast={index === sections.length - 1}
            />
          ))}
        </ItemsWrapper>

        {showAdder && !isTouched && <Editor editingFAQ={editingFAQ} addNew />}
        {!showAdder && !isTouched && <Adder />}

        <SavingBar
          field={SETTING_FIELD.FAQ_SECTIONS}
          prefix="是否保存排序"
          isTouched={isTouched}
          top={30}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

export default FAQ
