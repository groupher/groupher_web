import { FC } from 'react'

import type { TTagsMode } from '../../spec'
import { TAGS_MODE } from '../../constant'

import { Wrapper } from '../../styles/simple_layout/filter_bar'

import TagFilter from './TagFilter'
import TimeFilter from './TimeFilter'
import VersionFilter from './VersionFilter'

type TProps = {
  tab: TTagsMode
  isChangelogSimpleLayout: boolean
}

const FilterBar: FC<TProps> = ({ tab, isChangelogSimpleLayout }) => {
  switch (tab) {
    case TAGS_MODE.TAG: {
      return (
        <Wrapper isChangelogSimpleLayout={isChangelogSimpleLayout}>
          <TagFilter />
        </Wrapper>
      )
    }

    case TAGS_MODE.TIME: {
      return (
        <Wrapper isChangelogSimpleLayout={isChangelogSimpleLayout}>
          <TimeFilter />
        </Wrapper>
      )
    }

    case TAGS_MODE.VERSION: {
      return (
        <Wrapper isChangelogSimpleLayout={isChangelogSimpleLayout}>
          <VersionFilter />
        </Wrapper>
      )
    }

    default: {
      return null
    }
  }
}

export default FilterBar
