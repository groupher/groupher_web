/*
 *
 * ArticlesFilter
 *
 */

import { type FC, Fragment, memo } from 'react'

import type { TArticleCat, TArticleState } from '@/spec'

import { refreshArticles } from '@/signal'
import { CONDITION_MODE } from '@/const/mode'
import TYPE from '@/const/type'

import useArticlesFilter from '@/hooks/useArticlesFilter'

import { SpaceGrow } from '@/widgets/Common'
import ConditionSelector from '@/widgets/ConditionSelector'
import SearchBox from '@/widgets/SearchBox'

import type { TProps } from '.'
import { Wrapper } from './styles/mobile_view'

const ArticlesFilter: FC<TProps> = ({ resState = TYPE.RES_STATE.DONE }) => {
  const { cat: activeCat, state: activeState, updateActiveFilter } = useArticlesFilter()

  // const { activeThread } = useViewing()
  const searchMode = false

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <ConditionSelector
            mode={CONDITION_MODE.CAT}
            selected={false}
            active={activeCat}
            onSelect={(cat: TArticleCat) => {
              updateActiveFilter({ cat })
              refreshArticles()
            }}
          />
          <ConditionSelector
            mode={CONDITION_MODE.STATE}
            selected={false}
            active={activeState}
            onSelect={(state: TArticleState) => {
              updateActiveFilter({ state })
              refreshArticles()
            }}
          />
          <SpaceGrow />
        </Fragment>
      )}

      <SearchBox />
    </Wrapper>
  )
}

export default memo(ArticlesFilter)
