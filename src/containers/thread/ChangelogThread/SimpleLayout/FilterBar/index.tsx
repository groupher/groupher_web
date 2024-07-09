import type { FC } from 'react'

import type { TTagsMode } from '../../spec'
import { TAGS_MODE } from '../../constant'

import { Wrapper } from '../../styles/simple_layout/filter_bar'

import TagFilter from './TagFilter'
import TimeFilter from './TimeFilter'
import VersionFilter from './VersionFilter'

type TProps = {
  tab: TTagsMode
  alignLeft: boolean
}

const FilterBar: FC<TProps> = ({ tab, alignLeft }) => {
  switch (tab) {
    case TAGS_MODE.TAG: {
      return (
        <Wrapper alignLeft={alignLeft}>
          <TagFilter />
        </Wrapper>
      )
    }

    case TAGS_MODE.TIME: {
      return (
        <Wrapper alignLeft={alignLeft}>
          <TimeFilter />
        </Wrapper>
      )
    }

    case TAGS_MODE.VERSION: {
      return (
        <Wrapper alignLeft={alignLeft}>
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
