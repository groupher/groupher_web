import { type FC, memo } from 'react'
import { reject } from 'ramda'

import { nilOrEmpty } from '@/validator'
import Button from '@/widgets/Buttons/Button'

import useTags from '../logic/useTags'
import { Wrapper, CatsWrapper, Hint } from '../styles/tags/group_selector'

type TProps = {
  groups: string[]
  active: null | string
}

const GroupSelector: FC<TProps> = ({ groups, active }) => {
  const { edit } = useTags()

  return (
    <Wrapper>
      <Hint>标签分组:</Hint>
      <CatsWrapper>
        <Button
          ghost
          size="small"
          noBorder={active !== null}
          onClick={() => edit(null, 'activeTagGroup')}
        >
          全部
        </Button>

        {reject((cat) => nilOrEmpty(cat), groups.sort()).map((cat) => (
          <Button
            key={cat}
            ghost
            size="small"
            noBorder={active !== cat}
            onClick={() => edit(cat, 'activeTagGroup')}
          >
            {cat}
          </Button>
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(GroupSelector)
