import { FC, memo } from 'react'

import { mockHelpCats } from '@/utils/mock'

import Category from './Category'
import { Wrapper, CatsWrapper } from '../styles/cards_layout'

type TProps = {
  testid?: string
}

const BlocksLayout: FC<TProps> = ({ testid = 'home' }) => {
  const cats = mockHelpCats()

  return (
    <Wrapper>
      <CatsWrapper>
        {cats.map((cat) => (
          <Category
            key={cat.id}
            color={cat.color}
            title={cat.title}
            desc={cat.desc}
            articles={cat.articles}
          />
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(BlocksLayout)
