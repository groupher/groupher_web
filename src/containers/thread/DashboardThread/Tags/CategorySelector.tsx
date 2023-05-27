import { FC, memo } from 'react'
import { reject } from 'ramda'

import { nilOrEmpty } from '@/utils/validator'
import Button from '@/widgets/Buttons/Button'

import { Wrapper, CatsWrapper, Hint } from '../styles/tags/category_selector'
import { edit } from '../logic'

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
          onClick={() => edit(null, 'activeTagCategory')}
        >
          全部
        </Button>

        {reject((cat) => nilOrEmpty(cat), categories).map((cat) => (
          <Button
            key={cat}
            ghost
            size="small"
            noBorder={active !== cat}
            onClick={() => edit(cat, 'activeTagCategory')}
          >
            {cat}
          </Button>
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(CategorySelector)
