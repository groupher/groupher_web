/*
 *
 * ArticlesFilter
 *
 */

import { FC, memo, useState } from 'react'

import type { TArticleCat } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE_MODE } from '@/constant/gtd'
import TYPE from '@/constant/type'

import { buildLog } from '@/logger'

import { Space } from '@/widgets/Common'
import CatSelector from '@/widgets/CatSelector'
import StateSelector from '@/widgets/StateSelector'
import TagSelector from '@/widgets/TagSelector'

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
  groupedTags,
  activeTag,
  modelineExpand = false,
}) => {
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)

  return (
    <ModelineWrapper>
      <TagSelector groupedTags={groupedTags} activeTag={activeTag} mode="modeline" />
      <Space right={6} />
      <SortFilter onSelect={onSelect} activeFilter={activeFilter} placement="top-start" />
      <CatSelector activeCat={activeCat} onSelect={setActiveCat} placement="top-start" />

      {modelineExpand && <StateSelector mode={ARTICLE_STATE_MODE.FILTER} placement="top-start" />}

      {/* <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} /> */}
    </ModelineWrapper>
  )
}

export default memo(ArticlesFilter)
