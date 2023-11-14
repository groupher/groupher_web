/*
 *
 * ArticlesFilter
 *
 */

import { FC, memo, useState } from 'react'

import type { TArticleCat } from '@/spec'

import { ARTICLE_CAT } from '@/constant/gtd'
import TYPE from '@/constant/type'

import { buildLog } from '@/logger'

import { Space } from '@/widgets/Common'

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
      <Space right={6} />

      {/* <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} /> */}
    </ModelineWrapper>
  )
}

export default memo(ArticlesFilter)
