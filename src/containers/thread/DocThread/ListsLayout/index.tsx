import { type FC, memo } from 'react'

import { mockHelpCats } from '@/mock'

import Category from './Category'
import { Wrapper, CatsWrapper } from '../styles/lists_layout'

const ListsLayout: FC = () => {
  const cats = mockHelpCats()

  return (
    <Wrapper>
      <CatsWrapper>
        {cats.map((cat) => (
          <Category key={cat.id} color={cat.color} title={cat.title} desc={cat.desc} />
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(ListsLayout)
