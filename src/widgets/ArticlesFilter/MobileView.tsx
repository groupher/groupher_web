/*
 *
 * ArticlesFilter
 *
 */

import type { TArticleCat, TArticleState } from '~/spec'

import { refreshArticles } from '~/signal'
import { CONDITION_MODE } from '~/const/mode'

import useArticlesFilter from '~/hooks/useArticlesFilter'

import { SpaceGrow } from '~/widgets/Common'
import ConditionSelector from '~/widgets/ConditionSelector'
import SearchBox from '~/widgets/SearchBox'

import { Wrapper } from './styles/mobile_view'

export default () => {
  const { cat: activeCat, state: activeState, updateActiveFilter } = useArticlesFilter()

  // const { activeThread } = useViewing()
  const searchMode = false

  return (
    <Wrapper>
      {!searchMode && (
        <>
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
        </>
      )}

      <SearchBox />
    </Wrapper>
  )
}
