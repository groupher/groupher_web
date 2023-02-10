import { FC, memo } from 'react'

import { mockHelpCats } from '@/utils/mock'

import FaqList from '@/widgets/FaqList'

import Category from './Category'
import { Wrapper, CatsWrapper, Divider, FAQWrapper } from '../styles/blocks_layout'

type TProps = {
  testid?: string
}

const BlocksLayout: FC<TProps> = ({ testid = 'home' }) => {
  const cats = mockHelpCats()

  return (
    <Wrapper>
      <CatsWrapper>
        {cats.map((cat) => {
          return (
            <Category
              key={cat.id}
              color={cat.color}
              title={cat.title}
              desc={cat.desc}
              articles={cat.articles}
            />
          )
        })}
      </CatsWrapper>

      <Divider />
      <FAQWrapper>
        <FaqList mode="flat" />
      </FAQWrapper>
    </Wrapper>
  )
}

export default memo(BlocksLayout)
