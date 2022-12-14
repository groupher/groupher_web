import { FC, memo } from 'react'

import Button from '@/widgets/Buttons/Button'

import { Wrapper, CatsWrapper, Hint } from '../styles/tags/category_selector'
import { changeTagCategory } from '../logic'

type TProps = {
  categories: string[]
  active: null | string
}

const CategorySelector: FC<TProps> = ({ categories, active }) => {
  return (
    <Wrapper>
      <Hint>标签分组:</Hint>
      <CatsWrapper>
        <Button
          ghost
          size="small"
          noBorder={active !== null}
          onClick={() => changeTagCategory(null)}
        >
          全部
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat}
            ghost
            size="small"
            noBorder={active !== cat}
            onClick={() => changeTagCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(CategorySelector)
