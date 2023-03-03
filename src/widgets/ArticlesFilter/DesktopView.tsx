/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, memo, useState } from 'react'

import type { TArticleFilter, TResState, TArticleCat } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE_MODE } from '@/constant/gtd'
import TYPE from '@/constant/type'

import { buildLog } from '@/utils/logger'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import { Space, SpaceGrow, DesktopOnly } from '@/widgets/Common'

import CatSelector from '@/widgets/CatSelector'
import StateSelector from '@/widgets/StateSelector'

import SearchBox from './SearchBox'
import SortFilter from './SortFilter'
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
          <SortFilter onSelect={onSelect} activeFilter={activeFilter} />
          <Space right={2} />
          <CatSelector activeCat={activeCat} onSelect={setActiveCat} />
          <Space right={2} />
          <StateSelector mode={ARTICLE_STATE_MODE.FILTER} />
          <SpaceGrow />
          <DesktopOnly>
            {resState === TYPE.RES_STATE.LOADING && <LavaLampLoading right={28} left={10} />}
          </DesktopOnly>
        </Fragment>
      )}

      <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} />
    </Wrapper>
  )
}

export default memo(ArticlesFilter)
