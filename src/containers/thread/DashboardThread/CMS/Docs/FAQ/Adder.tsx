import { FC } from 'react'

import { Wrapper, AddButton, AddIcon, Notes } from '../../../styles/cms/docs/faq/adder'
import { addFAQSection } from '../../../logic'

const Adder: FC = () => {
  return (
    <Wrapper>
      <AddButton onClick={addFAQSection}>
        <AddIcon />
        新问题块
      </AddButton>
      <Notes>问题块包含标题及内容，可自主折叠，自定义展示顺序等。</Notes>
    </Wrapper>
  )
}

export default Adder
