import { FC, memo } from 'react'

import { ARTICLE_CAT } from '@/constant'

import type { TArticleCat } from '@/spec'
import { Trans } from '@/utils/i18n'

import {
  Wrapper,
  SelectItem,
  Icon,
  RightPart,
  Title,
  Desc,
} from './styles/full_panel'

type TProps = {
  activeCat: TArticleCat
  onSelect: (cat: TArticleCat) => void
}

const DESC = {
  [ARTICLE_CAT.FEATURE]: '提需求，功能建议等',
  [ARTICLE_CAT.BUG]: '使用中遇到的错误，问题等',
  [ARTICLE_CAT.QUESTION]: '请求帮助，使用疑惑等',
  [ARTICLE_CAT.OTHER]: '一般讨论，其他话题',
}

const FullPanel: FC<TProps> = ({ activeCat, onSelect }) => {
  const OPTIONS = [
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
            <RightPart>
              <Title>{Trans(cat)}</Title>
              <Desc>{DESC[cat]}</Desc>
            </RightPart>
          </SelectItem>
        )
      })}
    </Wrapper>
  )
}

export default memo(FullPanel)
