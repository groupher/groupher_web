/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, memo, useState } from 'react'

import type { TArticleCat } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE_MODE } from '@/constant/gtd'
import TYPE from '@/constant/type'

import { buildLog } from '@/utils/logger'

import { SpaceGrow } from '@/widgets/Common'

import CatSelector from '@/widgets/CatSelector'
import StateSelector from '@/widgets/StateSelector'
import TagSelector from '@/widgets/TagSelector'

import SearchBox from './SearchBox'
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
  onSearch = log,
  closeSearch = log,
  groupedTags,
  activeTag,
}) => {
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)

  // const { activeThread } = useViewing()
  const searchMode = mode === 'search'

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <SortFilter onSelect={onSelect} activeFilter={activeFilter} />
          <TagSelector groupedTags={groupedTags} activeTag={activeTag} mode="mobile" />
          <CatSelector activeCat={activeCat} onSelect={setActiveCat} />
          <StateSelector mode={ARTICLE_STATE_MODE.FILTER} />
          <SpaceGrow />
        </Fragment>
      )}

      <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} />
    </Wrapper>
  )
}

export default memo(ArticlesFilter)
