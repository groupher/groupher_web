import { FC, memo } from 'react'

import { ARTICLE_CAT } from '@/constant'
import type { TArticleCat } from '@/spec'

import { Trans } from '@/utils/i18n'

import { Wrapper, SelectItem, Icon } from './styles/filter_panel'

type TProps = {
  activeCat: TArticleCat
  onSelect: (cat: TArticleCat) => void
}

const FilterPanel: FC<TProps> = ({ activeCat, onSelect }) => {
  const OPTIONS = [
    ARTICLE_CAT.ALL,
    ARTICLE_CAT.FEATURE,
    ARTICLE_CAT.BUG,
    ARTICLE_CAT.QUESTION,
    ARTICLE_CAT.OTHER,
  ]

  return (
    <Wrapper>
      {OPTIONS.map((cat) => {
        const OptIcon = Icon[cat]

        return (
          <SelectItem
            key={cat}
            active={activeCat === cat}
            onClick={() => onSelect(cat)}
          >
            <OptIcon />
            {Trans(cat)}
          </SelectItem>
        )
      })}
    </Wrapper>
  )
}

export default memo(FilterPanel)
