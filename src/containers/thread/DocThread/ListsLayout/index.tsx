import { FC, memo } from 'react'

import { mockHelpCats } from '@/utils/mock'

import Category from './Category'
import { Wrapper, CatsWrapper } from '../styles/lists_layout'

type TProps = {
  testid?: string
}

const ListsLayout: FC<TProps> = ({ testid = 'home' }) => {
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
