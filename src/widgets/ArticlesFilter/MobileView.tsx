/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, memo, useState } from 'react'

import type { TArticleCat, TArticleState } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import TYPE from '@/constant/type'

import { buildLog } from '@/logger'

import { SpaceGrow } from '@/widgets/Common'

import ConditionSelector from '@/widgets/ConditionSelector'
import TagSelector from '@/widgets/TagSelector'
import SearchBox from '@/widgets/SearchBox'

import SortFilter from './SortFilter'
// import SelectedFilters from './SelectedFilters'
// import FilterResult from './FilterResult'

import type { TProps } from '.'
import { Wrapper } from './styles/mobile_view'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter: FC<TProps> = ({
  activeFilter = {},
  onSelect = log,
  resState = TYPE.RES_STATE.DONE,
  mode = 'default',
  groupedTags,
  activeTag,
}) => {
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)
  const [activeState, setActiveState] = useState<TArticleState>(ARTICLE_STATE.ALL)

  // const { activeThread } = useViewing()
  const searchMode = false

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <SortFilter onSelect={onSelect} activeFilter={activeFilter} />
          <TagSelector groupedTags={groupedTags} activeTag={activeTag} mode="mobile" />
          <ConditionSelector
            mode="category"
            title="分类"
            selected={false}
            active={activeCat}
            onSelect={(cat: TArticleCat) => setActiveCat(cat)}
          />
          <ConditionSelector
            mode="state"
            title="状态"
            selected={false}
            active={activeState}
            onSelect={(state: TArticleState) => setActiveState(state)}
          />
          <SpaceGrow />
        </Fragment>
      )}

      <SearchBox />
    </Wrapper>
  )
}

export default memo(ArticlesFilter)
