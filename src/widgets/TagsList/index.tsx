/*
 * TagsList
 */

import type { FC } from 'react'

import type { TTag, TSizeTSM, TSpace } from '~/spec'
import SIZE from '~/const/size'

import { sortByColor } from '~/helper'
import { Trans } from '~/i18n'

import Tooltip from '~/widgets/Tooltip'
import TagNode from '~/widgets/TagNode'

import FullList from './FullList'

import { getDotSize, getIconSize, getDotMargin, getHashMargin } from './salon/metric'
import useSalon from './salon'

export type TProps = {
  items: TTag[]
  max?: number
  size?: TSizeTSM
} & TSpace

const TagsList: FC<TProps> = ({ items, max = 2, size = SIZE.TINY, ...spacing }) => {
  const s = useSalon(spacing)

  const dotSize = getDotSize(size)
  const hashSize = getIconSize(size)
  const dotRight = getDotMargin(size)
  const hashRight = getHashMargin(size)

  if (items.length > max) {
    return (
      <div className={s.wrapper}>
        {sortByColor(items)
          .slice(0, max)
          .map((tag) => (
            <div className={s.tag} key={tag.slug}>
              <TagNode
                color={tag.color}
                dotSize={dotSize}
                hashSize={hashSize}
                dotRight={dotRight}
                hashRight={hashRight}
              />
              <div className={s.title}>{Trans(tag.title)}</div>
            </div>
          ))}
        <Tooltip placement="bottom" content={<FullList items={items} size={size} {...spacing} />}>
          <div className={s.more}>..</div>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      {items.length > 0 && <FullList items={items} size={size} {...spacing} />}
    </div>
  )
}

export default TagsList
