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

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import { Space, SpaceGrow, DesktopOnly } from '@/widgets/Common'

import CatSelector from '@/widgets/CatSelector'
import StateSelector from '@/widgets/StateSelector'

import SearchBox from './SearchBox'
import SortFilter from './SortFilter'
// import SelectedFilters from './SelectedFilters'
// import FilterResult from './FilterResult'

import type { TProps } from '.'
import { ModelineWrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter: FC<TProps> = ({
  activeFilter = {},
  onSelect = log,
  resState = TYPE.RES_STATE.DONE,
  mode = 'default',
  onSearch = log,
  closeSearch = log,
}) => {
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)

  return (
    <ModelineWrapper>
      <SortFilter
        onSelect={onSelect}
        activeFilter={activeFilter}
        tooltipPlacement="top-start"
        noArrow
      />
      <CatSelector
        activeCat={activeCat}
        onSelect={setActiveCat}
        tooltipPlacement="top-start"
        noArrow
      />
      <StateSelector mode={ARTICLE_STATE_MODE.FILTER} tooltipPlacement="top-start" noArrow />
      {/* <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} /> */}
    </ModelineWrapper>
  )
}

export default memo(ArticlesFilter)
