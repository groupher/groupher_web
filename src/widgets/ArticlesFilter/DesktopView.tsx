/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, memo, useState } from 'react'

import type { TArticleFilter, TResState, TArticleCat } from '@/spec'

import { TYPE, THREAD, ARTICLE_CAT } from '@/constant'
import { buildLog } from '@/utils/logger'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import { Space, SpaceGrow } from '@/widgets/Common'

import CatSelector from '@/widgets/CatSelector'

import SearchBox from './SearchBox'
import FilterButton from './FilterButton'
// import SelectedFilters from './SelectedFilters'
// import FilterResult from './FilterResult'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
  pageNumber?: number
  totalCount?: number
  resState?: TResState
  mode?: 'default' | 'search'
  onSearch: (v: string) => void
  closeSearch: () => void
}

const ArticlesFilter: FC<TProps> = ({
  activeFilter = {},
  onSelect,
  pageNumber = 1,
  totalCount = 0,
  resState = TYPE.RES_STATE.DONE,
  mode = 'default',
  onSearch,
  closeSearch,
}) => {
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)

  // const { activeThread } = useViewing()
  const searchMode = mode === 'search'

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <FilterButton onSelect={onSelect} activeFilter={activeFilter} />
          <Space right={15} />
          <CatSelector activeCat={activeCat} onSelect={setActiveCat} />

          <SpaceGrow />
          {resState === TYPE.RES_STATE.LOADING && <LavaLampLoading top={2} right={28} />}
        </Fragment>
      )}

      <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} />
      {/* <FilterResult pageNumber={pageNumber} totalCount={totalCount} /> */}
    </Wrapper>
  )
}

export default memo(ArticlesFilter)
