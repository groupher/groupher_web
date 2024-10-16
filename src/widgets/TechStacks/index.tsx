/*
 *
 * TechStacks
 *
 */

import { type FC, memo, Fragment } from 'react'
import { reduce, mergeRight } from 'ramda'

import type { TTechCommunities, TCommunity } from '~/spec'

import { TECHSTACK_CATEGORYS, CATEGORYS_RAWS } from './constant'
import Category from './Category'
import InteractiveRow from './InteractiveRow'
import ReadOnlyRow from './ReadOnlyRow'

import { Wrapper } from './styles'

const FULL_TECHS = reduce((acc, key) => ({ ...acc, [key]: [] }), {}, CATEGORYS_RAWS)

type TProps = {
  techCommunities: TTechCommunities
  interactive?: boolean

  onAdd?: (category: TCommunity) => void
  onRemove?: (t: TCommunity) => void
}

const TechStacks: FC<TProps> = ({ onAdd, onRemove, techCommunities = {}, interactive = true }) => {
  const techs = mergeRight(FULL_TECHS, techCommunities)

  return (
    <Fragment>
      {TECHSTACK_CATEGORYS.map((category) => (
        <Wrapper key={category.slug}>
          <Category title={category.title} />
          {interactive ? (
            <InteractiveRow
              onAdd={() => onAdd(category)}
              onRemove={onRemove}
              items={techs[category.slug]}
            />
          ) : (
            <ReadOnlyRow items={techs[category.slug]} noSet={techs[category.slug].length === 0} />
          )}
        </Wrapper>
      ))}
    </Fragment>
  )
}

export default memo(TechStacks)
