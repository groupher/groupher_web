import { FC } from 'react'

import type { TTagsMode } from '../../spec'
import { TAGS_MODE } from '../../constant'

import { Wrapper } from '../../styles/focus_layout/filter_bar'

import TagFilter from './TagFilter'
import TimeFilter from './TimeFilter'
import VersionFilter from './VersionFilter'

type TProps = {
  tab: TTagsMode
}

const FilterBar: FC<TProps> = ({ tab }) => {
  switch (tab) {
    case TAGS_MODE.TAG: {
      return (
        <Wrapper>
          <TagFilter />
        </Wrapper>
      )
    }

    case TAGS_MODE.TIME: {
      return (
        <Wrapper>
          <TimeFilter />
        </Wrapper>
      )
    }

    case TAGS_MODE.VERSION: {
      return (
        <Wrapper>
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
