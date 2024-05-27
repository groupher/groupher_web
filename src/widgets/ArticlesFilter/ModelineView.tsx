/*
 *
 * ArticlesFilter
 *
 */

import { type FC, memo } from 'react'

import TYPE from '@/const/type'

import { Space } from '@/widgets/Common'

// import SelectedFilters from './SelectedFilters'
// import FilterResult from './FilterResult'

import type { TProps } from '.'
import { ModelineWrapper } from './styles'

const ArticlesFilter: FC<TProps> = ({ resState = TYPE.RES_STATE.DONE, mode = 'default' }) => {
  return (
    <ModelineWrapper>
      <Space right={6} />

      {/* <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} /> */}
    </ModelineWrapper>
  )
}

export default memo(ArticlesFilter)
