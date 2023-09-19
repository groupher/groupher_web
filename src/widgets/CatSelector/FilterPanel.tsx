import { FC, memo } from 'react'

import type { TArticleCat } from '@/spec'
import { ARTICLE_CAT } from '@/constant/gtd'

import { Trans } from '@/i18n'

import { Wrapper, SelectItem, IconWrapper, Icon } from './styles/filter_panel'

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
          <SelectItem key={cat} active={activeCat === cat} onClick={() => onSelect(cat)}>
            <IconWrapper>
              <OptIcon />
            </IconWrapper>
            {Trans(cat)}
          </SelectItem>
        )
      })}
    </Wrapper>
  )
}

export default memo(FilterPanel)
