/*
 *
 * ArticlesFilter
 *
 */

import { FC, memo } from 'react'

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
  onSelect = log,
  resState = TYPE.RES_STATE.DONE,
  mode = 'default',
}) => {
  return (
    <ModelineWrapper>
      <Space right={6} />

      {/* <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} /> */}
    </ModelineWrapper>
  )
}

export default memo(ArticlesFilter)
